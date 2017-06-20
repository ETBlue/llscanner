import React, { Component } from 'react'
import firebase from 'firebase'
import {HashLink as Link} from 'react-router-hash-link'

import _copyNested from '../_shared/_copyNested'
import ActionButton from '../_shared/ActionButton'

class ArticleEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: true,
      focus: {
        manual: false,
        id: ''
      },
      lawID: this.props.lawID,
      articleID: this.props.articleID,
      content: this.props.articleContent,
      rules: _copyNested(this.props.rules),
    }

    this._basicRuleData = {
      target: '',
      logic: '',
      value: '',
    }
    this._basicConditionData = {
      logic: 'and',
      rule: {
        1: _copyNested(this._basicRuleData)
      }
    }
    this._basicReferenceData = {
      article: this.state.articleID,
      paragraph: '',
      subparapraph: '',
    }

    this._initialRulesData = _copyNested(this.props.rules)

    this._validateAll = this._validateAll.bind(this)

    this._onRuleAdd = this._onRuleAdd.bind(this) // 新增選項
    this._onRuleDelete = this._onRuleDelete.bind(this) // 刪除選項
    this._onInputChange = this._onInputChange.bind(this) // 刪除本題
    this._onRadioSelect = this._onRadioSelect.bind(this)
    this._save = this._save.bind(this) // 將編輯的資料送出到 server
    this._refresh = this._refresh.bind(this) // 取消編輯到一半的資料
  }

  componentWillReceiveProps (nextProps) {
  }

  _validateAll (prevState) {
    let valid = true
    if (prevState.quizData.title.length === 0) {
      valid = false
    } else {
      if (prevState.rules) {
        Object.keys(prevState.rules).forEach((key) => {
          if (prevState.rules[key]) {
            if (prevState.rules[key].id.length === 0 ||
              prevState.rules[key].title.length === 0) {
              valid = false
            }
          }
        })
      }
    }
    return valid
  }

  _onRuleAdd () {
    this.setState((prevState, props) => {
      const id = Math.max(...Object.keys(prevState.rules)) + 1
      prevState.rules[id] = {
        id: id,
        title: this._basicRuleData[1].title,
        value: this._basicRuleData[1].value
      }
      return {
        rules: prevState.rules
      }
    })
  }

  _onRuleDelete (event) {
    const id = event.target.getAttribute('data-number')

    this.setState((prevState, props) => {
      delete prevState.rules[id]
      return {
        rules: prevState.rules,
        valid: this._validateAll(prevState)
      }
    })
  }

  _save () {
    if (this._validateAll(this.state)) {
      const rules = Object.keys(this.state.rules).length === 0
        ? this._basicRuleData : this.state.rules

      let quiz = this.state.quizData
      quiz.option = rules

      firebase.database().ref('quiz/' + quiz.id).set(quiz)
    }
  }

  _refresh () {
    this.setState((prevState, props) => {
      const rules = _copyNested(this._initialRulesData)
      return {
        quizData: _copyNested(this._initialRulesData),
        rules: rules
      }
    })
  }

  _onRadioSelect (event) {
    const target = event.target

    const title = target.title
    const id = target.id
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value

    if (title === 'quiz' && name === 'type') {
      this.setState((prevState, props) => {
        prevState.focus.manual = false
        prevState.quizData.type = value
        return {
          quizData: prevState.quizData,
          focus: prevState.focus
        }
      })
    }
  }

  _onInputChange (event) {
    const target = event.target

    const title = target.title
    const id = target.id
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value
    const number = target.getAttribute('data-number') // 中繼狀態用的 id 替身

    if (title === 'quiz') {
      this.setState((prevState, props) => {
        prevState.focus.manual = false
        prevState.quizData[name] = value
        prevState.valid = this._validateAll(prevState)

        return {
          quizData: prevState.quizData,
          valid: prevState.valid,
          focus: prevState.focus
        }
      })
    }

    if (title === 'option') {
      this.setState((prevState, props) => {
        if (name === 'id') {
          prevState.focus.manual = true

          if (prevState.rules[value]) { // id 欄位與其他 option 重複時，不動 key
            prevState.valid = false
            prevState.rules[number].id = value
            prevState.focus.id = number
          } else { // id 欄位合法變更時，改 key
            prevState.rules[value] = Object.assign({}, prevState.rules[number])
            delete prevState.rules[number]

            prevState.rules[value].id = value
            prevState.valid = this._validateAll(prevState)
            prevState.focus.id = value
          }
        } else if (name !== 'type') {
          prevState.focus.manual = false
          prevState.rules[id][name] = value
          prevState.valid = this._validateAll(prevState)
        }

        return {
          rules: prevState.rules,
          valid: prevState.valid,
          focus: prevState.focus
        }
      })
    }
  }

  render () {
    const action = (
      <ActionButton
        link={'/law/' + this.state.articleID}
        save={this._save}
        class={this.state.valid ? '' : ' disabled'}
        refresh={this._refresh}
      />
    )

    let optionFormJSX

    const option = this.state.rules
    if (option && Object.keys(option).length > 0) {
      optionFormJSX = Object.keys(option).map((key) => {
        if (option[key]) {
          const item = option[key]
          let focus = false
          if (this.state.focus.manual && this.state.focus.id === key) {
            focus = true
          }
          return (`
            <OptionForm
              key={key}
              number={key} {...item}
              focus={focus}
              onDelete={this._onRuleDelete}
              onChange={this._onInputChange}
            />`
          )
        } else {
          return null
        }
      })
    }

    return (
      <div className='FormWrapper basic ui segment'>
        <div className='ArticleEdit ui segment'>
          {action}
          <hr className='ui divider' />
          <form ref='form' className='Form ui form'>
            <div className='ui two column divided stackable grid'>
              <div className='column'>
              </div>
              <div className='column'>
                { this.state.quizData.type === 'select'
                  ? (<div className='optionForm'>
                    {optionFormJSX}
                    <a onClick={this._onRuleAdd} className='ui green icon labeled mini button'>
                      <i className='icon add' />
                      新增選項
                    </a>
                  </div>
                  ) : ''
                }
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

export default ArticleEdit
