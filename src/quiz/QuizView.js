import React, { Component } from 'react';
import firebase from 'firebase';

import Option from './Option';
import './QuizView.css';

class QuizView extends Component {

  constructor(props) {

    super(props);

    this.state = {
      answer: this.props.answer || "", // 使用者選擇的答案
      quizData: { // 準備送出的表單資料
        id: this.props.id,
        title: this.props.title,
        description: this.props.description,
        order: this.props.order,
        type: this.props.type,
      },
      optionData: this.props.option || (this.props.type === "select" ? this._basicOptionData : {}),
      conditionData: this.props.condition || {}
    };

    this._onInputChange = this._onInputChange.bind(this);
    this._onInputSubmit = this._onInputSubmit.bind(this);
    this._onSelect = this._onSelect.bind(this); // 根據使用者的選擇設定這題的答案
  }

  _onInputChange(event) {
    const answer = event.target.value || "";
    this.setState((prevState, props) => {
      return {
        answer: answer
      };
    });
  }

  _onInputSubmit(event) {
    firebase.database().ref('answer/' + this.props.id).set(this.state.answer);
  }

  _onSelect(event) {

    let answer = event.target.getAttribute("data-value");

    this.setState((prevState, props) => {
      answer = prevState.answer === answer ? "unknown" : answer;
      firebase.database().ref('answer/' + this.props.id).set(answer);
      return {answer: answer};
    });
  }

  render() {

    let answerJSX;
    if (this.props.type === "select") {
      const option = this.state.optionData;
      if (option) {
        const optionJSX = Object.keys(option).map( (key) => {
          const item = option[key];
          const className = this.state.answer === item.value ? "active" : "";
          return (
            <Option 
              {...item} 
              key={key} 
              className={className} 
              onClick={this._onSelect} 
              />
          )
        });
        answerJSX = (
          <div className="ui vertical fluid basic buttons">
          {optionJSX}
          </div>
        );
      }
    }
    if (this.props.type === "input") {
      answerJSX = (
        <div className="ui action input">
          <input 
            type="text" 
            id={this.props.id}
            placeholder={this.props.answer} 
            value={this.state.answer} 
            onChange={this._onInputChange}
          />
          <a 
            className="ui button"
            onClick={this._onInputSubmit}
          >
            Submit
          </a>
        </div>
      );
    }

    return (
      <section className="QuizView">
        <div className="Question ui center aligned basic segment">
          <h3 className="ui header">
            {this.props.title}
          </h3>
          <p>
            {this.props.description}
          </p>
          { answerJSX }
        </div>
      </section>
    );
  }

}

export default QuizView;
