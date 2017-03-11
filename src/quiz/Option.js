import React, { Component } from 'react';
import './Option.css';

class Option extends Component {

  render() {
    return (
      <button data-answer={this.props.id} onClick={this.props.onClick} className={"Option ui button " + this.props.className}>
      {this.props.title}
      </button>
    );
  }

}

export default Option;
