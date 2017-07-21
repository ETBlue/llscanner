import React, { Component } from 'react'
import firebase from 'firebase'
import {HashLink as Link} from 'react-router-hash-link'

import Option from './Option'
import './QuizView.css'

class QuizView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      quizData: {
        id: this.props.id,
        title: this.props.title,
        description: this.props.description,
        type: this.props.type
      },
      optionData: this.props.option || (this.props.type === 'select' ? this._basicOptionData : {}),
      answerData: this.props.answerData || '', // 使用者選擇的答案
      answerOwner: this.props.answerOwner,

      orderData: this.props.orderData,
      routeData: this.props.routeData,
      preconditionData: this.props.preconditionData
    }

    this._onInputChange = this._onInputChange.bind(this)
    this._onInputSubmit = this._onInputSubmit.bind(this)
    this._onSelect = this._onSelect.bind(this) // 根據使用者的選擇設定這題的答案
  }

  componentWillReceiveProps (nextProps) {
    this.setState((prevState, props) => {
      return {
        quizData: {
          id: nextProps.id,
          title: nextProps.title,
          description: nextProps.description,
          type: nextProps.type
        },
        optionData: nextProps.option || (nextProps.type === 'select' ? this._basicOptionData : {}),
        answerData: nextProps.answerData || '', // 使用者選擇的答案
        answerOwner: nextProps.answerOwner,

        orderData: nextProps.orderData,
        routeData: nextProps.routeData,
        preconditionData: nextProps.preconditionData
      }
    })
  }

  _onInputChange (event) {
    const answerData = event.target.value || ''
    this.setState((prevState, props) => {
      return {
        answerData: answerData
      }
    })
  }

  _onInputSubmit (event) {
    firebase.database().ref(`answer/${this.props.answerOwner}/${this.props.id}`).set(this.state.answerData)
  }

  _onSelect (event) {
    const answerData = event.target.getAttribute('data-value')
    firebase.database().ref(`answer/${this.props.answerOwner}/${this.props.id}`).set(answerData)
  }

  render () {

    if (!this.state.orderData) {
      return null
    }

    let answerDataJSX

    const routeData = this.state.routeData

    if (this.state.quizData.type === 'select') {
      const optionData = this.state.optionData
      if (optionData) {
        const optionDataJSX = optionData.map((item, key) => {
          const className = this.state.answerData === item.value ? 'active' : ''
          const next = routeData ? 
            (routeData[item.value] ? routeData[item.value] : this.state.orderData.next)
            : this.state.orderData.next
          return (
            <Option
              {...item}
              key={key}
              next={next}
              className={className}
              onClick={this._onSelect}
            />
          )
        })
        answerDataJSX = (
          <div className='ui vertical fluid basic buttons'>
            {optionDataJSX}
          </div>
        )
      }
    }

    if (this.state.quizData.type === 'input') {
      const link = this.state.orderData.next ? '/quiz/' + this.state.orderData.next : '/answer/'
      answerDataJSX = (
        <div className='ui action input'>
          <input
            type='text'
            id={this.state.quizData.id}
            placeholder={this.state.answerData}
            value={this.state.answerData}
            onChange={this._onInputChange}
          />
          <Link
            to={link}
            className='ui button'
            onClick={this._onInputSubmit}
          >
            Submit
          </Link>
        </div>
      )
    }

    return (
      <section className='QuizView'>
        <div className='Question ui center aligned basic segment'>
          <h3 className='ui header'>
            {this.state.quizData.title}
          </h3>
          <p>
            {this.state.quizData.description}
          </p>
          { answerDataJSX }
        </div>
      </section>
    )
  }
}

export default QuizView
