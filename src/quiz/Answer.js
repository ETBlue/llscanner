import React, { Component } from 'react';

class Answer extends Component {

  render() {
    return (
      <button data-answer={this.props.id} onClick={this.props.onClick} className={"ui fluid button " + this.props.className}>
      {this.props.title}
      </button>
    );
  }

}

export default Answer;
