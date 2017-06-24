import React, { Component } from 'react'
import firebase from 'firebase'
import {HashLink as Link} from 'react-router-hash-link'

import QuizForm from './QuizForm'

class QuizAdd extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false,
      quizData: { // 準備送出的表單資料
        id: 'quiz_id',
        title: '問題',
        description: '',
        type: 'select'
      }
    }

    this._optionData = {
      1: {
        id: 1,
        title: '選項',
        value: ''
      }
    }

    this._onInputChange = this._onInputChange.bind(this) // 刪除本題
    this._validate = this._validate.bind(this)
    this._save = this._save.bind(this) // 將編輯的資料送出到 server
  }

  _onInputChange (event) {
    const target = event.target

    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value

    this.setState((prevState, props) => {
      prevState.quizData[name] = value
      prevState.valid = this._validate(prevState)

      return prevState
    })
  }

  _validate (prevState) {
    let valid = true
    if (prevState.quizData.title.length === 0 ||
      prevState.quizData.id.length === 0 ||
      this.props.quiz[prevState.quizData.id] !== undefined ||
      prevState.quizData.id === 'new' ||
      prevState.quizData.id === 'edit' ||
      prevState.quizData.id === 'quiz_id') {
      valid = false
    }
    if (prevState.quizData.type !== 'select' &&
      prevState.quizData.type !== 'input') {
      valid = false
    }
    return valid
  }

  _save () {
    if (this.state.valid) {
      let quizData = this.state.quizData
      quizData.option = this._optionData
      firebase.database().ref('quiz/' + quizData.id).set(quizData)
      firebase.database().ref('step/' + this.props.stepID).set({
        id: this.props.stepID,
        quiz: quizData.id
      })
    }
  }

  render () {
    const valid = this.state.valid ? '' : ' disabled'

    return (
      <div className='FormWrapper ui basic segment'>
        <div className='NewQuiz ui segment'>
          <form className='Form ui form'>
            <QuizForm
              {...this.state.quizData}
              header='新問題'
              onChange={this._onInputChange}
              />
            <hr className='ui divider' />
            <div className='ui mini buttons'>
              <Link
                to={'/quiz/' + this.state.quizData.id + '/edit'}
                onClick={this._save}
                className={'ui icon labeled teal button ' + valid}
                >
                <i className='icon checkmark' />
                  送出
                </Link>
              <Link to='/quiz' className='ui icon labeled button'>
                <i className='icon cancel' />
                  取消
                </Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default QuizAdd
