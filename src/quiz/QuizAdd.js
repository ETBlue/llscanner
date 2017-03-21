import React, { Component } from 'react';
import firebase from 'firebase';
import {Link} from 'react-router-dom';

import QuizForm from './QuizForm';

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
        target: ""
      },
      optionData: {
        1: {
          id: 1,
          title: "選項",
          value: ""
        }
      }
    };

    this._validation = this._validation.bind(this);
    this._onInputChange = this._onInputChange.bind(this); // 刪除本題
    this._save = this._save.bind(this); // 將編輯的資料送出到 server
  }

  render() {

    const valid = this.state.valid ? "" : " disabled";

    return (
        <div className="NewQuiz ui basic segment">
          <div className="new ui segment">
            <form ref="form" className="Form ui form">
              <QuizForm {...this.state.quizData} header="新問題" onChange={this._onInputChange} />
              <hr className="ui divider" />
              <Link to={"/quiz/" + this.state.quizData.id + "/edit" } onClick={this._save} className={"ui icon labeled olive button " + valid}>
                <i className="icon checkmark" />
                送出
              </Link>
            </form>
          </div>
        </div>
    );
  }


  _validation(prevState) {
    console.log(this.props.quiz);
    let valid = true;
    if (prevState.quizData.title.length === 0 || 
      prevState.quizData.id.length === 0 ||
      this.props.quiz[prevState.quizData.id] !== undefined ||
      prevState.quizData.id === "new" ||
      prevState.quizData.id === "quiz_id" )
    {
      valid = false;
    }
    return valid;
  }

  _onInputChange(event) {

    const target = event.target;

    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState((prevState, props) => {

      prevState.quizData[name] = value;
      prevState.focus.manual = name === "id" ? true : false;
      prevState.valid = this._validation(prevState);

      return {
        quizData: prevState.quizData,
        valid: prevState.valid,
        focus: prevState.focus
      };
    });

  }

  _save() {

    if (this.state.valid) {
      firebase.database().ref('quiz/' + this.state.quizData.id).set({
        id: this.state.quizData.id,
        title: this.state.quizData.title,
        description: this.state.quizData.description,
        target: this.state.quizData.target,
        option: this.state.optionData
      });
    }
  }

}

export default QuizAdd;
