import React, { Component } from 'react'

class RouteForm extends Component {

  render () {

    const group = this.props.group
    const id = this.props.id
    const value = this.props.value

    const quizIDs = this.props.quizIDs

    const changeInput = this.props.changeInput
    const deleteRoute = this.props.deleteRoute

    const quizOptionJSX = !quizIDs ? [] : quizIDs.map((quizID, index) => {
      return (
        <option key={index} value={quizID} />
      )
    })

    return (
      <div className='RouteForm' >
        <header className='_header'>
          <h5 className='ui header'></h5>
        </header>
        <div className='field'>
          <label>回答<span className='code'>{id}</span>則導向</label>
          <input
            type='text'
            data-group={group}
            data-id={id}
            value={value}
            onChange={changeInput}
            placeholder='下一題代號，留空則採用預設'
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
