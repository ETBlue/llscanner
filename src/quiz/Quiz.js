import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Option from './Option';
import OptionForm from './OptionForm';
import Button from './Button';
import Input from './Input';
import firebase from 'firebase';
import './Quiz.css';

class Quiz extends Component {

  constructor() {

    super();
    this.state = {
      target: "", // 這則題目的目標設定項目代號
      answer: null, // 使用者選擇的答案
      mode: "view", // 一開始的顯示模式
      viewMode: "visible", // 是否顯示瀏覽模式
      editMode: "hidden", // 是否顯示編輯模式
      formData: {}, // 準備送出的表單資料
      newOption: {}, // 準備送出的表單資料中的新增部分
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
  }

  componentWillMount() {
    this.setState({
      formData: {
        id: this.props.id,
        title: this.props.title,
        description: this.props.description,
        option: this.props.option
      },
      target: this.props.option[Object.keys(this.props.option)[0]].target
    },
    () => {
      this._initialState = Object.assign({}, this.state);
      this._initialState.formData = Object.assign({}, this.state.formData);
      this._initialState.formData.option = Object.assign({}, this.state.formData.option);
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
          <div className="action">
            <div className={"ui mini buttons " + this.state.viewMode}>
              <Button onClick={this._toggle} icon="pencil" color=""  />
            </div>
            <div className={"ui mini buttons " + this.state.editMode}>
              <Button onClick={this._save} icon="checkmark" color="olive" />
              <Button onClick={this._toggle} icon="cancel" color=""  />
              <Button onClick={this._refresh} icon="refresh" color="yellow"  />
              {/*<Button onClick={this._delete} icon="trash" color="orange" />*/}
            </div>
          </div>
        </div>
        <div className={"edit ui basic bottom attached segment " + this.state.editMode}>
          <form ref="form" className="Form ui form">
            <div className="ui two column divided stackable grid">
              <div className="column">
                <h4 className="ui header">編輯問題</h4>
                <Input label="ID" reference={this._inputRefQuiz} target="_formDataQuiz" id="id" placeholder={this.props.id} name="id" default={this.props.id} />
                <Input label="標題" reference={this._inputRefQuiz} target="_formDataQuiz" id="title" placeholder={this.props.title} name="title" default={this.props.title} />
                <Input label="描述" reference={this._inputRefQuiz} target="_formDataQuiz" id="description" placeholder={this.props.description} name="description" default={this.props.description} />
              </div>
              <div className="column">
                {this._renderOptionForm()}
                {this._renderNewOptionForm()}
                <a onClick={this._addNewOption} className="ui green icon labeled button">
                  <i className="icon add" />
                  新增選項
                </a>
              </div>
            </div>
          </form>
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
            className = "teal";
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
          <OptionForm key={key} header="新增選項" onDelete={this._deleteOption} reference={this._inputRefOption} target="_formDataNewOption" id={key} item={item} />
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
      target: this.state.target,
      value: null
    };
    this.setState({newOption: newOptionData});
    this._formDataNewOption[id] = {};
  }

  _deleteOption(event) {

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
    if (this.state.mode === "view") {
      this.setState({mode: "edit", viewMode: "hidden", editMode: "visible"});
    } else if (this.state.mode === "edit") {
      this.setState({mode: "view", viewMode: "visible", editMode: "hidden"});
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
      option: optionData
    });

    this.setState({
      answer: null,
      mode: "view",
      viewMode: "visible", 
      editMode: "hidden",
      formData: {
        id: quizData.id,
        title: quizData.title,
        description: quizData.description,
        option: optionData
      },
      newOption: {},
      target: optionData[Object.keys(optionData)[0]].target
    },
    () => {
      this._initialState = Object.assign({}, this.state);
      this._initialState.formData = Object.assign({}, this.state.formData);
      this._initialState.formData.option = Object.assign({}, this.state.formData.option);
      this._formDataQuiz = {};
      this._formDataOption = {};
      this._formDataNewOption = {};
    });

  }

//  _delete(event) {
//    event.preventDefault();
//
//    // TODO: firebase delete
//    this._toggle();
//  }

  _refresh() {
    console.log(this._initialState);
    ReactDOM.findDOMNode(this.refs.form).reset();
    this.setState(this._initialState, () => {
      this._toggle();
      this._formDataQuiz = {};
      this._formDataOption = {};
      this._formDataNewOption = {};
    });
  }

}

export default Quiz;
