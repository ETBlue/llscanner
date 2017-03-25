import React, { Component } from 'react';
import firebase from 'firebase';
import {Link} from 'react-router-dom';

import QuizForm from './QuizForm';
import OptionForm from './OptionForm';
import ConditionForm from './ConditionForm';

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

    this._basicConditionData = {
      quiz_id: {
        id: "quiz_id",
        logic: "equals_to",
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
      conditionData: this.props.condition || {}
    };

    this._initialQuizData = Object.assign({}, this.state.quizData);
    this._initialOptionData = this._compileNest(this.state.optionData);
    this._initialConditionData = this._compileNest(this.state.conditionData);

    this._validateAll = this._validateAll.bind(this);
    this._compileNest = this._compileNest.bind(this);

    this._onOptionAdd = this._onOptionAdd.bind(this); // 新增選項
    this._onOptionDelete = this._onOptionDelete.bind(this); // 刪除選項
    this._onConditionAdd = this._onConditionAdd.bind(this); // 新增條件
    this._onConditionDelete = this._onConditionDelete.bind(this); // 刪除條件
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
    this._initialOptionData = this._compileNest(nextProps.option) || this._basicOptionData;
    this._initialConditionData = this._compileNest(nextProps.condition) || {};
  }

  _compileNest(nestedObject) {
    if (nestedObject) {
    let data = Object.assign({}, nestedObject);
    Object.keys(nestedObject).forEach((key) => {
      data[key] = {};
      Object.keys(nestedObject[key]).forEach((field) => {
        data[key][field] = nestedObject[key][field];
      });
    });
    return data;
    }
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
      if (prevState.conditionData) {
        Object.keys(prevState.conditionData).forEach((key) => {
          if (prevState.conditionData[key].id.length === 0 ||
            prevState.conditionData[key].id === "quiz_id") {
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

  _onConditionAdd() {

    this.setState((prevState, props) => {
      prevState.conditionData = prevState.conditionData || {};
      prevState.conditionData.quiz_id = Object.assign({}, this._basicConditionData.quiz_id);
      return {
        conditionData: prevState.conditionData,
        valid: false
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

  _onConditionDelete(event) {

    const id = event.target.getAttribute("data-number");

    this.setState((prevState, props) => {
      delete prevState.conditionData[id];
      return {
        conditionData: prevState.conditionData,
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
      quiz.condition = this.state.conditionData;

      firebase.database().ref('quiz/' + this.state.quizData.id).set(quiz);
    }
  }

  _refresh() {

    this.setState((prevState, props) => {
      const optionData = this._compileNest(this._initialOptionData);
      const conditionData = this._compileNest(this._initialConditionData);
      return {
        quizData: Object.assign({} , this._initialQuizData),
        optionData: optionData,
        conditionData: conditionData
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


    if (title === "condition") {

      this.setState((prevState, props) => {

        if (name === "id" ) {
          prevState.focus.manual = true;

          if ( prevState.conditionData[value] || value === "quiz_id") { // id 欄位與其他 condition 重複時，不動 key
            prevState.valid = false;
            prevState.conditionData[number].id = value;
            prevState.focus.id = number;

          } else { // id 欄位合法變更時，改 key

            prevState.conditionData[value] = Object.assign({}, prevState.conditionData[number]);
            delete prevState.conditionData[number];

            prevState.conditionData[value].id = value;
            prevState.valid = this._validateAll(prevState);
            prevState.focus.id = value;
          }

        } else {
          prevState.focus.manual = false;
          prevState.conditionData[id][name] = value;
          prevState.valid = this._validateAll(prevState);
        }

        return {
          conditionData: prevState.conditionData,
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

    let conditionFormJSX;
    let optionFormJSX;

    const condition = this.state.conditionData;
    if (condition && Object.keys(condition).length > 0) {
      conditionFormJSX = Object.keys(condition).map( (key) => {
        const item = condition[key];
        let focus = false;
        if (this.state.focus.manual && this.state.focus.id === key) {
          focus = true;
        }
        return (
          <ConditionForm key={key} number={key} {...item} focus={focus} onDelete={this._onConditionDelete} onChange={this._onInputChange} />
        );
      });
    }

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
                  <QuizForm locked="true" {...this.state.quizData} header="編輯問題" onChange={this._onInputChange} />
                  { this.props.type === "select" && 
                  <div className="wrapper">
                    <hr className="ui divider" />
                    {conditionFormJSX}
                    <a onClick={this._onConditionAdd} className="ui green icon labeled mini button">
                      <i className="icon add" />
                      新增條件
                    </a>
                  </div>
                  }
                </div>
                { this.props.type === "select" &&
                <div className="column">
                  { optionFormJSX }
                  <a onClick={this._onOptionAdd} className="ui green icon labeled mini button">
                    <i className="icon add" />
                    新增選項
                  </a>
                </div>
                }
                { this.props.type === "input" &&
                <div className="column">
                  { conditionFormJSX }
                  <a onClick={this._onConditionAdd} className="ui green icon labeled mini button">
                    <i className="icon add" />
                    新增條件
                  </a>
                </div>
                }
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
