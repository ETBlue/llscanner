import React, { Component } from 'react';
import firebase from 'firebase';

import Option from './Option';
import './Quiz.css';

class Quiz extends Component {

  constructor(props) {

    super(props);

    this.state = {
      answer: this.props.answer, // 使用者選擇的答案
      quizData: { // 準備送出的表單資料
        id: this.props.id,
        title: this.props.title,
        description: this.props.description,
      },
      optionData: this.props.option || this._basicOptionData
    };

    this._setAnswer = this._setAnswer.bind(this); // 根據使用者的選擇設定這題的答案

  }

  render() {

    let optionListJSX;
    const option = this.state.optionData;

    if (option) {

      optionListJSX = Object.keys(option).map( (key) => {
        const item = option[key];
        const className = this.state.answer === item.value ? "active" : "";
        return (
          <Option key={key} className={className} {...item} onClick={this._setAnswer} />
        )
      });
    }

    return (
      <section className="Quiz">
        <div className="Question ui center aligned basic segment">
          <h3 className="ui header">
            {this.props.title}
          </h3>
          <p>
            {this.props.description}
          </p>
          <div className="ui vertical fluid basic buttons">
          { optionListJSX }
          </div>
        </div>
      </section>
    );
  }

  _setAnswer(event) {

    let answer = event.target.getAttribute("data-value");

    this.setState((prevState, props) => {
      answer = prevState.answer === answer ? "unknown" : answer;
      firebase.database().ref('answer/' + this.props.id).set(answer);
      return {answer: answer};
    });
  }

}

export default Quiz;
