import React, { Component } from 'react';
import Answer from './Answer';
import Button from './Button';
import Input from './Input';
import './Quiz.css';
import firebase from 'firebase';

class Quiz extends Component {

  constructor() {
    super();
    this.state = {
      answer: null,
      mode: "view",
      viewmode: "visible", 
      editmode: "hidden",
      formdata: {},
      newAnswer: {},
      target: ""
    };
    this._setAnswer = this._setAnswer.bind(this);
    this._renderOption = this._renderOption.bind(this);
    this._renderOptionForm = this._renderOptionForm.bind(this);
    this._renderNewOptionForm = this._renderNewOptionForm.bind(this);
    this._addNewOption = this._addNewOption.bind(this);
    this._inputRef = this._inputRef.bind(this);

    this._toggle = this._toggle.bind(this);
    this._save = this._save.bind(this);
    this._refresh = this._refresh.bind(this);
    this._delete = this._delete.bind(this);

    this._initialState = {};
    this._formdata = {};
    this._formdataOption = {};
    this._formdataNewOption = {};
  }

  componentWillMount() {
    this.setState({
      formdata: {
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

  _renderOption() {
    const answer = this.state.formdata.answer;
    if (answer) {
      return (
        Object.keys(answer).map( (answerItem) => {
          const item = answer[answerItem];
          return (
            <Answer current={this.state.answer} onClick={this._setAnswer} key={item.id} {...item} />
          )
        })
      );
    }
  }

  _inputRef(target, id, key, value) {
    this[target][id][key] = value;
  }

  _renderOptionForm() {
    const answer = this.state.formdata.answer;
    if (answer) {
      return (
        Object.keys(answer).map( (answerItem) => {
          const item = answer[answerItem];
          this._formdataOption[answerItem] = {};
          return (
            <div key={answerItem}>
              <h4 className="ui header">編輯選項</h4>
              <Input label="排序" reference={this._inputRef} target="_formdataOption" id={answerItem} placeholder={item.id} name="id" default={item.id} />
              <Input label="顯示文字" reference={this._inputRef} target="_formdataOption" id={answerItem} placeholder={item.title} name="title" default={item.title} />
              <Input label="目標代號" reference={this._inputRef} target="_formdataOption" id={answerItem} placeholder={item.target} name="target" default={item.target} />
              <Input label="設定值" reference={this._inputRef} target="_formdataOption" id={answerItem} placeholder={item.value} name="value" default={item.value} />
              <hr className="ui divider" />
            </div>
          )
        })
      );
    }
  }

  _addNewOption() {
    const id = Object.keys(this.state.formdata.answer).length + Object.keys(this.state.newAnswer).length + 1;
    this._formdataNewOption[id] = {};
    let newAnswerData = Object.assign({}, this.state.newAnswer);
    newAnswerData[id] = {
      id: id,
      title: null,
      target: this.state.target,
      value: null
    };
    this.setState({newAnswer: newAnswerData});
  }

  _renderNewOptionForm() {
    return (
      Object.keys(this.state.newAnswer).map((key) => {
        const item = this.state.newAnswer[key];
        return (
          <div key={"newAnswer" + key}>
            <h4 className="ui header">新增選項</h4>
            <Input label="排序" reference={this._inputRef} target="_formdataNewOption" id={key} placeholder="請輸入數字，注意不可以跟其他選項重複喔" name="id" default={item.id} />
            <Input label="顯示文字" reference={this._inputRef} target="_formdataNewOption" id={key} placeholder="請輸入字串" name="title" default={item.title} />
            <Input label="目標代號" reference={this._inputRef} target="_formdataNewOption" id={key} placeholder="請輸入此選項針對的目標的 unique id" name="target" default={item.target} />
            <Input label="設定值" reference={this._inputRef} target="_formdataNewOption" id={key} placeholder="請輸入此選項代表的值" name="value" default={item.value} />
            <hr className="ui divider" />
          </div>
        )
      })
    )
  }

  _setAnswer(id) {
    if (this.state.answer === id) {
      this.setState({answer: null});
    } else {
      this.setState({answer: id});
    }
  }

  _toggle() {
    if (this.state.mode === "view") {
      this.setState({mode: "edit", viewmode: "hidden", editmode: "visible"});
    } else if (this.state.mode === "edit") {
      this.setState({mode: "view", viewmode: "visible", editmode: "hidden"});
    }
  }

  _save() {

    let answerData ={};
    Object.keys(this._formdataOption).forEach((key) => {
      answerData[key] = {};
      Object.keys(this._formdataOption[key]).forEach((index) =>{
        answerData[key][index] = this._formdataOption[key][index].value;
      });
    });

    Object.keys(this._formdataNewOption).forEach((key) => {
      answerData[key] = {};
      Object.keys(this._formdataNewOption[key]).forEach((index) =>{
        answerData[key][index] = this._formdataNewOption[key][index].value;
      });
    });

    firebase.database().ref('quiz/' + this.props.id).set({
      id: this._formdata.id.value,
      title: this._formdata.title.value,
      description: this._formdata.description.value,
      answer: answerData
    });

    this.setState({
      answer: null,
      mode: "view",
      viewmode: "visible", 
      editmode: "hidden",
      formdata: {
        id: this._formdata.id.value,
        title: this._formdata.title.value,
        description: this._formdata.description.value,
        answer: answerData
      },
      newAnswer: {},
      target: answerData[Object.keys(answerData)[0]].target
    },
    () => {
      this._initialState = Object.assign({}, this.state);
      this._formdata = {};
      this._formdataOption = {};
      this._formdataNewOption = {};
    });

  }

  _delete(data) {
    // TODO: firebase delete
    this._toggle();
  }

  _refresh() {
    this.setState(this._initialState, () => {
      this._toggle();
      this._formdata = {};
      this._formdataOption = {};
      this._formdataNewOption = Object.assign({}, this.state.newAnswer);
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
            <div className={"ui mini buttons " + this.state.viewmode}>
              <Button onClick={this._toggle} icon="pencil" color=""  />
            </div>
            <div className={"ui mini buttons " + this.state.editmode}>
              <Button onClick={this._save} icon="checkmark" color="olive" />
              <Button onClick={this._toggle} icon="cancel" color=""  />
              <Button onClick={this._refresh} icon="refresh" color="yellow"  />
              <Button onClick={this._delete} icon="trash" color="orange" />
            </div>
          </div>
        </div>
        <div className={"edit ui basic bottom attached segment " + this.state.editmode}>
          <form className="Form ui form">
            <div className="ui two column divided stackable grid">
              <div className="column">
                <h4 className="ui header">編輯問題</h4>
                <div className="field">
                  <label>ID</label>
                  <input ref={(input) => this._formdata.id = input} placeholder={this.props.id} name="id" type="text" defaultValue={this.props.id} />
                </div>
                <div className="field">
                  <label>標題</label>
                  <input ref={(input) => this._formdata.title = input} placeholder={this.props.title} name="title" type="text" defaultValue={this.props.title} />
                </div>
                <div className="field">
                  <label>描述</label>
                  <input ref={(input) => this._formdata.description = input} placeholder={this.props.description} name="description" type="text" defaultValue={this.props.description} />
                </div>
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

}

export default Quiz;
