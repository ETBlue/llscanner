import React, { Component } from 'react'
import './StepForm.css'

class StepForm extends Component {
  render () {
    const optionJSX = this.props.quizIDs.map((quizID) => {
      return (
        <option key={quizID} value={quizID} />
      )
    })
    return (
      <div className='StepForm'>
        <h4 className='ui header'>{this.props.header}</h4>
        <div className='two fields'>
          <div className={'field ' + (this.props.quiz ? '' : 'error')}>
            <label>題目代號 *</label>
            {/*
            TODO: select quiz ids
          */}
            <input
              type='text'
              name='quiz'
              value={this.props.quiz}
              onChange={this.props.onChange}
              placeholder='要讀者回答的問題代號'
              list='quizIDs'
            />
            <datalist id='quizIDs'>
              { optionJSX }
            </datalist>
          </div>
          <div className={'field' + (this.props.id ? '' : ' error')}>
            <label>排序 *</label>
            <input
              type='text'
              name='id'
              value={this.props.id}
              onChange={this.props.onChange}
              placeholder='本題的編號'
              />
          </div>
        </div>
      </div>
    )
  }
}

export default StepForm
