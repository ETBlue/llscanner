import React from 'react'
import PropTypes from 'prop-types'
import {HashLink as Link} from 'react-router-hash-link'

import {
  RuleSetLogicID,
  RuleLogicID,
} from '../settings/Logic'
import {
  QuizTypeID,
  QuizID,
} from '../settings/Quiz'
import * as options from '../settings/Option'

import Option from './Option'

const Quiz = ({quizID, quiz, onOptionClick, onButtonClick, nextStep}) => {

  let answer

  if (quiz.type === 'select') {
    answer = (
      <div className='ui buttons'>
        {
          Object.keys(options[quiz.option]).map((key, index) => (
          <Option
            key={index}
            title={options[quiz.option][key]}
            link={quiz.route[key] || nextStep}
            onClick={() => onOptionClick(quizID, key, quiz.route[key] || nextStep)}
          />
          ))
        }
      </div>
    )
  } else if (quiz.type === 'input') {
    answer = (
      <Link to={`/${nextStep}`} className='ui button'>
      next
      </Link>
    )
  }

  return (
    <section className='Quiz'>
      <h2 className='ui icon header'>
        <i className='icon question'></i>
        {quiz.title}
      </h2>
      <p>
        {quiz.description}
      </p>
      {answer}
    </section>
  )
}

Quiz.proptypes = {
  quizID: PropTypes.string.isRequired,
  quiz: PropTypes.shape({
    type: PropTypes.oneOf(QuizTypeID).isRequired,
    id: PropTypes.oneOf(QuizID).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    option: PropTypes.string,
    precondition: PropTypes.shape({
      logic: PropTypes.oneOf(RuleSetLogicID),
      rule: PropTypes.arrayOf({
        logic: PropTypes.oneOf(RuleLogicID).isRequired,
        target: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }),
    }),
  }),
  onOptionClick: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  nextStep: PropTypes.string.isRequired,
}

export default Quiz
