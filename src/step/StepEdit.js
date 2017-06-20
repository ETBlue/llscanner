import React, { Component } from 'react'
import firebase from 'firebase'
import {HashLink as Link} from 'react-router-hash-link'

import _copyNested from '../_shared/_copyNested'
import ActionButton from '../_shared/ActionButton'

import ConditionForm from './ConditionForm'
import RouteForm from './RouteForm'

import './StepEdit.css'

class StepEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: true,
      focus: {
        manual: false,
        id: ''
      },
      stepData: _copyNested(this.props.stepData),
      quizData: this.props.quizData,
      quizIDs: this.props.quizIDs,
      answerValues: this.props.answerValues
    }

    // setup recovery data
    this._initialStepData = _copyNested(this.props.stepData)
    this._basicRuleID = 'target_id'
    this._basicRuleData = {
      id: this._basicRuleID,
      condition: '',
      answer: ''
    }
    this._basicRouteID = 'answer_value'

    // bind all functions
    this._onConditionAdd = this._onConditionAdd.bind(this) // 新增選項
    this._onConditionDelete = this._onConditionDelete.bind(this) // 刪除選項
    this._onRuleAdd = this._onRuleAdd.bind(this) // 新增選項
    this._onRuleDelete = this._onRuleDelete.bind(this) // 刪除選項
    this._onRouteAdd = this._onRouteAdd.bind(this) // 新增選項
    this._onRouteDelete = this._onRouteDelete.bind(this) // 刪除選項
    this._onInputChange = this._onInputChange.bind(this) // 刪除本題
    this._onRadiosSelect = this._onRadiosSelect.bind(this)
    this._validateAll = this._validateAll.bind(this)
    this._save = this._save.bind(this) // 將編輯的資料送出到 server
    this._refresh = this._refresh.bind(this) // 取消編輯到一半的資料
  }

  componentWillReceiveProps (nextProps) {
    // setup recovery data... again
    this._initialStepData = _copyNested(nextProps.stepData)

    // re-render page
    this.setState((prevState, props) => {
      prevState = {
        valid: true,
        focus: {
          manual: false,
          id: ''
        },
        stepData: _copyNested(nextProps.stepData),
        quizData: nextProps.quizData,
        quizIDs: nextProps.quizIDs,
        answerValues: nextProps.answerValues
      }
      return prevState
    })
  }

  _validateAll (prevState) {
    let valid = true

    const conditions = prevState.stepData.condition
    if (conditions) {
      Object.keys(conditions).forEach((key) => {
        if (conditions[key]) {
          Object.keys(conditions[key]).forEach((id) => {
            // all condition rules must have an id, which should not be the default value

            if (conditions[key][id].id.length === 0 ||
              conditions[key][id].id === this._basicRuleID) {
              valid = false
            }
          })
        }
      })
    }

    const routes = prevState.stepData.route
    if (routes) {
      Object.keys(routes).forEach((key) => {
        // all route rules must have an id, which should not be the default value
        if (routes[key].id.length === 0 ||
          routes[key].id === this._basicRouteID) {
          valid = false
        }
      })
    }

    return valid
  }

  _onConditionAdd () {
    this.setState((prevState, props) => {
      // set up condition data if there is no one
      if (!prevState.stepData.condition) {
        prevState.stepData.condition = {}
      }

      // find the very first empty spot in conditions
      let id
      for (let i = 1; i <= Object.keys(prevState.stepData.condition).length + 1; i++) {
        if (!prevState.stepData.condition[i]) {
          id = i
          break
        }
      }
      // give the brand new condition a default content
      prevState.stepData.condition[id] = {
        [this._basicRuleID]: _copyNested(this._basicRuleData)
      }
      return {
        stepData: prevState.stepData,
        valid: false
      }
    })
  }

  _onConditionDelete (event) {
    const id = event.target.id

    this.setState((prevState, props) => {
      delete prevState.stepData.condition[id]
      return {
        stepData: prevState.stepData,
        valid: this._validateAll(prevState)
      }
    })
  }

  _onRuleAdd (event) {
    const id = event.target.id

    this.setState((prevState, props) => {
      // give the brand new rule a default content
      prevState.stepData.condition[id][this._basicRuleID] = _copyNested(this._basicRuleData)

      console.log(prevState.stepData.condition[id])
      return {
        stepData: prevState.stepData,
        valid: false
      }
    })
  }

  _onRuleDelete (event) {
    const id = event.target.id
    const conditionID = event.target.getAttribute('data-conditionID')

    this.setState((prevState, props) => {
      delete prevState.stepData.condition[conditionID][id]
      return {
        stepData: prevState.stepData,
        valid: this._validateAll(prevState)
      }
    })
  }

  _onRouteAdd () {
    this.setState((prevState, props) => {
      // give the brand new condition a default content
      if (!prevState.stepData.route) {
        prevState.stepData.route = {}
      }
      prevState.stepData.route[this._basicRouteID] = {
        id: this._basicRouteID,
        quiz: ''
      }
      return {
        stepData: prevState.stepData,
        valid: false
      }
    })
  }

  _onRouteDelete (event) {
    const id = event.target.id

    this.setState((prevState, props) => {
      delete prevState.stepData.route[id]
      return {
        stepData: prevState.stepData,
        valid: this._validateAll(prevState)
      }
    })
  }

  _save () {
    if (this._validateAll(this.state)) {
      firebase.database().ref('step/' + this.props.stepData.id).set(this.state.stepData)
    }
  }

  _refresh () {
    this.setState((prevState, props) => {
      return {
        valid: true,
        focus: {
          manual: false,
          id: ''
        },
        stepData: _copyNested(this._initialStepData)
      }
    })
  }

  _onRadiosSelect (event) {
    const target = event.target

    const title = target.title
    const conditionID = target.getAttribute('data-conditionID')
    const id = target.id
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value

    if (title === 'condition') {
      this.setState((prevState, props) => {
        prevState.stepData.condition[conditionID][id][name] = value
        return prevState
      })
    }
  }

  _onInputChange (event) {
    const target = event.target

    const title = target.title
    const conditionID = target.getAttribute('data-conditionID')
    const id = target.id
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value

    if (title === 'condition') {
      this.setState((prevState, props) => {
        if (name === 'id') {
          prevState.focus.manual = true

          if (prevState.stepData.condition[conditionID][value]) { // id 欄位與其他 condition 重複時，不動 key
            prevState.valid = false
            prevState.stepData.condition[conditionID][id].id = value
            prevState.focus.id = id
          } else { // id 欄位合法變更時，改 key
            prevState.stepData.condition[conditionID][value] = _copyNested(prevState.stepData.condition[conditionID][id])
            delete prevState.stepData.condition[conditionID][id]

            prevState.stepData.condition[conditionID][value].id = value
            prevState.valid = this._validateAll(prevState)
            prevState.focus.id = value
          }
        } else if (name !== 'condition') {
          prevState.focus.manual = false
          prevState.stepData.condition[conditionID][id][name] = value
          prevState.valid = this._validateAll(prevState)
        }

        return {
          stepData: prevState.stepData,
          valid: prevState.valid,
          focus: prevState.focus
        }
      })
    }

    if (title === 'route') {
      this.setState((prevState, props) => {
        if (name === 'id') {
          prevState.focus.manual = true

          if (prevState.stepData.route[value]) { // id 欄位與其他 route 重複時，不動 key
            prevState.valid = false
            prevState.stepData.route[id].id = value
            prevState.focus.id = id
          } else { // id 欄位合法變更時，改 key
            prevState.stepData.route[value] = _copyNested(prevState.stepData.route[id])
            delete prevState.stepData.route[id]

            prevState.stepData.route[value].id = value
            prevState.valid = this._validateAll(prevState)
            prevState.focus.id = value
          }
        } else {
          prevState.focus.manual = false
          prevState.stepData.route[id][name] = value
          prevState.valid = this._validateAll(prevState)
        }

        return {
          stepData: prevState.stepData,
          valid: prevState.valid
        }
      })
    }
  }

  render () {
    const action = (
      <ActionButton
        link={'/step/' + this.state.stepData.id}
        save={this._save}
        class={this.state.valid ? '' : ' disabled'}
        refresh={this._refresh}
      />
    )

    let conditionFormJSX

    const condition = this.state.stepData.condition
    if (condition && Object.keys(condition).length > 0) {
      conditionFormJSX = Object.keys(condition).map((key) => {
        if (condition[key]) {
          return (
            <ConditionForm
              key={key}
              id={key}
              rules={condition[key]}
              focus={this.state.focus}
              onConditionDelete={this._onConditionDelete}
              onRuleAdd={this._onRuleAdd}
              onRuleDelete={this._onRuleDelete}
              onInputChange={this._onInputChange}
              onRadioSelect={this._onRadiosSelect}
              quizIDs={this.state.quizIDs}
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
      const option = this.state.quizData.option
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
              onRouteDelete={this._onRouteDelete}
              onInputChange={this._onInputChange}
              quizIDs={this.state.quizIDs}
              quizAnswers={answers}
            />
          )
        } else {
          return null
        }
      })
    }

    return (
      <div className='FormWrapper basic ui segment'>
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
                <a onClick={this._onRouteAdd} className='ui green icon labeled mini button'>
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
