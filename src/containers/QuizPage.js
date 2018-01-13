import { connect } from 'react-redux'
//import { push } from 'react-router-redux'
import PropTypes from 'prop-types'

import { setAnswer } from '../actions'
import Quiz from '../components/Quiz'
import { QuizData } from '../data/QuizData'
import * as StepData from '../data/StepData'
import { evalCondition } from '../settings/tool'

let quizObj = {}
QuizData.forEach((item, index) => {
  quizObj[item.id] = item
  quizObj[item.id].index = index
})
const step = StepData.basic

let quizID, quiz, nextStep, result

const setQuiz = (id) => {
  quizID = id
  quiz = quizObj[id]
  nextStep = step[step.indexOf(id) + 1] || 'report'
}

const mapStateToProps = (state, ownProps) => {

  setQuiz(ownProps.quizID)

  const quizJump = () => {
    if (quiz.rule.length === 0 || evalCondition(quiz.logic, quiz.rule, state.answer).result === true) {
    // render current quiz
      result = {
        rawQuizID: ownProps.quizID,
        quizID: quizID,
        quiz: quiz,
        nextStep: nextStep,
        quizIndex: step.indexOf(quizID),
        totalStep: step.length,
        answer: state.answer,
      }
    } else {
    // jump to next step
      setQuiz(nextStep)
      quizJump()
    }
  }

  quizJump()

  return result
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onOptionClick: (id, content) => {
      dispatch(setAnswer(id, content))
      localStorage.setItem(id, content)
    }
  }
}
const QuizPage = connect(mapStateToProps, mapDispatchToProps)(Quiz)

QuizPage.proptypes = {
}
export default QuizPage
