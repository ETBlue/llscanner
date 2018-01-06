import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { setAnswer } from '../actions'
import Quiz from '../components/Quiz'
import QuizData from '../data/QuizData'
import StepData from '../data/StepData'

let quizObj = {}
QuizData.forEach((item, index) => {
  quizObj[item.id] = item
  quizObj[item.id].index = index
})

const mapStateToProps = (state, ownProps) => {
  return {
    quizID: ownProps.quizID,
    quiz: quizObj[ownProps.quizID],
    nextStep: StepData[StepData.indexOf(ownProps.quizID) + 1] || 'report',
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onOptionClick: (quizID, content) => {
      dispatch(setAnswer(quizID, content))
    }
  }
}
const QuizPage = connect(mapStateToProps, mapDispatchToProps)(Quiz)

export default QuizPage
