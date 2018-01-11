import React, { Component } from 'react'
import {HashLink as Link} from 'react-router-hash-link'

class ActionButton extends Component {

  render () {

    const link = this.props.link
    const save = this.props.save
    const className = this.props.className
    const refresh = this.props.refresh

    return (
      <div className='Action ui mini buttons'>
        <Link to={link} onClick={save} className={'ui icon labeled teal mini button' + className}>
          <i className='icon checkmark' />
          送出
        </Link>
        <Link to={link} className='ui icon labeled mini button'>
          <i className='icon cancel' />
          取消
        </Link>
        <a onClick={refresh} className='ui icon labeled yellow mini button'>
          <i className='icon refresh' />
          還原
        </a>
      </div>
    )

  }

}

export default ActionButton
