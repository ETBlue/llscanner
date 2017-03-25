import React, { Component } from 'react';
import firebase from 'firebase';
import {Link} from 'react-router-dom';

import QuizForm from './QuizForm';
import './QuizAdd.css';

class QuizAdd extends Component {

  constructor(props) {

    super(props);

    this.state = {
      valid: false,
      focus: {
        manual: false,
      },
      quizData: { // 準備送出的表單資料
        id: "quiz_id",
        title: "問題",
        description: "",
        order: "",
        type: "select"
      },
      optionData: {
        1: {
          id: 1,
          title: "選項",
          value: ""
        }
      },
      conditionData: {}
    };

    this._onInputChange = this._onInputChange.bind(this); // 刪除本題
    this._validate = this._validate.bind(this);
    this._save = this._save.bind(this); // 將編輯的資料送出到 server
  }

  _onInputChange(event) {

    const target = event.target;

    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState((prevState, props) => {

      prevState.quizData[name] = value;
      prevState.focus.manual = name === "id" ? true : false;
      prevState.valid = this._validate(prevState);

      return {
        quizData: prevState.quizData,
        valid: prevState.valid,
        focus: prevState.focus
      };
    });

  }

  _validate(prevState) {

    let valid = true;
    if (prevState.quizData.title.length === 0 || 
      prevState.quizData.id.length === 0 ||
      this.props.quiz[prevState.quizData.id] !== undefined ||
      prevState.quizData.id === "new" ||
      prevState.quizData.id === "edit" ||
      prevState.quizData.id === "quiz_id" )
    {
      valid = false;
    }
    if (prevState.quizData.type !== "select" &&
      prevState.quizData.type !== "input") {
      valid = false;
    }
    return valid;
  }

  _save() {

    if (this.state.valid) {
      let quiz = this.state.quizData;
      quiz.option = this.state.optionData;
      quiz.condition = this.state.conditionData;
      firebase.database().ref('quiz/' + this.state.quizData.id).set(quiz);
    }
  }

  render() {

    const valid = this.state.valid ? "" : " disabled";

    return (
        <div className="NewQuiz ui basic segment">
          <h2 className="ui header">新增測驗題</h2>
          <div className="new ui segment">
            <form ref="form" className="Form ui form">
              <QuizForm {...this.state.quizData} header="新問題" onChange={this._onInputChange} />
              <hr className="ui divider" />
              <div className="ui mini buttons">
                <Link to={"/quiz/" + this.state.quizData.id + "/edit" } onClick={this._save} className={"ui icon labeled olive button " + valid}>
                  <i className="icon checkmark" />
                  送出
                </Link>
                <Link to="/quiz" className="ui icon labeled button">
                  <i className="icon cancel" />
                  取消
                </Link>
              </div>
            </form>
          </div>
        </div>
    );
  }
}

export default QuizAdd;
