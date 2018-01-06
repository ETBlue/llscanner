import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { setAnswer } from '../actions'
import Quiz from '../components/Quiz'

const quiz = [
  {
    "id" : "個案：不定期契約停止履行：另訂新約：前後工作年資合併計算？",
    "type" : "select",
    "title" : "個案：不定期契約停止履行：另訂新約：前後工作年資合併計算？",
    "description" : "...",
    "option" : [ {
      "title" : "是",
      "value" : "true",
      "route": null,
    }, {
      "title" : "否",
      "value" : "false",
      "route": null,
    }, {
      "title" : "我不確定",
      "value" : "unsure",
      "route": null,
    } ],
    "precondition" : {
      "logic" : "and",
      "rule": [],
    },
  },
]

let quizObj = {}
quiz.forEach((item, index) => {
  quizObj[item.id] = item
  quizObj[item.id].index = index
})

const step = [
  "個案：不定期契約停止履行：另訂新約：前後工作年資合併計算？",
  "個案：",
]

const mapStateToProps = state => {
  return {
    quizID: state.contentID,
    quiz: quizObj[state.contentID],
    nextStep: step[step.indexOf(state.contentID) + 1],
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOptionClick: (quizID, content) => {
      dispatch(setAnswer(quizID, content))
    }
  }
}
const QuizPage = connect(mapStateToProps, mapDispatchToProps)(Quiz)

export default QuizPage
