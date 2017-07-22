import React, { Component } from 'react'
import firebase from 'firebase'

import _copyNested from '../_shared/_copyNested'
import ActionButton from '../_shared/ActionButton'

import QuizForm from './QuizForm'
import OptionForm from './OptionForm'

class QuizEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: true,
      focus: null,
      quizData: _copyNested(this.props.quizData),
    }

    this._basicOptionData = {
      title: '選項',
      value: ''
    }

    this._initailState = _copyNested(this.state)

    this._addOption = this._addOption.bind(this)
    this._deleteOption = this._deleteOption.bind(this)

    this._changeInput = this._changeInput.bind(this)
    this._selectRadio = this._selectRadio.bind(this)
    this._placeHolder = this._placeHolder.bind(this)

    this._validateAll = this._validateAll.bind(this)

    this._save = this._save.bind(this)
    this._refresh = this._refresh.bind(this)
  }

  componentWillReceiveProps (nextProps) {

    this.setState((prevState, props) => {
      prevState.quizData = _copyNested(nextProps.quizData)
      prevState.valid = true
      prevState.focus = null
      this._initailState = _copyNested(prevState)
      return prevState
    })
  }

  _validateAll (prevState) {
    let valid = true

    if (prevState.quizData.title.length === 0) {
      valid = false
    }
    if (prevState.optionData) {
      prevState.optionData.forEach((item, key) => {
        if (item.title.length === 0) {
          valid = false
        }
      })
    }
    return valid
  }

  _addOption () {
    this.setState((prevState, props) => {
      if (!prevState.quizData.option) {
        prevState.quizData.option = []
      }
      prevState.quizData.option.push(this._basicOptionData)
      prevState.valid = false
      return prevState
    })
  }

  _deleteOption (event) {
    this.setState((prevState, props) => {
      delete prevState.quizData.option[event.target.getAttribute('data-id')]
      prevState.valid = this._validateAll(prevState)
      return prevState
    })
  }

  _save () {
    if (this._validateAll(this.state)) {
      firebase.database().ref(`quiz/${this.state.quizData.id}`).set(this.state.quizData)
    }
  }

  _refresh () {
    this.setState((prevState, props) => {
      return this._initailState
    })
  }

  _selectRadio (event) {
    const value = event.target.value

    this.setState((prevState, props) => {
      prevState.focus = null
      prevState.quizData.type = value
      return prevState
    })
  }

  _changeInput (event) {
    const target = event.target

    const group = target.getAttribute('data-group')
    const id = target.getAttribute('data-id')
    const name = target.name
    const value = target.value

    this.setState((prevState, props) => {
      if (group === 'quiz') {
          prevState.quizData[name] = value
      }
      if (group === 'option') {
          prevState.quizData.option[id][name] = value
      }
      prevState.focus = null
      prevState.valid = this._validateAll(prevState)

      return prevState
    })
  }

  _placeHolder () {
  }

  render () {

    const quizData = this.state.quizData

    const action = (
      <ActionButton
        className={this.state.valid ? '' : ' disabled'}
        link={`/quiz/${quizData.id}`}
        save={this._save}
        refresh={this._refresh}
      />
    )

    let optionFormJSX

    const option = quizData.option

    if (option) {
      optionFormJSX = option.map((item, key) => {
        let focus = false
        if (this.state.focus === key) {
          focus = true
        }
        return (
          <OptionForm
            key={key}
            id={key}
            title={item.title}
            value={item.value}
            deleteOption={this._deleteOption}
            changeInput={this._changeInput}
          />
        )
      })
    }

    return (
      <div className='_formWrapper basic ui segment'>
        <div className='QuizEdit ui segment'>
          {action}
          <hr className='ui divider' />
          <form ref='form' className='Form ui form'>
            <div className='ui two column divided stackable grid'>
              <div className='column'>
                <QuizForm
                  id={quizData.id}
                  title={quizData.title}
                  description={quizData.description}
                  type={quizData.type}
                  changeInput={this._changeInput}
                  selectRadio={this._selectRadio}
                  placeHolder={this._placeHolder}
                  />
              </div>
              <div className='column'>
                { quizData.type === 'select'
                  ? (<div className='optionForm'>
                    {optionFormJSX}
                    <a onClick={this._addOption} className='ui green icon labeled mini button'>
                      <i className='icon add' />
                      新增選項
                    </a>
                  </div>
                  ) : null
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

export default QuizEdit
