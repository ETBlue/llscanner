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
      <div className='OptionForm' >
        <h4 className='ui header'>選項 {id}</h4>
        <a className='ui right top floated orange icon mini button'
          data-id={id}
          onClick={deleteOption}
          >
          <i className='icon trash' />
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
          {/*<div className={'field ' + (this.props.id ? '' : 'error')}>
                      <label>排序 *</label>
                      <input
                        type='text'
                        data-group='option'
                        name='id'
                        data-id={id}
                        value={this.props.id}
                        onChange={changeInput}
                        placeholder='請輸入數字，注意不可以跟其他選項重複喔'
                        autoFocus={this.props.focus}
                        data-number={this.props.number}
                      />
                    </div>*/}
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
