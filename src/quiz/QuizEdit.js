import React, { Component } from 'react';
import firebase from 'firebase';
import {Link} from 'react-router-dom';

import _copyNested from '../_copyNested'

import QuizForm from './QuizForm';
import OptionForm from './OptionForm';
//import ConditionForm from './ConditionForm';

import './QuizEdit.css';

class QuizEdit extends Component {

  constructor(props) {

    super(props);

    this._basicOptionData = {
      1: {
        id: 1,
        title: "選項",
        value: ""
      }
    };

    this.state = {
      answer: this.props.answer, // 使用者選擇的答案
      valid: true,
      focus: {
        manual: false,
        id: ""
      },
      quizData: { // 準備送出的表單資料
        id: this.props.id,
        title: this.props.title,
        description: this.props.description,
        order: this.props.order,
        type: this.props.type
      },
      optionData: this.props.option || this._basicOptionData,
    };

    this._initialQuizData = Object.assign({}, this.state.quizData);
    this._initialOptionData = _copyNested(this.state.optionData);

    this._validateAll = this._validateAll.bind(this);

    this._onOptionAdd = this._onOptionAdd.bind(this); // 新增選項
    this._onOptionDelete = this._onOptionDelete.bind(this); // 刪除選項
    this._onInputChange = this._onInputChange.bind(this); // 刪除本題
    this._save = this._save.bind(this); // 將編輯的資料送出到 server
    this._refresh = this._refresh.bind(this); // 取消編輯到一半的資料


  }

  componentWillReceiveProps(nextProps) {
    this._initialQuizData = {
        id: nextProps.id,
        title: nextProps.title,
        description: nextProps.description,
        order: nextProps.order,
        type: nextProps.type
    };
    this._initialOptionData = _copyNested(nextProps.option) || this._basicOptionData;
  }

  _validateAll(prevState) {
    let valid = true;
    if (prevState.quizData.title.length === 0) {
      valid = false;
    } else {
      if (prevState.optionData) {
        Object.keys(prevState.optionData).forEach((key) => {
          if (prevState.optionData[key].id.length === 0 || 
            prevState.optionData[key].title.length === 0) {
            valid = false;
          }
        });
      }
    }
    return valid;
  }

  _onOptionAdd() {

    this.setState((prevState, props) => {
      const id = Math.max(...Object.keys(prevState.optionData)) + 1;
      prevState.optionData[id] = {
        id: id,
        title: this._basicOptionData[1].title,
        value: this._basicOptionData[1].value
      };
      return {
        optionData: prevState.optionData
      };
    });

  }

  _onOptionDelete(event) {

    const id = event.target.getAttribute("data-number");

    this.setState((prevState, props) => {
      delete prevState.optionData[id];
      return {
        optionData: prevState.optionData,
        valid: this._validateAll(prevState)
      };
    });

  }

  _save() {

    if (this._validateAll(this.state)) {

      const optionData = Object.keys(this.state.optionData).length === 0 ? 
        this._basicOptionData : this.state.optionData;

      let quiz = this.state.quizData;
      quiz.option = optionData;

      firebase.database().ref('quiz/' + this.state.quizData.id).set(quiz);
    }
  }

  _refresh() {

    this.setState((prevState, props) => {
      const optionData = _copyNested(this._initialOptionData);
      return {
        quizData: Object.assign({} , this._initialQuizData),
        optionData: optionData,
      };
    });
  }

  _onInputChange(event) {

    const target = event.target;

    const title = target.title;
    const id = target.id;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const number = target.getAttribute("data-number"); // 中繼狀態用的 id 替身

    if (title === "quiz") {

      this.setState((prevState, props) => {

        prevState.focus.manual = false;
        prevState.quizData[name] = value;
        prevState.valid = this._validateAll(prevState);

        return {
          quizData: prevState.quizData,
          valid: prevState.valid
        };
      });

    }

    if (title === "option") {

      this.setState((prevState, props) => {

        if (name === "id" ) {
          prevState.focus.manual = true;

          if ( prevState.optionData[value] ) { // id 欄位與其他 option 重複時，不動 key
            prevState.valid = false;
            prevState.optionData[number].id = value;
            prevState.focus.id = number;

          } else { // id 欄位合法變更時，改 key

            prevState.optionData[value] = Object.assign({}, prevState.optionData[number]);
            delete prevState.optionData[number];

            prevState.optionData[value].id = value;
            prevState.valid = this._validateAll(prevState);
            prevState.focus.id = value;
          }

        } else {
          prevState.focus.manual = false;
          prevState.optionData[id][name] = value;
          prevState.valid = this._validateAll(prevState);
        }

        return {
          optionData: prevState.optionData,
          valid: prevState.valid
        };
      });
    }

  }

  render() {

    const valid = this.state.valid ? "" : " disabled";
    const action = (
      <div className={"Action ui mini buttons"}>
        <Link to={"/quiz/" + this.state.quizData.id} onClick={this._save} className={"ui icon labeled olive mini button" + valid}>
          <i className="icon checkmark" />
          送出
        </Link>
        <Link to={"/quiz/" + this.state.quizData.id} className="ui icon labeled mini button">
          <i className="icon cancel" />
          取消
        </Link>
        <a onClick={this._refresh} className="ui icon labeled yellow mini button">
          <i className="icon refresh" />
          還原
        </a>
      </div>
    );

    let optionFormJSX;

    const option = this.state.optionData;
    if (option && Object.keys(option).length > 0) {
      optionFormJSX = Object.keys(option).map( (key) => {
        const item = option[key];
        let focus = false;
        if (this.state.focus.manual && this.state.focus.id === key) {
          focus = true;
        }
        return (
          <OptionForm key={key} number={key} {...item} focus={focus} onDelete={this._onOptionDelete} onChange={this._onInputChange} />
        )
      })
    }

    return (
        <div className="FormWrapper basic ui segment">
          <div className="QuizEdit ui segment">
           {action}
            <hr className="ui divider" />
            <form ref="form" className="Form ui form">
              <div className="ui two column divided stackable grid">
                <div className="column">
                  <QuizForm 
                    locked="true" 
                    header="編輯問題" 
                    {...this.state.quizData} 
                    onChange={this._onInputChange} 
                  />
                </div>
                <div className="column">
                  { optionFormJSX }
                  <a onClick={this._onOptionAdd} className="ui green icon labeled mini button">
                    <i className="icon add" />
                    新增選項
                  </a>
                </div>
              </div>
            </form>
            <hr className="ui divider" />
            {action}
          </div>
        </div>
      );
  }
}

export default QuizEdit;
