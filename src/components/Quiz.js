import React, { Component } from 'react';
import Answer from './Answer';
import './Quiz.css';

class Quiz extends Component {

  constructor() {
    super();
    this.state={};
    this._getAnswer = this._getAnswer.bind(this);
    this._setAnswer = this._setAnswer.bind(this);
  }

  _getAnswer() {
    const answer = this.props.answer;
    if (answer) {
      return (
        Object.keys(answer).map( (answeritem) => {
          const item = answer[answeritem];
          return (
            <Answer onClick={this._setAnswer(item.id)} key={item.id} {...item} />
          )
        })
      );
    }
  }

  _setAnswer() {

  }

  render() {
    return (
      <section className="Quiz">
      <div className="ui center aligned segment">
      <h3 className="ui header">
      {this.props.title}
      </h3>
      <p>
      {this.props.description}
      </p>
      {this._getAnswer()}
      </div>
      </section>
    );
  }

}

export default Quiz;
