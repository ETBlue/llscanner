import React, { Component } from 'react'

class RouteForm extends Component {

  render () {

    const routeID = this.props.routeID
    const answer = this.props.answer
    const next = this.props.next

    const quizIDs = this.props.quizIDs
    const answerValues = this.props.answerValues

    const changeInput = this.props.changeInput
    const deleteRoute = this.props.deleteRoute

    const answerOptionJSX = !answerValues ? [] : answerValues.map((answer, index) => {
      return (
        <option key={index} value={answer} />
      )
    })

    const quizOptionJSX = !quizIDs ? [] : quizIDs.map((quizID, index) => {
      return (
        <option key={index} value={quizID} />
      )
    })

    return (
      <div className='RouteForm' >
        <header className='_header'>
          <h5 className='ui header'>路徑 {routeID}</h5>
          <a className='ui _rightTopFloated red icon labeled mini button'
            data-routeID={routeID}
            onClick={deleteRoute}
          >
            <i className='icon trash' />
            刪除路徑 {routeID}
          </a>
        </header>
        <div className={'field ' + (answer ? '' : 'error')}>
          <label>答案值 *</label>
          <input
            type='text'
            data-routeID={routeID}
            value={answer}
            onChange={changeInput}
            placeholder='此題的答案值'
            list='answerValues'
          />
          <datalist id='answerValues'>
            { answerOptionJSX }
          </datalist>
        </div>
        <div className='field'>
          <label>題目代號</label>
          <input
            type='text'
            data-routeID={routeID}
            value={next}
            onChange={changeInput}
            placeholder='將前往的下一題代號'
            list='quizIDs'
          />
          <datalist id='quizIDs'>
            { quizOptionJSX }
          </datalist>
        </div>
        <hr className='ui divider' />
      </div>
    )
  }
}

export default RouteForm
