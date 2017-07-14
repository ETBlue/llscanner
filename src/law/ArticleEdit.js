import React, { Component } from 'react'
import firebase from 'firebase'

import _copyNested from '../_shared/_copyNested'
import ActionButton from '../_shared/ActionButton'

import _compactRuleData from './_compactRuleData'
import RuleForm from './RuleForm'

class ArticleEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: true,
      ruleData: _compactRuleData(this.props.ruleData),
    }

    this._initial = {
      ruleData: _copyNested(this.state.ruleData)
    }

    this._basic = {
      rule: {
        target: '',
        logic: 'equal_to',
        value: '',
      },
      condition: {
        logic: 'and',
        rule: []
      },
      reference: {
        paragraph: '',
        subparagraph: '',
      }
    }

    this._addRuleSet = this._addRuleSet.bind(this)
    this._deleteRuleSet = this._deleteRuleSet.bind(this)
    this._addRule = this._addRule.bind(this)
    this._deleteRule = this._deleteRule.bind(this)

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
      prevState.ruleData = _compactRuleData(nextProps.ruleData)
      this._initial.ruleData = _copyNested(prevState.ruleData)

      return prevState
    })
  }

  _addRuleSet (event) {

    this.setState((prevState, props) => {
      prevState.ruleData.push({
        condition: _copyNested(this._basic.condition),
        precondition: _copyNested(this._basic.condition),
        reference: _copyNested(this._basic.reference)
      })
      return prevState
    })

  }

  _deleteRuleSet (event) {

    const ruleSetID = event.target.getAttribute('data-ruleSetID')

    this.setState((prevState, props) => {
      delete prevState.ruleData[ruleSetID]
      return {
        valid: this._validate(prevState.ruleData),
        ruleData: prevState.ruleData,
      }
    })

  }

  _addRule (event) {

    const ruleSetID = event.target.getAttribute('data-ruleSetID')
    const position = event.target.getAttribute('data-position')

    this.setState((prevState, props) => {
      if (!prevState.ruleData[ruleSetID][position]) {
        prevState.ruleData[ruleSetID][position] = _copyNested(this._basic.condition)
      }
      if (!prevState.ruleData[ruleSetID][position].rule) {
        prevState.ruleData[ruleSetID][position].rule = []
      }
      prevState.ruleData[ruleSetID][position].rule.push(_copyNested(this._basic.rule))
      prevState.valid = this._validate(prevState.ruleData)
      return prevState
    })

  }

  _deleteRule (event) {

    const ruleSetID = event.target.getAttribute('data-ruleSetID')
    const position = event.target.getAttribute('data-position')
    const ruleID = event.target.getAttribute('data-ruleID')

    this.setState((prevState, props) => {
      delete prevState.ruleData[ruleSetID][position].rule[ruleID]
      return {
        valid: this._validate(prevState.ruleData),
        ruleData: prevState.ruleData,
      }
    })

  }

  _changeRadio (event) {

  }

  _selectRadio (event) {

    const ruleSetID = event.target.getAttribute('data-ruleSetID')
    const position = event.target.getAttribute('data-position')
    const ruleID = event.target.getAttribute('data-ruleID')
    const value = event.target.value

    if (!ruleID) {

      this.setState((prevState, props) => {
        prevState.ruleData[ruleSetID][position].logic = value
        prevState.valid = this._validate(prevState.ruleData)
        return prevState
      })

    } else {

      this.setState((prevState, props) => {
        prevState.ruleData[ruleSetID][position].rule[ruleID].logic = value
        prevState.valid = this._validate(prevState.ruleData)
        return prevState
      })

    }
  }

  _changeInput (event) {

    const ruleSetID = event.target.getAttribute('data-ruleSetID')
    const position = event.target.getAttribute('data-position')
    const ruleID = event.target.getAttribute('data-ruleID')
    const fieldID = event.target.getAttribute('data-fieldID')
    const value = event.target.value

    if (position === 'reference') {
      this.setState((prevState, props) => {
        prevState.ruleData[ruleSetID].reference[fieldID] = value
        return prevState
      })
    }

    if (position === 'condition' || position === 'precondition') {
      this.setState((prevState, props) => {
        prevState.ruleData[ruleSetID][position].rule[ruleID][fieldID] = value
        prevState.valid = this._validate(prevState.ruleData)
        return prevState
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

  _validate (ruleData) {

    let valid = true

    if (!ruleData) {
      return valid
    }

    ruleData.forEach((entry) => {
      if (!entry) {
        return
      }
      if (entry.condition && !entry.condition.logic) {
        valid = false
      }
      if (entry.condition && entry.condition.rule) {
        entry.condition.rule.forEach((item) => {
          if (!item) {
            return
          }
          if (!this._validateRequired(item.target) || !this._validateRequired(item.value)) {
            valid = false
          }
        })
      }
      if (entry.precondition && !entry.precondition.logic) {
        valid = false
      }
      if (entry.precondition && entry.precondition.rule) {
        entry.precondition.rule.forEach((item) => {
          if (!item) {
            return
          }
          if (!this._validateRequired(item.target) || !this._validateRequired(item.value)) {
            valid = false
          }
        })
      }
    })

    return valid

  }

  _save () {

    const ruleData = _compactRuleData(this.state.ruleData)

    if (this._validate(ruleData)) {
      firebase.database().ref('law/' + this.props.lawID + '/' + this.props.articleID).set(ruleData)
    }

  }

  _refresh () {

    this.setState((prevState, props) => {
      return {
        valid: true,
        ruleData: _copyNested(this._initial.ruleData)
      }
    })

  }

  render () {

    const ruleData = this.state.ruleData
    const valid = this.state.valid

    const lawID = this.props.lawID
    const articleID = this.props.articleID
    const quizIDs = this.props.quizIDs

    const actionJSX = (
      <ActionButton
        link={'/law/' + lawID + '/' + articleID}
        save={this._save}
        className={valid ? '' : ' disabled'}
        refresh={this._refresh}
      />
    )

    const ruleSetFromJSX = ruleData.map((entry, index) => {

      if (!entry) {
        return false
      }

      const ruleSetID = index
      const condition = entry.condition || _copyNested(this._basic.condition)
      const precondition = entry.precondition || _copyNested(this._basic.condition)
      const reference = entry.reference || _copyNested(this._basic.reference)

      condition.logic = condition.logic || 'and'
      condition.rule = condition.rule || []

      precondition.logic = precondition.logic || 'and'
      precondition.rule = precondition.rule || []

      reference.paragraph = reference.paragraph || ''
      reference.subparagraph = reference.subparagraph || ''

      const conditionJSX = condition.rule.map((ruleContent, ruleID) => {
        if (!ruleContent) {
          return false
        }
        return (
          <RuleForm
            ruleSetID={ruleSetID}
            position='condition'
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

      const preconditionJSX = precondition.rule.map((ruleContent, ruleID) => {
        if (!ruleContent) {
          return false
        }
        return (
          <RuleForm
            ruleSetID={ruleSetID}
            position='precondition'
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

      return (
        <div key={ruleSetID} className='_ruleSet'>
          <header className='_cors _header'>
            <h4 className='ui header'>
              規則 {ruleSetID}
            </h4>
            <p>
              依據：{lawID}第 {articleID} 條第
              <span className='inline field'>
                <input
                  type='text'
                  data-ruleSetID={ruleSetID}
                  data-position='reference'
                  data-fieldID='paragraph'
                  value={reference.paragraph}
                  onChange={this._changeInput}
                  placeholder=''
                  size='3'
                />
              </span>
              項第
              <span className='inline field'>
                <input
                  type='text'
                  data-ruleSetID={ruleSetID}
                  data-position='reference'
                  data-fieldID='subparagraph'
                  value={reference.subparagraph}
                  onChange={this._changeInput}
                  placeholder=''
                  size='3'
                />
              </span>
              款
            </p>
            <a className='ui _rightTopFloated red icon labeled mini button'
              data-ruleSetID={ruleSetID}
              onClick={this._deleteRuleSet}
            >
              <i className='icon trash' />
              刪除規則 {ruleSetID}
            </a>
          </header>
          <hr className='ui divider' />
          <div className='ui two column divided stackable grid'>
            <div className='left aligned column'>
              <p>
                啟動此規則需
                <span>
                <span className='inline field'>
                  <span className='ui radio checkbox'>
                    <input
                      type='radio'
                      data-ruleSetID={ruleSetID}
                      data-position='precondition'
                      value='and'
                      checked={precondition.logic === 'and'}
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
                      data-ruleSetID={ruleSetID}
                      data-position='precondition'
                      value='or'
                      checked={precondition.logic === 'or'}
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
              {preconditionJSX}
              <a className='ui olive icon labeled mini button'
                data-ruleSetID={ruleSetID}
                data-position='precondition'
                onClick={this._addRule}
              >
                <i className='icon add' />
                新增規則 {ruleSetID} 的啟動條件
              </a>
            </div>
            <div className='left aligned column'>
              <p>
                通過此規則需
                <span>
                <span className='inline field'>
                  <span className='ui radio checkbox'>
                    <input
                      type='radio'
                      data-ruleSetID={ruleSetID}
                      data-position='condition'
                      value='and'
                      checked={condition.logic === 'and'}
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
                      data-ruleSetID={ruleSetID}
                      data-position='condition'
                      value='or'
                      checked={condition.logic === 'or'}
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
              {conditionJSX}
              <a className='ui olive icon labeled mini button'
                data-ruleSetID={ruleSetID}
                data-position='condition'
                onClick={this._addRule}
              >
                <i className='icon add' />
                新增規則 {ruleSetID} 的通過條件
              </a>
            </div>
          </div>
          <hr className='ui divider' />
        </div>
      )
    })

    return (

      <div className='ArticleEdit _formWrapper basic ui segment'>
        <div className='ui segment'>
          {actionJSX}
          <hr className='ui divider' />
          <form ref='form' className='Form ui form'>
            {ruleSetFromJSX}
            <a className='ui green icon labeled mini button'
              onClick={this._addRuleSet}
            >
              <i className='icon add' />
              新增規則
            </a>
          </form>
          <hr className='ui divider' />
          {actionJSX}
        </div>
      </div>
    )
  }
}

export default ArticleEdit
