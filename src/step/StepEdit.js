import React, { Component } from 'react'
import firebase from 'firebase'
import {HashLink as Link} from 'react-router-hash-link'

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

    this._reference = {
      quizData: this.props.quizData,
      quizIDs: this.props.quizIDs,
      answerValues: this.props.answerValues,
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



    const actionJSX = (
      <ActionButton
        link={'/step/' + this.state.stepData.id}
        save={this._save}
        class={this.state.valid ? '' : ' disabled'}
        refresh={this._refresh}
      />
    )

    let conditionFormJSX

    const condition = this.state.stepData.precondition
    if (precondition && Object.keys(precondition).length > 0) {
      preconditionFormJSX = Object.keys(precondition).map((key) => {
        if (precondition[key]) {
          return (
            <ConditionForm
              key={key}
              id={key}
              rules={precondition[key]}
              focus={this.state.focus}
              onConditionDelete={this._onConditionDelete}
              onRuleAdd={this._addRule}
              onRuleDelete={this._deleteRule}
              onInputChange={this._changeInput}
              onRadioSelect={this._selectRadio}
              quizIDs={this._reference.quizIDs}
            />
          )
        } else {
          return null
        }
      })
    }

    let routeFormJSX

    const route = this.state.stepData.route
    if (route && Object.keys(route).length > 0) {
      let answers
      const option = this._reference.quizData.option
      if (option) {
        answers = Object.keys(option).map((id) => {
          if (option[id]) {
            return option[id].value
          } else {
            return null
          }
        })
      }
      routeFormJSX = Object.keys(route).map((key) => {
        if (route[key]) {
          return (
            <RouteForm
              key={key}
              number={key}
              {...route[key]}
              focus={this.state.focus}
              onRouteDelete={this._deleteRoute}
              onInputChange={this._changeInput}
              quizIDs={this._reference.quizIDs}
              quizAnswers={answers}
            />
          )
        } else {
          return null
        }
      })
    }

    return (
      <div className='_formWrapper basic ui segment'>
        <div className='StepEdit ui segment'>
          {action}
          <hr className='ui divider' />
          <form ref='form' className='Form ui form'>
            <div className='ui two column divided stackable grid'>
              <div className='column'>
                { conditionFormJSX }
                <a onClick={this._onConditionAdd} className='ui green icon labeled mini button'>
                  <i className='icon add' />
                    新增進入條件
                  </a>
              </div>
              <div className='column'>
                { routeFormJSX }
                <a onClick={this._addRoute} className='ui green icon labeled mini button'>
                  <i className='icon add' />
                    新增離開路徑
                  </a>
              </div>
            </div>
          </form>
          <hr className='ui divider' />
          {action}
        </div>
      </div>
    )
  }
}

export default StepEdit
