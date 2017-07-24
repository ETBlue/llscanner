import React, { Component } from 'react'
import firebase from 'firebase'
import {HashLink as Link} from 'react-router-hash-link'

import _copyNested from '../_shared/_copyNested'

import Option from './Option'
import './QuizView.css'

class QuizView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      answerData: this.props.answerData,
    }

    this._onInputChange = this._onInputChange.bind(this)
    this._onInputSubmit = this._onInputSubmit.bind(this)
    this._onSelect = this._onSelect.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState((prevState, props) => {
      return {
        answerData: nextProps.answerData,
      }
    })
  }

  _onInputChange (event) {

    this.setState((prevState, props) => {
      prevState.answerData = event.target.value || ''
      return prevState
    })
  }

  _onInputSubmit (event) {
    firebase.database().ref(`answer/${this.props.answerOwner}/${this.props.quizData.id}`).set(this.state.answerData)
  }

  _onSelect (event) {
    firebase.database().ref(`answer/${this.props.answerOwner}/${this.props.quizData.id}`).set(event.target.getAttribute('data-value'))
  }

  render () {

    const orderData = this.props.orderData || {}

    const quizData = this.props.quizData
    if (!quizData) {
      return null
    }

    const optionData = quizData.option
    const routeData = quizData.route

    const answerData = this.state.answerData

    let answerDataJSX

    if (quizData.type === 'select') {
      if (optionData) {
        const optionDataJSX = optionData.map((item, key) => {
          const className = answerData === item.value ? 'active' : ''
          const next = routeData ? 
            (routeData[item.value] && routeData[item.value].length > 0
              ? routeData[item.value]
              : orderData.next
            )
            : orderData.next
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

    if (quizData.type === 'input') {
      const link = orderData.next ? `/quiz/${orderData.next}/` : '/answer/'
      answerDataJSX = (
        <div className='ui action input'>
          <input
            type='text'
            id={quizData.id}
            placeholder={answerData}
            value={answerData}
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
            {quizData.title}
          </h3>
          <p>
            {quizData.description}
          </p>
          { answerDataJSX }
        </div>
      </section>
    )
  }
}

export default QuizView
