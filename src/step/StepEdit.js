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
      stepData: _copyNested(this.props.stepData),
    }

    this._initial = {
      stepData: _copyNested(this.props.stepData),
    }

    this._basic = {
      condition: {
        logic: 'and',
        rule: [],
      },
      rule: {
        target: '',
        logic: 'equal_to',
        value: '',
      },
      route: {
        answer: '',
        next: '',
      },
      stepData: {
        id: '',
        quiz: '',
      }
    }

    this._addRule = this._addRule.bind(this)
    this._deleteRule = this._deleteRule.bind(this)
    this._addRoute = this._addRoute.bind(this)
    this._deleteRoute = this._deleteRoute.bind(this)

    this._changeInput = this._changeInput.bind(this)
    this._selectRadio = this._selectRadio.bind(this)
    this._changeRadio = this._changeRadio.bind(this)

    this._validateRequired = this._validateRequired.bind(this)
    this._validate = this._validate.bind(this)
    this._save = this._save.bind(this)
    this._refresh = this._refresh.bind(this)
  }

  componentWillReceiveProps (nextProps) {

    this.setState((prevState, props) => {
      prevState.stepData = _copyNested(nextProps.stepData)
      this._initial.stepData = _copyNested(nextProps.stepData)
      return prevState
    })

  }

  _addRule () {

    this.setState((prevState, props) => {
      if (!prevState.stepData.precondition) {
        prevState.stepData.precondition = _copyNested(this._basic.condition)
      }
      if (!prevState.stepData.precondition.rule) {
        prevState.stepData.precondition.rule = []
      }
      prevState.stepData.precondition.rule.push(_copyNested(this._basic.rule))
      return {
        valid: this._validate(prevState.stepData),
        stepData: prevState.stepData,
      }
    })

  }

  _deleteRule (event) {

    const ruleID = event.target.getAttribute('data-ruleID')

    this.setState((prevState, props) => {
      delete prevState.stepData.precondition.rule[ruleID]
      return {
        valid: this._validate(prevState.stepData),
        stepData: prevState.stepData,
      }
    })

  }

  _addRoute () {

    this.setState((prevState, props) => {
      if (!prevState.stepData.route) {
        prevState.stepData.route = []
      }
      prevState.stepData.route.push(_copyNested(this._basic.route))
      return {
        valid: this._validate(prevState.stepData),
        stepData: prevState.stepData,
      }
    })

  }

  _deleteRoute (event) {

    const routeID = event.target.getAttribute('data-routeID')

    this.setState((prevState, props) => {
      delete prevState.stepData.route[routeID]
      return {
        valid: this._validate(prevState.stepData),
        stepData: prevState.stepData,
      }
    })
  }

  _selectRadio (event) {

    const ruleID = event.target.getAttribute('data-ruleID')
    const value = event.target.value

    if (!ruleID) {

      this.setState((prevState, props) => {
        prevState.stepData.precondition.logic = value
        return {
          valid: this._validate(prevState.stepData),
          stepData: prevState.stepData,
        }
      })

    } else {

      this.setState((prevState, props) => {
        prevState.stepData.precondition.rule[ruleID].logic = value
        prevState.valid = this._validate(prevState.stepData)
        return {
          valid: this._validate(prevState.stepData),
          stepData: prevState.stepData,
        }
      })

    }

  }

  _changeRadio (event) {

  }

  _changeInput (event) {

    const ruleID = event.target.getAttribute('data-ruleID')
    const routeID = event.target.getAttribute('data-routeID')
    const fieldID = event.target.getAttribute('data-fieldID')
    const value = event.target.value

    if (ruleID) {
      this.setState((prevState, props) => {
        prevState.stepData.precondition.rule[ruleID][fieldID] = value
        return {
          valid: this._validate(prevState.stepData),
          stepData: prevState.stepData,
        }
      })
    }

    if (routeID) {
      this.setState((prevState, props) => {
        prevState.stepData.route[routeID][fieldID] = value
        return {
          valid: this._validate(prevState.stepData),
          stepData: prevState.stepData,
        }
      })
    }

  }

  _validateRequired (value) {

    if (value.length > 0) {
      return true
    } else {
      return false
    }

  }

  _validate (stepData) {

    let valid = true

    if (!stepData) {
      return valid
    }

    if (!this._validateRequired(stepData.id) || !this._validateRequired(stepData.quiz)) {
      return false
    }

    if (stepData.precondition) {
      stepData.precondition.rule.forEach((entry, index) => {
        if (!entry) {
          return
        }
        if (!this._validateRequired(entry.target) || !this._validateRequired(entry.value)) {
          valid = false
        }
      })
    }

    if (stepData.route) {
      stepData.route.forEach((entry, index) => {
        if (!entry) {
          return
        }
        if (!this._validateRequired(entry.answer) || !this._validateRequired(entry.next)) {
          valid = false
        }
      })
    }

    return valid

  }

  _save () {

    const stepData = _compactStepData(this.state.stepData)

    if (this._validate(stepData)) {
      firebase.database().ref('step/' + this.props.stepData.id).set(this.state.stepData)
    }

  }

  _refresh () {

    this.setState((prevState, props) => {
      return {
        valid: true,
        stepData: _copyNested(this._initial.stepData)
      }
    })

  }

  render () {

    const valid = this.state.valid
    let stepData = this.state.stepData

    const quizIDs = this.props.quizIDs
    const answerValues = this.props.answerValues

    const actionJSX = (
      <ActionButton
        link={'/step/' + this.state.stepData.id}
        save={this._save}
        className={valid ? '' : ' disabled'}
        refresh={this._refresh}
      />
    )

    if (!stepData) {
      stepData = _copyNested(this._basic.stepData)
    }

    let ruleFormJSX

    if (stepData.precondition && stepData.precondition.rule) {

      ruleFormJSX = stepData.precondition.rule.map((ruleContent, ruleID) => {
        if (!ruleContent) {
          return false
        }
        return (
          <RuleForm
            key={ruleID}
            ruleID={ruleID}
            {...ruleContent}
            quizIDs={quizIDs}
            changeInput={this._changeInput}
            changeRadio={this._changeRadio}
            selectRadio={this._selectRadio}
            deleteRule={this._deleteRule}
          />
        )
      })

    }

    let routeFormJSX

    if (stepData.route) {

      routeFormJSX = stepData.route.map((routeContent, routeID) => {
        if (!routeContent) {
          return false
        }
        return (
          <RouteForm
            key={routeID}
            routeID={routeID}
            {...routeContent}
            quizIDs={quizIDs}
            answerValues={answerValues}
            changeInput={this._changeInput}
            deleteRoute={this._deleteRoute}
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
                        checked={stepData.precondition.logic === 'and'}
                        onClick={this._selectRadio}
                        onChange={this._changeRadio}
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
                        checked={stepData.precondition.logic === 'or'}
                        onClick={this._selectRadio}
                        onChange={this._changeRadio}
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
                <a onClick={this._addRoute} className='ui green icon labeled mini button'>
                  <i className='icon add' />
                  新增離開路徑
                </a>
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
