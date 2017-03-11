import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
        answer: this.props.answer
      },
      target: this.props.answer[Object.keys(this.props.answer)[0]].target
    },
    () => {
      this._initialState = Object.assign({}, this.state);
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
          {this._renderOption()}
          <hr className="ui hidden divider" />
          <div className="action">
            <div className={"ui mini buttons " + this.state.viewMode}>
              <Button onClick={this._toggle} icon="pencil" color=""  />
            </div>
            <div className={"ui mini buttons " + this.state.editMode}>
              <Button onClick={this._save} icon="checkmark" color="olive" />
              <Button onClick={this._toggle} icon="cancel" color=""  />
              <Button onClick={this._refresh} icon="refresh" color="yellow"  />
              <Button onClick={this._delete} icon="trash" color="orange" />
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
    const answer = this.state.formData.answer;
    if (answer) {
      return (
        Object.keys(answer).map( (answerItem) => {
          const item = answer[answerItem];
          let className = "";
          if (this.state.answer === item.id) {
            className = "teal";
          } else {
            className = "basic";
          }
          return (
            <Answer className={className} onClick={this._setAnswer} key={item.id} {...item} />
          )
        })
      );
    }
  }

  _renderOptionForm() {
    const answer = this.state.formData.answer;
    if (answer) {
      return (
        Object.keys(answer).map( (answerItem) => {
          const item = answer[answerItem];
          this._formDataOption[answerItem] = {};
          return (
            <div key={answerItem}>
              <a className="ui right floated orange icon button" onClick={this._deleteOption} data-optionid={answerItem} >
               <i className="icon trash" />
              </a>
              <h4 className="ui header">編輯選項</h4>
              <Input label="排序" reference={this._inputRefOption} target="_formDataOption" id={answerItem} placeholder={item.id} name="id" default={item.id} />
              <Input label="顯示文字" reference={this._inputRefOption} target="_formDataOption" id={answerItem} placeholder={item.title} name="title" default={item.title} />
              <Input label="目標代號" reference={this._inputRefOption} target="_formDataOption" id={answerItem} placeholder={item.target} name="target" default={item.target} />
              <Input label="設定值" reference={this._inputRefOption} target="_formDataOption" id={answerItem} placeholder={item.value} name="value" default={item.value} />
              <hr className="ui divider" />
            </div>
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
          <div key={"newOption" + key}>
            <h4 className="ui header">新增選項</h4>
            <Input label="排序" reference={this._inputRefOption} target="_formDataNewOption" id={key} placeholder="請輸入數字，注意不可以跟其他選項重複喔" name="id" default={item.id} />
            <Input label="顯示文字" reference={this._inputRefOption} target="_formDataNewOption" id={key} placeholder="請輸入字串" name="title" default={item.title} />
            <Input label="目標代號" reference={this._inputRefOption} target="_formDataNewOption" id={key} placeholder="請輸入此選項針對的目標的 unique id" name="target" default={item.target} />
            <Input label="設定值" reference={this._inputRefOption} target="_formDataNewOption" id={key} placeholder="請輸入此選項代表的值" name="value" default={item.value} />
            <hr className="ui divider" />
          </div>
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
    const id = Object.keys(this.state.formData.answer).length + Object.keys(this.state.newOption).length + 1;
    this._formDataNewOption[id] = {};
    let newOptionData = Object.assign({}, this.state.newOption);
    newOptionData[id] = {
      id: id,
      title: null,
      target: this.state.target,
      value: null
    };
    this.setState({newOption: newOptionData});
  }

  _deleteOption(event) {

    const id = event.currentTarget.getAttribute("data-optionid");

    let formData = this.state.formData;
    delete formData.answer[id];
    delete this._formDataOption[id];
    console.log(formData.answer);
    console.log(this._formDataOption);
    this.setState({formData: formData});

    let newOptionData = Object.assign({}, this.state.newOption);
    delete newOptionData[id];
    delete this._formDataNewOption[id];
    this.setState({newOption: newOptionData});
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
      optionData[key] = {};
      Object.keys(this._formDataOption[key]).forEach((index) => {
        optionData[key][index] = this._formDataOption[key][index].value;
      });
    });

    Object.keys(this._formDataNewOption).forEach((key) => {
      optionData[key] = {};
      Object.keys(this._formDataNewOption[key]).forEach((index) =>{
        optionData[key][index] = this._formDataNewOption[key][index].value;
      });
    });

    firebase.database().ref('quiz/' + this.props.id).set({
      id: quizData.id,
      title: quizData.title,
      description: quizData.description,
      answer: optionData
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
        answer: optionData
      },
      newOption: {},
      target: optionData[Object.keys(optionData)[0]].target
    },
    () => {
      this._initialState = Object.assign({}, this.state);
      this._formDataQuiz = {};
      this._formDataOption = {};
      this._formDataNewOption = {};
    });

  }

  _delete(event) {
    // TODO: firebase delete
    this._toggle();
  }

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
