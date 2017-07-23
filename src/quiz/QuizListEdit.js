import React, { Component } from 'react'
import firebase from 'firebase'
import {HashLink as Link} from 'react-router-hash-link'

import _copyNested from '../_shared/_copyNested'

class QuizListEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      quiz: _copyNested(this.props.quiz),
      valid: true,
      focus: ''
    }

    this._addQuiz = this._addQuiz.bind(this)
    this._deleteQuiz = this._deleteQuiz.bind(this)
    this._changeInput = this._changeInput.bind(this)

    this._validate = this._validate.bind(this)
    this._validateAll = this._validateAll.bind(this)

    this._save = this._save.bind(this)
    this._refresh = this._refresh.bind(this)

    this._initialQuiz = _copyNested(this.props.quiz)
  }

  componentWillReceiveProps (nextProps) {
    this.setState((prevState, props) => {
      this._initialQuiz = _copyNested(nextProps.quiz)
      prevState.quiz = _copyNested(nextProps.quiz)
      prevState.valid = true
      prevState.focus = ''
      return prevState
    })
  }

  _refresh () {
    this.setState((prevState, props) => {
      prevState.quiz = _copyNested(this._initialQuiz)
      prevState.valid = true
      prevState.focus = ''
      return prevState
    })
  }

  _save () {
    if (this.state.valid) {
      firebase.database().ref('quiz').set(this.state.quiz)
    }
  }

  _validate (id) {
    let valid = true
    if (id.length === 0 
      || id === 'new' 
      || id === 'edit' 
      || id === 'quiz_id'
      || this.state.quiz[id]) {
      valid = false
    }
    return valid
  }

  _validateAll (quiz) {
    let valid = true
    Object.keys(quiz).forEach((id) => {
      if (id.length === 0 
        || id === 'new' 
        || id === 'edit' 
        || id === 'quiz_id') {
        valid = false
      }
    })
    return valid
  }

  _addQuiz () {

    this.setState((prevState, props) => {

      prevState.quiz.quiz_id = {
        id: 'quiz_id',
        title: '',
        description: '',
        type: '',
        option: [
          {
            title: '選項',
            value: ''
          }
        ]
      }
      prevState.valid = false
      prevState.focus = 'quiz_id'
      return prevState
    })
  }

  _deleteQuiz (event) {

    const id = event.target.getAttribute('data-id')

    this.setState((prevState, props) => {
      delete prevState.quiz[id]
      prevState.valid = this._validateAll(prevState.quiz)
      return prevState
    })
  }

  _changeInput (event) {
    const target = event.target

    const id = target.getAttribute('data-id')
    const value = target.value

    this.setState((prevState, props) => {
      if (!this._validate(value) || prevState.quiz[value]) {
        prevState.valid = false
        prevState.quiz[id].id = value
        prevState.focus = id
      } else {
        prevState.quiz[value] = prevState.quiz[id]
        prevState.quiz[value].id = value
        prevState.focus = value
        delete prevState.quiz[id]
        prevState.valid = this._validateAll(prevState.quiz)
      }

      return prevState
    })
  }

  render () {
    const valid = this.state.valid ? '' : 'disabled'
    const quiz = this.state.quiz
    const focus = this.state.focus

    let quizListJSX
    if (quiz) {
      quizListJSX = Object.keys(quiz).map((id) => {
        const item = quiz[id]

        return (
          <tr key={id}>
            <td className='ten wide top aligned'>
              <div className='ui fluid input'>
                <input
                  type='text'
                  data-id={id}
                  name='id'
                  value={item.id}
                  placeholder={id}
                  onChange={this._changeInput}
                  autoFocus={focus === id ? true : false}
                  />
              </div>
            </td>
            <td className='right aligned'>
              <a className='ui mini red icon button'
                data-id={id} onClick={this._deleteQuiz}
              >
                <i data-id={id} className='icon trash' />
              </a>
            </td>
          </tr>
        )
      })
    }

    return (
      <div className='QuizList ui basic segment'>
        <h2 className='ui header'>編輯測驗題列表</h2>
        <table className='ui unstackable table'>
          <thead>
            <tr>
              <th>代號 *</th>
              <th className='three wide' />
            </tr>
          </thead>
          <tbody>
            { quizListJSX }
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={2} className='right aligned'>
                <div className='ui mini buttons'>
                  <Link to='/quiz/' onClick={this._save} className={'ui icon labeled teal button ' + valid} >
                    <i className='icon checkmark' />
                    儲存
                  </Link>
                  <Link to='/quiz/' className='ui icon labeled button' >
                    <i className='icon cancel' />
                    取消
                  </Link>
                  <a onClick={this._refresh} className='ui icon labeled yellow button' >
                    <i className='icon refresh' />
                    還原
                  </a>
                  <a onClick={this._addQuiz} className='ui icon labeled green button' >
                    <i className='icon add' />
                    新增
                  </a>
                </div>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}

export default QuizListEdit
