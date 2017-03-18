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

    this.state = {
      answer: this.props.answer, // 使用者選擇的答案
      mode: "view", // 一開始的顯示模式
      quizData: { // 準備送出的表單資料
        id: this.props.id,
        title: this.props.title,
        description: this.props.description,
        target: this.props.target
      },
      optionData: this.props.option
    };

    this._modes = ["view", "edit"];

    this._setAnswer = this._setAnswer.bind(this); // 根據使用者的選擇設定這題的答案

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
      target: this.props.target
    };
    this._initialOptionData = this._compileOption(this.props.option);

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
    this._initialOptionData = this._compileOption(nextProps.option);
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
        return (
          <OptionForm key={key} number={key} {...item} header="編輯選項" onDelete={this._onOptionDelete} onChange={this._onInputChange} />
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
          <Action view={viewMode} edit={editMode} onToggle={this._toggle} onSave={this._save} onRefresh={this._refresh} />
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
          <Action view={viewMode} edit={editMode} onToggle={this._toggle} onSave={this._save} onRefresh={this._refresh} />
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

  _onInputChange(event) {

    const target = event.target;

    const title = target.title;
    const id = target.id;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const number = target.getAttribute("data-number"); // 中繼狀態用的 id 替身

    if (title === "quiz") {

      this.setState((prevState, props) => {
        prevState.quizData[name] = value;
        return {quizData: prevState.quizData};
      });

    }

    if (title === "option") {

      this.setState((prevState, props) => {
        const data = this._compileOption(prevState.optionData);

        if (name === "id" ) {
  
          if (!value) { // id 欄位清空時，不動 key
            data[number].id = value;
            return {optionData: data};

          } else {

            if ( data[value] ) { // id 欄位與其他 option 重複時，不動 key
              data[number].id = id;
              return {optionData: data};

            } else { // id 欄位合法變更時，改 key
              const optionOrphan = Object.assign({}, data[number]);
              delete data[number];
              data[value] = optionOrphan;
              data[value].id = value;
              return {optionData: data};
            }
          }

        } else {
          data[id][name] = value;
          return {optionData: data};

        }
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
      optionData[id] = {id: id, title: "", value: ""};
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

    this._toggle();

    firebase.database().ref('quiz/' + this.props.id).set({
      id: this.state.quizData.id,
      title: this.state.quizData.title,
      description: this.state.quizData.description,
      target: this.state.quizData.target,
      option: this.state.optionData
    });
  }

  _refresh() {

    this.setState((prevState, props) => {
      const data = this._compileOption(this._initialOptionData);
      return {
        quizData: Object.assign({} , this._initialQuizData),
        optionData: data
      };
    });
  }
}

export default Quiz;
