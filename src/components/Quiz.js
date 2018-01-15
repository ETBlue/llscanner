import React from 'react'
import { Redirect } from 'react-router'
import { HashLink as Link } from 'react-router-hash-link'
import { Progress } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import * as options from '../settings/Option'
import Option from './Option'


const Quiz = ({rawQuizID, quizID, quiz, nextStep, quizIndex, totalStep, answer, onOptionClick}) => {

  if (quizID === 'report') {
    return (<Redirect to='/report' push />)
  }
  if (quizID !== rawQuizID) {
    return (<Redirect to={`/${quizID}`} push />)
  }

  const next = quiz.next.length > 0 ? quiz.next : nextStep
  const previousVal = localStorage.getItem(quizID)
  let userInputJSX

  if (quiz.type === 'select') {
    const routes = quiz.route.split(';')
    userInputJSX = (
      <div>
        {
          Object.keys(options[quiz.option]).map((key, index) => (
          <Option
            key={`${quizID}-${key}`}
            title={options[quiz.option][key]}
            link={routes[index] || next}
            status={previousVal === key ? 'teal' : ''}
            onClick={() => onOptionClick(quizID, key)}
          />
          ))
        }
      </div>
    )
  } else if (quiz.type === 'input') {
    let inputChanged = false
    let inputValue, placeholder
    switch (previousVal) {
      case undefined:
      case null:
      case '':
      case 'null':
        placeholder = 'number...'
        inputValue = null
        break
      default:
        if (isNaN(parseFloat(previousVal))) {
          placeholder = 'number...'
          inputValue = null
        } else {
          placeholder = previousVal
          inputValue = previousVal
        }
    }
    userInputJSX = (
      <div className='ui action input' key={quizID}>
      <input type='text' placeholder={placeholder} onChange={(e) => {inputValue = e.target.value; inputChanged = true }} />
      <Link to={`/${next}`} className='ui icon button' onClick={() => {inputValue = inputChanged ? inputValue : previousVal; onOptionClick(quizID, inputValue)}}>
      <i className='icon check'></i>
      </Link>
      </div>
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
          {userInputJSX}
        </div>
      </div>
      <hr className='ui hidden divider' />
    </section>
  )
}

Quiz.proptypes = {
}

export default Quiz
