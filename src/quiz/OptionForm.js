import React, { Component } from 'react'
import './OptionForm.css'

class OptionForm extends Component {

  render () {

    const id = this.props.id
    const title = this.props.title
    const value = this.props.value
    const deleteOption = this.props.deleteOption
    const changeInput = this.props.changeInput

    return (
      <div className='OptionForm' data-id={id}>
        <h4 className='ui header'>
          <i className='sort icon sortable-handle' />
          選項 {id}
        </h4>
        <a className='ui right top floated orange icon mini button'
          data-id={id}
          onClick={deleteOption}
          >
          <i className='icon trash' 
            data-id={id}
          />
        </a>
        <div className='two fields'>
          <div className={'field' + (title ? '' : ' error')}>
            <label>顯示文字 *</label>
            <input
              type='text'
              data-group='option'
              data-id={id}
              name='title'
              value={title}
              onChange={changeInput}
              placeholder='請輸入字串'
            />
          </div>
          <div className='field'>
            <label>設定值</label>
            <input
              type='text'
              data-group='option'
              data-id={id}
              name='value'
              value={value}
              onChange={changeInput}
              placeholder='請輸入此選項代表的值'
            />
          </div>
        </div>
        <hr className='ui divider' />
      </div>
    )
  }
}

export default OptionForm
