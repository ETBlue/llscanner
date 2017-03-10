import React, { Component } from 'react';
import Answer from './Answer';
import Button from './Button';
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
    this._initialState = {};
    this._getAnswer = this._getAnswer.bind(this);
    this._getAnswerForm = this._getAnswerForm.bind(this);
    this._setAnswer = this._setAnswer.bind(this);
    this._toggle = this._toggle.bind(this);
    this._save = this._save.bind(this);
    this._refresh = this._refresh.bind(this);
    this._delete = this._delete.bind(this);
    this._addAnswer = this._addAnswer.bind(this);
    this._getNewAnswer = this._getNewAnswer.bind(this);
    this._formdata = {};
    this._formdataAnswer = {};
    this._formdataNewAnswer = {};
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

  _getAnswer() {
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

  _getAnswerForm() {
    const answer = this.state.formdata.answer;
    if (answer) {
      return (
        Object.keys(answer).map( (answerItem) => {
          const item = answer[answerItem];
          this._formdataAnswer[answerItem] = {};
          return (
          <div key={answerItem}>
            <h4 className="ui header">編輯選項</h4>
            <div className="field">
              <label>排序</label>
              <input ref={(input) => this._formdataAnswer[answerItem].id = input} placeholder={item.id} name="id" type="text" defaultValue={item.id} />
            </div>
            <div className="field">
              <label>顯示文字</label>
              <input ref={(input) => this._formdataAnswer[answerItem].title = input} placeholder={item.title} name="title" type="text" defaultValue={item.title} />
            </div>
            <div className="field">
              <label>設定目標</label>
              <input ref={(input) => this._formdataAnswer[answerItem].target = input} placeholder={item.target} name="target" type="text" defaultValue={item.target} />
            </div>
            <div className="field">
              <label>設定值</label>
              <input ref={(input) => this._formdataAnswer[answerItem].value = input} placeholder={item.value} name="value" type="text" defaultValue={item.value} />
            </div>
            <hr className="ui divider" />
          </div>
          )
        })
      );
    }
  }

  _addAnswer() {
    const id = Object.keys(this.state.formdata.answer).length + Object.keys(this.state.newAnswer).length + 1;
    this._formdataNewAnswer[id] = {};
    let newAnswerData = Object.assign({}, this.state.newAnswer);
    newAnswerData[id] = {
      id: id,
      title: null,
      target: this.state.target,
      value: null
    };
    this.setState({newAnswer: newAnswerData});
  }

  _getNewAnswer() {
    return (
      Object.keys(this.state.newAnswer).map((key) => {
        const item = this.state.newAnswer[key];
        return (
          <div key={"newAnswer" + key}>
            <h4 className="ui header">新增選項</h4>
            <div className="field">
              <label>排序</label>
              <input ref={(input) => this._formdataNewAnswer[key].id = input} placeholder="請輸入數字，注意不可以跟其他選項重複喔" name="id" type="text" defaultValue={item.id} />
            </div>
            <div className="field">
              <label>顯示文字</label>
              <input ref={(input) => this._formdataNewAnswer[key].title = input} placeholder="請輸入字串" name="title" type="text" defaultValue={item.title} />
            </div>
            <div className="field">
              <label>設定目標</label>
              <input ref={(input) => this._formdataNewAnswer[key].target = input} placeholder="請輸入此選項針對的目標的 unique id" name="target" type="text" defaultValue={item.target} />
            </div>
            <div className="field">
              <label>設定值</label>
              <input ref={(input) => this._formdataNewAnswer[key].value = input} placeholder="請輸入此選項代表的值" name="value" type="text" defaultValue={item.value} />
            </div>
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
    Object.keys(this._formdataAnswer).forEach((key) => {
      answerData[key] = {};
      Object.keys(this._formdataAnswer[key]).forEach((index) =>{
        answerData[key][index] = this._formdataAnswer[key][index].value;
      });
    });

    console.log(this._formdataNewAnswer);

    Object.keys(this._formdataNewAnswer).forEach((key) => {
      answerData[key] = {};
      Object.keys(this._formdataNewAnswer[key]).forEach((index) =>{
        answerData[key][index] = this._formdataNewAnswer[key][index].value;
      });
    });

    console.log(answerData);

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
      this._toggle();
      this._initialState = Object.assign({}, this.state);
      this._formdata = {};
      this._formdataAnswer = {};
      this._formdataNewAnswer = {};
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
      this._formdataAnswer = {};
      this._formdataNewAnswer = Object.assign({}, this.state.newAnswer);
    });
  }

  render() {
    return (
      <section className="Quiz">
      <div className="ui segments">
        <div className="Question ui center aligned segment">
          <h3 className="ui header">
            {this.props.title}
          </h3>
          <p>
            {this.props.description}
          </p>
          {this._getAnswer()}
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
        <div className={"edit ui segment " + this.state.editmode}>
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
                {this._getAnswerForm()}
                {this._getNewAnswer()}
                <a onClick={this._addAnswer} className="ui green icon labeled button">
                  <i className="icon add" />
                  新增選項
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
      </section>
    );
  }

}

export default Quiz;
