import React, { Component } from 'react'
import {HashLink as Link} from 'react-router-hash-link'
import './Option.css'

class Option extends Component {
  render () {
    return (
      <Link
        to={'/quiz/' + this.props.next}
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
