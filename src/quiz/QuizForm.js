import React, { Component } from 'react'
import './QuizForm.css'

class QuizForm extends Component {
  render () {

    const id = this.props.id
    const title = this.props.title
    const description = this.props.description
    const type = this.props.type

    const changeInput = this.props.changeInput
    const selectRadio = this.props.selectRadio
    const placeHolder = this.props.placeHolder

    return (
      <div className='QuizForm'>
        <h4 className='ui header'>測驗題</h4>
        <div className={'field ' + (title ? '' : 'error')}>
          <label>題目 *</label>
          <input
            type='text'
            data-group='quiz'
            data-id={id}
            name='title'
            value={title}
            onChange={changeInput}
            placeholder='要讀者回答的問題'
            />
        </div>
        <div className='field'>
          <label>描述</label>
          <input
            type='text'
            data-group='quiz'
            data-id={id}
            name='description'
            value={this.props.description}
            onChange={changeInput}
            placeholder='問題的補充說明'
            />
        </div>
        <div className='inline fields'>
          <label>類型 *</label>
          <div className='field'>
            <input
              type='radio'
              data-group='quiz'
              data-id={id}
              name='type'
              value='select'
              onClick={selectRadio}
              onChange={placeHolder}
              checked={type === 'select'}
            />
            <label>select</label>
          </div>
          <div className='field'>
            <input
              type='radio'
              data-group='quiz'
              data-id={id}
              name='type'
              value='input'
              onClick={selectRadio}
              onChange={placeHolder}
              checked={type === 'input'}
            />
            <label>input</label>
          </div>
        </div>
        <div className={'field' + (this.props.id ? '' : ' error')}>
          <label>代號 *</label>
          <input
            type='text'
            data-group='quiz'
            data-id={id}
            name='id'
            value={this.props.id}
            onChange={changeInput}
            placeholder='本題的編號'
            disabled
            />
        </div>
      </div>
    )
  }
}

export default QuizForm
