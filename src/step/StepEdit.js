import React, { Component } from 'react'
import firebase from 'firebase'

import _copyNested from '../_shared/_copyNested'
import ActionButton from '../_shared/ActionButton'

import _compactStepData from './_compactStepData'
import RuleForm from './RuleForm'
import RouteForm from './RouteForm'

class StepEdit extends Component {

  constructor (props) {

    super(props)

    this.state = {
      valid: true,
      quizData: _copyNested(this.props.quizData),
    }

    this._initialState = _copyNested(this.state)

    this._basic = {
      rule: {
        target: '',
        logic: 'equal_to',
        value: '',
      },
      condition: {
        logic: 'and',
        rule: [],
      },
    }

    this._addRule = this._addRule.bind(this)
    this._deleteRule = this._deleteRule.bind(this)

    this._changeInput = this._changeInput.bind(this)
    this._selectRadio = this._selectRadio.bind(this)
    this._placeHolder = this._placeHolder.bind(this)

    this._validateRequired = this._validateRequired.bind(this)
    this._validate = this._validate.bind(this)
    this._save = this._save.bind(this)
    this._refresh = this._refresh.bind(this)
  }

  componentWillReceiveProps (nextProps) {

    this.setState((prevState, props) => {
      prevState.quizData = _copyNested(nextProps.quizData)
      this._initialState = _copyNested(prevState)
      return prevState
    })

  }

  _addRule () {

    this.setState((prevState, props) => {
      if (!prevState.quizData.precondition) {
        prevState.quizData.precondition = _copyNested(this._basic.condition)
      }
      if (!prevState.quizData.precondition.rule) {
        prevState.quizData.precondition.rule = []
      }
      prevState.quizData.precondition.rule.push(_copyNested(this._basic.rule))
      prevState.valid = this._validate(prevState.quizData)

      firebase.database().ref(`quiz/${prevState.quizData.id}`).set(prevState.quizData)

      return prevState
    })

  }

  _deleteRule (event) {

    const id = event.target.getAttribute('data-id')

    this.setState((prevState, props) => {
      prevState.quizData.precondition.rule.splice(parseInt(id, 10), 1)
      prevState.valid = this._validate(prevState.quizData)

      firebase.database().ref(`quiz/${prevState.quizData.id}`).set(prevState.quizData)
      return prevState
    })

  }

  _selectRadio (event) {

    const group = event.target.getAttribute('data-group')
    const id = event.target.getAttribute('data-id')
    const value = event.target.value

    if (group === 'precondition') {

      this.setState((prevState, props) => {
        prevState.quizData.precondition.logic = value

      firebase.database().ref(`quiz/${prevState.quizData.id}`).set(prevState.quizData)
        return prevState
      })

    }

    if (group === 'rule') {

      this.setState((prevState, props) => {
        prevState.quizData.precondition.rule[id].logic = value

      firebase.database().ref(`quiz/${prevState.quizData.id}`).set(prevState.quizData)
        return prevState
      })

    }

  }

  _placeHolder (event) {

  }

  _changeInput (event) {

    const group = event.target.getAttribute('data-group')
    const id = event.target.getAttribute('data-id')
    const name = event.target.name
    const value = event.target.value

    if (group === 'rule') {
      this.setState((prevState, props) => {
        prevState.quizData.precondition.rule[id][name] = value
        prevState.valid = this._validate(prevState.quizData)

      firebase.database().ref(`quiz/${prevState.quizData.id}`).set(prevState.quizData)
        return prevState
      })
    }

    if (group === 'route') {
      this.setState((prevState, props) => {
        prevState.quizData.route[id] = value
        prevState.valid = this._validate(prevState.quizData)

      firebase.database().ref(`quiz/${prevState.quizData.id}`).set(prevState.quizData)
        return prevState
      })
    }

  }

  _validateRequired (value) {

    return value.length > 0 ? true : false

  }

  _validate (quizData) {

    let valid = true

    if (!quizData) {
      return valid
    }

    if (quizData.precondition && quizData.precondition.rule) {

      quizData.precondition.rule.forEach((entry, index) => {
        if (!entry) {
          return
        }
        if (!this._validateRequired(entry.target) || !this._validateRequired(entry.value)) {
          valid = false
        }
      })

    }

    return valid

  }

  _save () {

    const quizData = this.state.quizData

    if (this._validate(quizData)) {
      firebase.database().ref(`quiz/${quizData.id}`).set(quizData)
    }

  }

  _refresh () {

    this.setState((prevState, props) => {
      return _copyNested(this._initialState)
    })

  }

  render () {

    const quizID = this.props.quizID
    const quizIDs = this.props.quizIDs

    let quizData = this.state.quizData
    const valid = this.state.valid

    if (!quizData) {
      return null
    }

    const actionJSX = (
      <ActionButton
        link={`/step/${quizID}/`}
        save={this._save}
        className={valid ? '' : ' disabled'}
        refresh={this._refresh}
      />
    )

    let ruleFormJSX

    if (!quizData.precondition) {
      quizData.precondition = {
        logic: 'and',
        rule: []
      }
    }

    if (!quizData.precondition.rule) {
      quizData.precondition.rule = []
    }

    ruleFormJSX = quizData.precondition.rule.map((ruleContent, id) => {
      if (!ruleContent) {
        return false
      }
      return (
        <RuleForm
          key={id}
          group='rule'
          id={id}
          {...ruleContent}
          quizIDs={quizIDs}
          changeInput={this._changeInput}
          changeRadio={this._placeHolder}
          selectRadio={this._selectRadio}
          deleteRule={this._deleteRule}
        />
      )
    })

    let routeFormJSX

    if (quizData.type === 'select') {

      if (!quizData.route) {
        quizData.route = {}
        quizData.option.forEach((item, key) => {
          quizData.route[item.value] = ''
        })
      }

      routeFormJSX = quizData.option.map((item, key) => {
        return (
          <RouteForm
            key={key}
            group='route'
            id={item.value}
            value={quizData.route ? quizData.route[item.value] : ''}
            quizIDs={quizIDs}
            changeInput={this._changeInput}
          />
        )
      })
    }

    return (
      <div className='_formWrapper basic ui segment'>
        <div className='StepEdit ui segment'>
          {actionJSX}
          <hr className='ui divider' />
          <form ref='form' className='Form ui form'>
            <div className='ui two column divided stackable grid'>
              <div className='left aligned column'>
                <h4 className='ui header'>進入條件</h4>
                <p>
                  進入此步驟需
                  <span>
                  <span className='inline field'>
                    <span className='ui radio checkbox'>
                      <input
                        type='radio'
                        value='and'
                        checked={quizData.precondition.logic === 'and'}
                        onClick={this._selectRadio}
                        onChange={this._placeHolder}
                      />
                      <label>
                        同時
                      </label>
                    </span>
                  </span>
                  <span className='inline field'>
                    <span className='ui radio checkbox'>
                      <input
                        type='radio'
                        value='or'
                        checked={quizData.precondition.logic === 'or'}
                        onClick={this._selectRadio}
                        onChange={this._placeHolder}
                      />
                      <label>
                        擇一
                      </label>
                    </span>
                  </span>
                  </span>
                  符合以下條件
                </p>
                <hr className='ui divider' />
                { ruleFormJSX }
                <a onClick={this._addRule} className='ui green icon labeled mini button'>
                  <i className='icon add' />
                  新增進入條件
                </a>
              </div>
              <div className='left aligned column'>
                <h4 className='ui header'>離開路徑</h4>
                { routeFormJSX }
              </div>
            </div>
          </form>
          <hr className='ui divider' />
          {actionJSX}
        </div>
      </div>
    )
  }
}

export default StepEdit
