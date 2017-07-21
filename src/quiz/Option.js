import React, { Component } from 'react'
import {HashLink as Link} from 'react-router-hash-link'
import './Option.css'

class Option extends Component {
  render () {

    const link = this.props.next ? '/quiz/' + this.props.next : '/answer/'
    return (
      <Link
        to={link}
        className={'Option ui button ' + this.props.className}
        data-value={this.props.value}
        id={this.props.id}
        onClick={this.props.onClick}
      >
        {this.props.title}
      </Link>
    )
  }
}

export default Option
