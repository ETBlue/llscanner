import React, { Component } from 'react';
import firebase from 'firebase';
import {Link} from 'react-router-dom';

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
        prev: this.props.prev,
        next: this.props.next,
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
    firebase.database().ref('answer/' + this.props.id).set(answer);

    this.setState((prevState, props) => {
      return {answer: answer};
    });
  }

  render() {

    let answerJSX;
    if (this.props.type === "select") {
      const option = this.props.option;
      if (option) {
        const optionJSX = Object.keys(option).map( (key) => {
          const item = option[key];
          const className = this.props.answer === item.value ? "active" : "";
          return (
            <Option 
              {...item} 
              next={this.props.next} 
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
          <Link 
            to={"/quiz/" + this.props.next} 
            className="ui button"
            onClick={this._onInputSubmit}
          >
            Submit
          </Link>
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
