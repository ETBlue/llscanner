import React, { Component } from 'react';
import firebase from 'firebase';
import ReactDOM from 'react-dom';
import Option from './Option';
import Action from './Action';
import Button from './Button';
import QuizForm from './QuizForm';
import OptionForm from './OptionForm';
import toggleMode from '../_toggleMode';
import './Quiz.css';

class Quiz extends Component {

  constructor() {

    super();
    this.state = {
      answer: null, // 使用者選擇的答案
      mode: "viewQuizMode", // 一開始的顯示模式
      visibility: {
        viewQuiz: "visible", // 瀏覽模式元件的顯示狀態
        editQuiz: "hidden" // 編輯模式元件的顯示狀態
      },
      formData: {}, // 準備送出的表單資料
      newOption: {}, // 準備送出的表單資料中的新增部分
    };
    this._modeSettings = {
      viewQuizMode: ["viewQuiz"],
      editQuizMode: ["editQuiz"]
    };

    this._setAnswer = this._setAnswer.bind(this); // 根據使用者的選擇設定這題的答案
    this._renderOption = this._renderOption.bind(this); // 選項介面

    this._renderOptionForm = this._renderOptionForm.bind(this); // 選項的編輯表單介面
    this._renderNewOptionForm = this._renderNewOptionForm.bind(this); // 新增選項的編輯表單介面
    this._addNewOption = this._addNewOption.bind(this); // 新增選項
    this._deleteOption = this._deleteOption.bind(this); // 刪除選項
    this._inputRefQuiz = this._inputRefQuiz.bind(this); // 將編輯人員填入的表單資料放到暫存區
    this._inputRefOption = this._inputRefOption.bind(this); // 將編輯人員填入的表單資料放到暫存區
    this._toggle = this._toggle.bind(this); // 切換編輯模式
    this._refresh = this._refresh.bind(this); // 取消編輯到一半的資料
    this._save = this._save.bind(this); // 將編輯的資料送出到 server
    this._delete = this._delete.bind(this); // 刪除本題

    this._initialState = {}; // 本題的初始狀態
    this._formDataQuiz = {}; // 從表單讀入的資料暫存區，第一層
    this._formDataOption = {}; // 從表單讀入的資料暫存區，第二層，原本的選項
    this._formDataNewOption = {}; // 從表單讀入的資料暫存區，第二層，新增的選項
    this._currentMode = "";
    this._currentVisibility = {};
  }

  componentWillMount() {
    this.setState({
      formData: {
        id: this.props.id,
        title: this.props.title,
        description: this.props.description,
        target: this.props.target,
        option: this.props.option
      }
    },
    () => {
      this._initialState = Object.assign({}, this.state);
      this._initialState.formData = Object.assign({}, this.state.formData);
      this._initialState.formData.option = Object.assign({}, this.state.formData.option);
      this._currentMode = this.state.mode;
      this._currentVisibility = Object.assign({}, this.state.visibility);
    });
  }

  render() {
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
          {this._renderOption()}
          </div>
          <hr className="ui hidden divider" />
          <Action viewQuiz={this.state.visibility.viewQuiz} editQuiz={this.state.visibility.editQuiz} onToggle={this._toggle} onSave={this._save} onRefresh={this._refresh} />
        </div>
        <div className="FormWrapper basic ui segment">
        <div className={"edit ui bottom attached segment " + this.state.visibility.editQuiz}>
          <form ref="form" className="Form ui form">
            <div className="ui two column divided stackable grid">
              <div className="column">
                <QuizForm header="編輯問題" reference={this._inputRefQuiz} target="_formDataQuiz" data={this.props} />
              </div>
              <div className="column">
                {this._renderOptionForm()}
                {this._renderNewOptionForm()}
                <Button onClick={this._addNewOption} icon="add" color="green" className="mini labeled" title="新增選項" />
              </div>
            </div>
          </form>
          <hr className="ui divider" />
          <Action viewQuiz={this.state.visibility.viewQuiz} editQuiz={this.state.visibility.editQuiz} onToggle={this._toggle} onSave={this._save} onRefresh={this._refresh} />
        </div>
        </div>
      </section>
    );
  }

  _renderOption() {
    const option = this.state.formData.option;
    if (option) {
      return (
        Object.keys(option).map( (optionItem) => {
          const item = option[optionItem];
          let className = "";
          if (this.state.answer === item.id) {
            className = "active";
          } else {
            className = "";
          }
          return (
            <Option className={className} onClick={this._setAnswer} key={item.id} {...item} />
          )
        })
      );
    }
  }

  _renderOptionForm() {
    const option = this.state.formData.option;
    if (option) {
      return (
        Object.keys(option).map( (key) => {
          const item = option[key];
          this._formDataOption[key] = {};
          return (
            <OptionForm key={key} header="編輯選項" onDelete={this._deleteOption} reference={this._inputRefOption} target="_formDataOption" id={key} item={item} />
          )
        })
      );
    }
  }

  _renderNewOptionForm() {
    return (
      Object.keys(this.state.newOption).map((key) => {
        const item = this.state.newOption[key];
        return (
          <OptionForm key={key} header="新選項" onDelete={this._deleteOption} reference={this._inputRefOption} target="_formDataNewOption" id={key} item={item} />
        )
      })
    )
  }

  _inputRefQuiz(target, id, key, value) {
    this[target][key] = value;
  }

  _inputRefOption(target, id, key, value) {
    if (this[target][id]) {
      this[target][id][key] = value;
    }
  }

  _addNewOption() {
    const oldOptionIDs = Object.keys(this.state.formData.option);
    const newOptionIDs = Object.keys(this.state.newOption);
    const id = Math.max(Math.max(...oldOptionIDs), Math.max(...newOptionIDs)) + 1;
    let newOptionData = Object.assign({}, this.state.newOption);
    newOptionData[id] = {
      id: id,
      title: null,
      value: null
    };
    this.setState({newOption: newOptionData});
    this._formDataNewOption[id] = {};
  }

  _deleteOption(event) {
    event.preventDefault();

    const id = event.currentTarget.getAttribute("data-optionid");

    let formData = this.state.formData;
    delete formData.option[id];
    this.setState({formData: formData});
    delete this._formDataOption[id];

    let newOptionData = Object.assign({}, this.state.newOption);
    delete newOptionData[id];
    this.setState({newOption: newOptionData});
    delete this._formDataNewOption[id];
  }

  _setAnswer(event) {
    event.preventDefault();

    const id = event.currentTarget.getAttribute("data-answer");

    if (this.state.answer === id) {
      this.setState({answer: null});
    } else {
      this.setState({answer: id});
    }
  }

  _toggle() {

    this._currentMode = toggleMode(this._currentMode, "viewQuizMode", "editQuizMode");
    this._renderMode();
  }

  _renderMode() {
    if (this._currentMode !== this.state.mode ) {
      Object.keys(this._currentVisibility).forEach((key) => {
        this._currentVisibility[key] = "hidden";
      });
      this._modeSettings[this._currentMode].forEach((item) => {
        this._currentVisibility[item] = "visible";
      });
      this.setState({
        mode: this._currentMode,
        visibility: this._currentVisibility
      });
    }

  }

  _save() {

    let quizData = {};
    let optionData = {};

    Object.keys(this._formDataQuiz).forEach((key) => {
      quizData[key] = this._formDataQuiz[key].value;
    });

    Object.keys(this._formDataOption).forEach((key) => {
      const option = this._formDataOption[key];
      optionData[option.id.value] = {};
      Object.keys(option).forEach((index) => {
        optionData[option.id.value][index] = option[index].value;
      });
    });

    Object.keys(this._formDataNewOption).forEach((key) => {
      const option = this._formDataNewOption[key];
      optionData[option.id.value] = {};
      Object.keys(option).forEach((index) =>{
        optionData[option.id.value][index] = option[index].value;
      });
    });

    firebase.database().ref('quiz/' + this.props.id).set({
      id: quizData.id,
      title: quizData.title,
      description: quizData.description,
      target: quizData.target,
      option: optionData
    });

    this.setState({
      answer: null,
      mode: "viewQuizMode", // 一開始的顯示模式
      visibility: {
        viewQuiz: "visible", // 瀏覽模式元件的顯示狀態
        editQuiz: "hidden" // 編輯模式元件的顯示狀態
      },
      formData: {
        id: quizData.id,
        title: quizData.title,
        description: quizData.description,
        target: quizData.target,
        option: optionData
      },
      newOption: {},
    },
    () => {
      this._initialState = Object.assign({}, this.state);
      this._initialState.formData = Object.assign({}, this.state.formData);
      this._initialState.formData.option = Object.assign({}, this.state.formData.option);
      this._formDataQuiz = {};
      this._formDataOption = {};
      this._formDataNewOption = {};
      this._currentMode = this.state.mode;
      this._currentVisibility = Object.assign({}, this.state.visibility);
    });
  }

  _delete(event) {
//    event.preventDefault();
//
//    // TODO: firebase delete
//    this._toggle();
  }

  _refresh() {

    ReactDOM.findDOMNode(this.refs.form).reset();
    this.setState(this._initialState, () => {
      this._toggle();
      this._formDataQuiz = {};
      this._formDataOption = {};
      this._formDataNewOption = {};
      this._currentMode = this.state.mode;
      this._currentVisibility = Object.assign({}, this.state.visibility);
    });
  }
}

export default Quiz;
