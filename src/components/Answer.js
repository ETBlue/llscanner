import React, { Component } from 'react';

class Answer extends Component {

  render() {
    return (
      <button className="Answer ui fluid button">
      {this.props.title}
      </button>
    );
  }

}

export default Answer;
