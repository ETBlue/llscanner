import React, { Component } from 'react'
import {HashLink as Link} from 'react-router-hash-link'

class ActionButton extends Component {
  render () {
    return (
      <div className='Action ui mini buttons'>
        <Link to={this.props.link} onClick={this.props.save} className={'ui icon labeled teal mini button' + this.props.class}>
          <i className='icon checkmark' />
          送出
        </Link>
        <Link to={this.props.link} className='ui icon labeled mini button'>
          <i className='icon cancel' />
          取消
        </Link>
        <a onClick={this.props.refresh} className='ui icon labeled yellow mini button'>
          <i className='icon refresh' />
          還原
        </a>
      </div>
    )
  }
}

export default ActionButton
