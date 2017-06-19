import React, { Component } from 'react'
import './OptionForm.css'

class OptionForm extends Component {
  render () {
    return (
      <div className='OptionForm' >
        <h4 className='ui header'>編輯選項</h4>
        <a className='ui right top floated orange icon labeled mini button'
          id={this.props.id}
          data-number={this.props.number}
          onClick={this.props.onDelete}
          >
          <i className='icon trash' />
          刪除此選項
        </a>
        <div className={'field' + (this.props.title ? '' : ' error')}>
          <label>顯示文字 *</label>
          <input
            type='text'
            title='option'
            name='title'
            id={this.props.id}
            value={this.props.title}
            onChange={this.props.onChange}
            placeholder='請輸入字串'
          />
        </div>
        <div className='two fields'>
          <div className={'field ' + (this.props.id ? '' : 'error')}>
            <label>排序 *</label>
            <input
              type='text'
              title='option'
              name='id'
              id={this.props.id}
              value={this.props.id}
              onChange={this.props.onChange}
              placeholder='請輸入數字，注意不可以跟其他選項重複喔'
              autoFocus={this.props.focus}
              data-number={this.props.number}
            />
          </div>
          <div className='field'>
            <label>設定值</label>
            <input
              type='text'
              title='option'
              name='value'
              id={this.props.id}
              value={this.props.value}
              onChange={this.props.onChange}
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
