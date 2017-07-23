import React, { Component } from 'react'
import {HashLink as Link} from 'react-router-hash-link'

import _viewRoute from './_viewRoute'
import _viewPrecondition from './_viewPrecondition'

class StepView extends Component {

  render () {

    const stepIndex = this.props.stepIndex
    const quizID = this.props.quizID
    const quizData = this.props.quizData

    if (!quizData) {
      return null
    }

    return (
      <section className='StepView ui basic segment'>
        <h3 className='ui header'>
          <span className='ui horizontal label'>
          步驟 {stepIndex}
          </span>
          {quizID}
        </h3>
        <hr className='ui hidden divider' />
        <div className='ui two column stackable grid'>
          <div className='left aligned column'>
            <h4 className='ui dividing header'>進入條件</h4>
            {_viewPrecondition(quizData.precondition)}
          </div>
          <div className='left aligned column'>
            <h4 className='ui dividing header'>離開路徑</h4>
            {_viewRoute(quizData.route)}
          </div>
        </div>
      </section>
    )
  }
}

export default StepView
