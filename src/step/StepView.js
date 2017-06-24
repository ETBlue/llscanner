import React, { Component } from 'react'
import {HashLink as Link} from 'react-router-hash-link'

import _viewRoute from './_viewRoute'
import _viewPrecondition from './_viewPrecondition'

import './StepView.css'

class StepView extends Component {

  render () {
    const step = this.props.stepData
    const quiz = this.props.quizData

    return (
      <section className='StepView'>
        <div className='Question ui basic segment'>
          <h3 className='ui header'>
            <span className='ui horizontal label'>
            步驟 {step.id}
            </span>
            <code>
              {step.quiz}
            </code>
          </h3>
          <p>
            <Link to={'/quiz/' + step.quiz} >
              {quiz.title}
            </Link>
          </p>
          <hr className='ui hidden divider' />
          <div className='ui two column stackable grid'>
            <div className='left aligned column'>
              <h4 className='ui dividing header'>進入條件</h4>
              {_viewPrecondition(step.precondition)}
            </div>
            <div className='left aligned column'>
              <h4 className='ui dividing header'>離開路徑</h4>
              {_viewRoute(step.route)}
            </div>
          </div>
          <hr className='ui hidden divider' />
        </div>
      </section>
    )
  }
}

export default StepView
