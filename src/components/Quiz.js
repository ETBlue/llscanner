import React from 'react'
import { Redirect } from 'react-router'
import { HashLink as Link } from 'react-router-hash-link'
import { Progress } from 'semantic-ui-react'
import PropTypes from 'prop-types'

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

const Quiz = ({rawQuizID, quizID, quiz, nextStep, quizIndex, totalStep, answer, onOptionClick, onButtonClick}) => {

  if (quizID === 'report') {
    return (<Redirect to='/report' push />)
  }
  if (quizID !== rawQuizID) {
    return (<Redirect to={`/${quizID}`} push />)
  }

  const next = quiz.next.length > 0 ? quiz.next : nextStep

  let userInput
  if (quiz.type === 'select') {
    const routes = quiz.route.split(';')
    userInput = (
      <div>
        {
          Object.keys(options[quiz.option]).map((key, index) => (
          <Option
            key={key}
            title={options[quiz.option][key]}
            link={routes[index] || next}
            onClick={() => onOptionClick(quizID, key)}
          />
          ))
        }
      </div>
    )
  } else if (quiz.type === 'input') {
    userInput = (
      <Link to={`/${next}`} className='ui button'>
      next
      </Link>
    )
  }

  return (
    <section className='Quiz'>
      <Progress value={quizIndex + 1} total={totalStep} size='tiny' color='teal' />
      <div className='ui two column stackable grid'>
        <div className='four wide column'>
          <p style={{fontSize: '5rem', fontFamily: 'serif', lineHeight: '1', textAlign: 'right', paddingRight: '1rem', borderRight: '4px #ccc solid'}}>Q</p>
        </div>
        <div className='eight wide column'>
          <h2 className='ui header' style={{marginTop: '1rem'}} >
            {quiz.title.length > 0 ? quiz.title : quiz.id}
          </h2>
          <p>
            {quiz.description}
          </p>
          {userInput}
        </div>
      </div>
    </section>
  )
}

Quiz.proptypes = {
  quizID: PropTypes.string.isRequired,
  quiz: PropTypes.shape({
    id: PropTypes.oneOf(QuizID).isRequired,
    type: PropTypes.oneOf(QuizTypeID).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    option: PropTypes.string,
    next: PropTypes.string,
    route: PropTypes.arrayOf(PropTypes.string),
    logic: PropTypes.oneOf(RuleSetLogicID),
    rule: PropTypes.arrayOf({
      logic: PropTypes.oneOf(RuleLogicID).isRequired,
      target: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  }),
  onOptionClick: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  nextStep: PropTypes.string.isRequired,
}

export default Quiz
