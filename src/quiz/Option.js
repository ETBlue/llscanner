import React, { Component } from 'react';

class Option extends Component {

  render() {
    return (
      <button data-answer={this.props.id} onClick={this.props.onClick} className={"ui fluid button " + this.props.className}>
      {this.props.title}
      </button>
    );
  }

}

export default Option;
