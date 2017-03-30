import React, { Component } from 'react';
import firebase from 'firebase';
import {Link} from 'react-router-dom';

import StepForm from './StepForm';
import './StepAdd.css';

class StepAdd extends Component {

  constructor(props) {

    super(props);

    this.state = {
      valid: false,
      stepData: {
        id: this.props.stepID,
        quiz: ""
      },
      quizIDs: this.props.quizIDs,
    };

    this._onInputChange = this._onInputChange.bind(this); // 刪除本題
    this._validate = this._validate.bind(this);
    this._save = this._save.bind(this); // 將編輯的資料送出到 server
  }

  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => {
      prevState.stepData.id = nextProps.stepID;
      prevState.quizIDs = nextProps.quizIDs;
      return prevState;
    });
  }

  _onInputChange(event) {

    const target = event.target;

    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState((prevState, props) => {

      prevState.stepData[name] = value;
      prevState.valid = this._validate(prevState);

      return prevState;
    });

  }

  _validate(prevState) {

    let valid = true;
    if (prevState.stepData.id.length === 0 || 
      prevState.stepData.quiz.length === 0 ||
      this.props.step[prevState.stepData.id] ||
      prevState.stepData.id === "new" ||
      prevState.stepData.id === "edit" ||
      !parseInt(prevState.stepData.id, 10)
      // TODO: check existence of quiz
      )
    {
      valid = false;
    }
    return valid;
  }

  _save() {

    if (this.state.valid) {
      let stepData = this.state.stepData;
      firebase.database().ref('step/' + stepData.id).set({
        id: stepData.id,
        quiz: stepData.quiz
      });
    }
  }

  render() {

    const valid = this.state.valid ? "" : " disabled";

    return (
        <div className="NewStep ui basic segment">
          <h2 className="ui header">新增測驗步驟</h2>
          <div className="new ui segment">
            <form className="Form ui form">
              <StepForm 
                {...this.state.stepData} 
                header="新步驟" 
                onChange={this._onInputChange} 
              />
              <hr className="ui divider" />
              <div className="ui mini buttons">
                <Link 
                  to={"/step/" + this.state.stepData.id + "/edit" } 
                  onClick={this._save} 
                  className={"ui icon labeled teal button " + valid}
                >
                  <i className="icon checkmark" />
                  送出
                </Link>
                <Link to="/step" className="ui icon labeled button">
                  <i className="icon cancel" />
                  取消
                </Link>
              </div>
            </form>
          </div>
        </div>
    );
  }
}

export default StepAdd;
