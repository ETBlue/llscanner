import React, { Component } from 'react';
import firebase from 'firebase';

import Option from './Option';
import Action from './Action';
import Button from './Button';
import QuizForm from './QuizForm';
import OptionForm from './OptionForm';

import toggleMode from '../_toggleMode';

import './Quiz.css';

class Quiz extends Component {

  constructor(props) {

    super(props);

    this._modes = ["view", "edit"];
    this._basicOptionData = {
      1: {
        id: 1,
        title: "選項",
        value: ""
      }
    };

    this.state = {
      answer: this.props.answer, // 使用者選擇的答案
      mode: this.props.mode, // 一開始的顯示模式
      valid: true,
      focus: {
        manual: false,
        id: ""
      },
      quizData: { // 準備送出的表單資料
        id: this.props.id,
        title: this.props.title,
        description: this.props.description,
        target: this.props.target
      },
      optionData: this.props.option || this._basicOptionData
    };

    this._setAnswer = this._setAnswer.bind(this); // 根據使用者的選擇設定這題的答案

    this._validation = this._validation.bind(this);
    this._onInputChange = this._onInputChange.bind(this); // 刪除本題
    this._onOptionDelete = this._onOptionDelete.bind(this); // 刪除選項
    this._onOptionAdd = this._onOptionAdd.bind(this); // 新增選項
    this._toggle = this._toggle.bind(this); // 切換編輯模式
    this._refresh = this._refresh.bind(this); // 取消編輯到一半的資料
    this._save = this._save.bind(this); // 將編輯的資料送出到 server

    this._initialQuizData = {
      id: this.props.id,
      title: this.props.title,
      description: this.props.description,
      target: this.props.target,
    };
    this._initialOptionData = this._compileOption(this.props.option) || this._basicOptionData;

  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    this._initialQuizData = {
        id: nextProps.id,
        title: nextProps.title,
        description: nextProps.description,
        target: nextProps.target
    };
    this._initialOptionData = this._compileOption(nextProps.option) || this._basicOptionData;
  }

  render() {

    const viewMode = this.state.mode === "view" ? "visible" : "hidden";
    const editMode = this.state.mode === "edit" ? "visible" : "hidden";
    
    let optionListJSX;
    let optionFormJSX;
    const option = this.state.optionData;

    if (option) {

      optionListJSX = Object.keys(option).map( (key) => {
        const item = option[key];
        const className = this.state.answer === item.value ? "active" : "";
        return (
          <Option key={key} className={className} {...item} onClick={this._setAnswer} />
        )
      });

      optionFormJSX = Object.keys(option).map( (key) => {
        const item = option[key];
        let focus = false;
        if (this.state.focus.manual && this.state.focus.id === key.toString(10)) {
          focus = true;
        }
        return (
          <OptionForm key={key} number={key} {...item} focus={focus} header="編輯選項" onDelete={this._onOptionDelete} onChange={this._onInputChange} />
        )
      })

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
          <hr className="ui hidden divider" />
          <Action valid={this.state.valid} view={viewMode} edit={editMode} onToggle={this._toggle} onSave={this._save} onRefresh={this._refresh} />
        </div>
        <div className="FormWrapper basic ui segment">
        <div className={"edit ui bottom attached segment " + (editMode)}>
          <form ref="form" className="Form ui form">
            <div className="ui two column divided stackable grid">
              <div className="column">
                <QuizForm lockID="true" {...this.state.quizData} header="編輯問題" onChange={this._onInputChange} />
              </div>
              <div className="column">
                { optionFormJSX }
                <Button onClick={this._onOptionAdd} icon="add" color="green" className="mini labeled" title="新增選項" />
              </div>
            </div>
          </form>
          <hr className="ui divider" />
          <Action valid={this.state.valid} view={viewMode} edit={editMode} onToggle={this._toggle} onSave={this._save} onRefresh={this._refresh} />
        </div>
        </div>
      </section>
    );
  }

  _compileOption(optionData) {
    if (optionData) {
    let data = Object.assign({}, optionData);
    Object.keys(optionData).forEach((key) => {
      data[key] = {};
      Object.keys(optionData[key]).forEach((field) => {
        data[key][field] = optionData[key][field];
      });
    });
    return data;
    }
  }

  _validation(prevState) {
    let valid = true;
    if (prevState.quizData.title.length === 0) {
      valid = false;
    } else {
      Object.keys(prevState.optionData).forEach((key) => {
        if (prevState.optionData[key].id.length === 0 || !prevState.optionData[key].title.length === 0) {
          valid = false;
        }
      });
    }
    return valid;
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
        prevState.valid = this._validation(prevState);

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
            prevState.focus.id = number;

          } else { // id 欄位合法變更時，改 key
            const optionOrphan = Object.assign({}, prevState.optionData[number]);
            delete prevState.optionData[number];
            prevState.optionData[value] = optionOrphan;
            prevState.optionData[value].id = value;
            prevState.valid = this._validation(prevState);
            prevState.focus.id = value;
          }

        } else {
          prevState.focus.manual = false;
          prevState.optionData[id][name] = value;
          prevState.valid = this._validation(prevState);
        }

        return {
          optionData: prevState.optionData,
          valid: prevState.valid
        };
      });
    }

  }

  _onOptionDelete(event) {

    const id = event.target.id;

    this.setState((prevState, props) => {
      delete prevState.optionData[id];
      return {optionData: prevState.optionData};
    });

  }

  _onOptionAdd() {

    this.setState((prevState, props) => {
      let optionData = prevState.optionData;
      const id = Math.max(...Object.keys(optionData)) + 1;
      optionData[id] = {id: id, title: "選項", value: ""};
      return {optionData: optionData};
    });

  }

  _setAnswer(event) {

    let answer = event.target.getAttribute("data-value");

    this.setState((prevState, props) => {
      answer = prevState.answer === answer ? "unknown" : answer;
      firebase.database().ref('answer/' + this.props.target).set(answer);
      return {answer: answer};
    });
  }

  _toggle() {

    this.setState((prevState, props) => {
      return {mode: toggleMode(prevState.mode, ...this._modes)};
    });
  }

  _save() {

    this.setState((prevState, props) => {

      if (this._validation(prevState)) {
        if (Object.keys(prevState.optionData).length === 0) {
          prevState.optionData = {
            1: {
              id: 1,
              title: "選項",
              value: ""
            }
          };
        } else {
          prevState.mode = "view";
        }
        firebase.database().ref('quiz/' + this.props.id).set({
          id: prevState.quizData.id,
          title: prevState.quizData.title,
          description: prevState.quizData.description,
          target: prevState.quizData.target,
          option: prevState.optionData
        });
        return prevState;
      }
      return null;
    });

  }

  _refresh() {

    this.setState((prevState, props) => {
      const data = this._compileOption(this._initialOptionData) || this._basicOptionData;
      return {
        quizData: Object.assign({} , this._initialQuizData),
        optionData: data
      };
    });
  }
}

export default Quiz;
