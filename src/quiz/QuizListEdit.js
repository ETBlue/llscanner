import React, { Component } from 'react'
import firebase from 'firebase'
import {Link} from 'react-router-dom'

import _copyNested from '../_shared/_copyNested'

class QuizListEdit extends Component {
  constructor (props) {
    super(props)

    // to be rendered
    this.state = {
      quiz: _copyNested(this.props.quiz),
      valid: true,
      focus: ''
    }

    // form control functions
    this._onInputChange = this._onInputChange.bind(this)
    this._onQuizDelete = this._onQuizDelete.bind(this)
    this._validate = this._validate.bind(this)
    this._refresh = this._refresh.bind(this)
    this._save = this._save.bind(this)

    // data initialization
    this._initialQuiz = _copyNested(this.props.quiz)
    this._answer = _copyNested(this.props.answer)
    this._step = _copyNested(this.props.step)
    this._order = _copyNested(this.props.order)
    this._initialAnswer = _copyNested(this.props.answer)
    this._initialStep = _copyNested(this.props.step)
    this._initialOrder = _copyNested(this.props.order)
  }

  componentWillReceiveProps (nextProps) {
    this.setState((prevState, props) => {
      // data initialization... again
      this._initialQuiz = _copyNested(nextProps.quiz)
      this._answer = _copyNested(nextProps.answer)
      this._step = _copyNested(nextProps.step)
      this._order = _copyNested(nextProps.order)
      this._initialAnswer = _copyNested(nextProps.answer)
      this._initialStep = _copyNested(nextProps.step)
      this._initialOrder = _copyNested(nextProps.order)
      return {
        quiz: nextProps.quiz
      }
    })
  }

  _refresh () {
    this.setState((prevState, props) => {
      this._answer = _copyNested(this._initialAnswer)
      this._step = _copyNested(this._initialStep)
      this._order = _copyNested(this._initialOrder)

      return {
        quiz: _copyNested(this._initialQuiz),
        valid: true,
        focus: ''
      }
    })
  }

  _save () {
    if (this.state.valid) {
      firebase.database().ref('quiz').set(this.state.quiz)
      firebase.database().ref('answer').set(this._answer)
      firebase.database().ref('step').set(this._step)
    }
  }

  _validate (id) {
    let valid = true
    if (id.length === 0 || id === 'new' || id === 'edit' || id === 'quiz_id') {
      valid = false
    }
    return valid
  }

  _validateAll (quiz) {
    let valid = true
    Object.keys(quiz).forEach((key) => {
      if (!this._validate(key)) {
        valid = false
      }
    })
    return valid
  }

  _onQuizDelete (event) {
    const id = event.target.id
    this.setState((prevState, props) => {
      delete prevState.quiz[id]
      delete this._answer[id]
      if (this._order[id]) { delete this._step[this._order[id].id] }

      delete this._order[id]

      return prevState
    })
  }

  _onInputChange (event) {
    const target = event.target

    const id = target.id
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value

    this.setState((prevState, props) => {
      if (name === 'id') {
        if (!this._validate(value)) {
          prevState.valid = false
          prevState.quiz[id].id = value
          prevState.focus = id
        } else {
          if (prevState.quiz[value] !== undefined) {
            prevState.valid = false
            prevState.quiz[id].id = value
            prevState.focus = id
          } else {
            prevState.quiz[value] = prevState.quiz[id]
            prevState.quiz[value].id = value
            prevState.focus = value
            delete prevState.quiz[id]

            this._answer[value] = this._answer[id] || ''
            delete this._answer[id]

            if (this._order[id]) {
              this._step[this._order[id].id].quiz = value
              this._order[value] = this._order[id]
              this._order[value].current = value
              delete this._order[id]
            }

            prevState.valid = this._validateAll(prevState.quiz)
          }
        }
      }

      return prevState
    })
  }

  render () {
    const valid = this.state.valid ? '' : 'disabled'
    const quiz = this.state.quiz

    let quizListJSX
    if (quiz) {
      quizListJSX = Object.keys(quiz).map((id) => {
        const item = quiz[id]

        return (
          <tr key={id}>
            <td className='top aligned'>
              <h4 className='ui header'>
                <Link to={'/quiz/' + id}>{item.title}</Link>
              </h4>
            </td>
            <td className='top aligned'><code className='code'>{item.type}</code></td>
            <td className='top aligned'>
              <div className='ui input'>
                <input
                  type='text'
                  id={id}
                  name='id'
                  value={item.id}
                  placeholder={id}
                  onChange={this._onInputChange}
                  autoFocus={this.state.focus === id}
                  />
              </div>
            </td>
            <td className='right aligned'>
              <a id={id} onClick={this._onQuizDelete} className='ui mini red icon labeled button'>
                <i className='icon trash' />
                Delete
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
              <th className='five wide'>題目</th>
              <th className='two wide'>類型</th>
              <th className='five wide'>代號 *</th>
              <th className='four wide' />
            </tr>
          </thead>
          <tbody>
            { quizListJSX }
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={4} className='right aligned'>
                <div className='ui mini buttons'>
                  <Link to='/quiz' onClick={this._save} className={'ui icon labeled teal button ' + valid} >
                    <i className='icon checkmark' />
                    Save
                  </Link>
                  <Link to='/quiz' className='ui icon labeled button' >
                    <i className='icon cancel' />
                    Cancel
                  </Link>
                  <a onClick={this._refresh} className='ui icon labeled yellow button' >
                    <i className='icon refresh' />
                    Refresh
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
