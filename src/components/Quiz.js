import React from 'react'
import PropTypes from 'prop-types'

import {
  RuleSetLogicID,
  RuleLogicID,
} from '../settings/Logic'
import {
  QuizTypeID,
  QuizID,
} from '../settings/Quiz'

import Option from './Option'

const Quiz = ({quizID, quiz, onOptionClick, onButtonClick, nextStep}) => {

  let answer

  if (quiz.type === 'select') {
    answer = (
      <div className='ui buttons'>
        {
          quiz.option.map((item, index) => (
          <Option
            key={index}
            item={item}
            link={item.route || nextStep}
            onClick={() => onOptionClick(quizID, item.value)}
          />
          ))
        }
      </div>
    )
  } else if (quiz.type === 'input') {
    answer = (
      <p>TODO</p>
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
    option: PropTypes.arrayOf({
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      route: PropTypes.string,
    }),
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
