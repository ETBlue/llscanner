import React, { Component } from 'react';

class Answer extends Component {

  constructor() {
    super();
    this.state = {
      color: "",
      style: "basic"
    };
    this._setAnswer = this._setAnswer.bind(this);
  }

  _setAnswer(event) {
    event.preventDefault();

    this.props.onClick(this.props.id);

    if (this.props.current === this.props.id) {
      this.setState({color: "", style: "basic"});
    } else {
      this.setState({color: "teal", style: ""});
    }
  }

  render() {
    return (
      <button onClick={this._setAnswer} className={"Answer ui fluid button " + this.state.color + " " + this.state.style }>
      {this.props.title}
      </button>
    );
  }

}

export default Answer;
