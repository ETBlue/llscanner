import React, { Component } from 'react';
import firebase from 'firebase';
import {Link} from 'react-router-dom';

import _copyNested from '../_copyNested'
import './StepList.css';

class StepListEdit extends Component {

  constructor(props) {

    super(props);

    // to be rendered
    this.state = {
      step: _copyNested(this.props.step),
      quiz: _copyNested(this.props.quiz),
      valid: true,
      focus: ""
    };

    // form control functions
    this._onInputChange = this._onInputChange.bind(this);
    this._onStepDelete = this._onStepDelete.bind(this);
    this._validate = this._validate.bind(this);
    this._refresh = this._refresh.bind(this);
    this._save = this._save.bind(this);

    // data initialization
    this._initialStep = _copyNested(this.props.step);
    this._initialQuiz = _copyNested(this.props.quiz);

  }

  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => {

      // data initialization... again
      this._initialStep = _copyNested(nextProps.step);
      this._initialQuiz = _copyNested(nextProps.quiz);

      return {
        step: _copyNested(nextProps.step),
        quiz: _copyNested(nextProps.quiz),
        valid: true,
        focus: ""
      };
    });
  }

  _refresh() {
    this.setState((prevState, props) => {
      return {
        step: _copyNested(this._initialStep),
        quiz: _copyNested(this._initialQuiz),
        valid: true,
        focus: ""
      };
    });

  }

  _save() {

    if (this.state.valid) {
      firebase.database().ref('step').set(this.state.step);
      firebase.database().ref('quiz').set(this.state.quiz);
    }
  }

  _validate(id) {

    let valid = true;
    if ( id.length === 0 || !parseInt(id, 10) ) {
      valid = false;
    }
    return valid;
  }

  _validateAll(step) {
    let valid = true;
    Object.keys(step).forEach((key) => {
      if (step[key] && !this._validate(key)) {
        valid = false;
      }
    });
    return valid;
  }

  _onStepDelete (event) {

    const id = event.target.id;
    this.setState((prevState, props) => {
      delete prevState.step[id];
      return prevState;
    });
  }

  _onInputChange(event) {

    const target = event.target;

    const id = target.id;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState((prevState, props) => {

      if (name === "id") {

        if ( !this._validate(value) ) {
          prevState.valid = false;
          prevState.step[id].id = value;
          prevState.focus = id;

        } else {

          if (prevState.step[value] !== undefined ) {
            prevState.valid = false;
            prevState.step[id].id = value;
            prevState.focus = id;

          } else {
            prevState.step[value] = prevState.step[id];
            prevState.step[value].id = value;
            prevState.focus = value;
            delete prevState.step[id];

            prevState.valid = this._validateAll(prevState.step);
          }
        }
      }

      return prevState;
    });

  }

  render() {

    let stepListJSX;
    const valid = this.state.valid ? "" : "disabled";
    const step = this.state.step;

    if (step) {
      stepListJSX = Object.keys(step).map( (id) => {

      const item = step[id];

      if (item) {

        let conditionJSX;
        let routeJSX;

        if (item.condition) {
          conditionJSX = Object.keys(item.condition).map((key) => {

            if (item.condition[key]) {
              const listJSX = Object.keys(item.condition[key]).map((id) => {

                const rule = item.condition[key][id];
                const answer = rule.answer.split(",").map((str, index, arr) => {

                  return (
                    <span key={str}>
                    <code className="code">{str.trim()}</code>
                    {index < arr.length - 1 ? ", " : "" }
                    </span>
                  );
                });

                return (
                  <div key={id} className="ui vertical segment">
                    <div className="ui list">
                      <div className="item">
                        <i className="icon flag" />
                        <span className="content">
                        <code className="code">{rule.id}</code>
                        </span>
                      </div>
                      <div className="item">
                        <i className="icon setting" />
                        <span className="content">
                        <code className="code">{rule.condition}</code>
                        </span>
                      </div>
                      <div className="item">
                        <i className="icon tags" />
                        <span className="content">
                        {answer}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              });
              return (
                <div key={key} className="Condition">
                  <h5 className="ui dividing header">
                  進入條件 {key}
                  </h5>
                  {listJSX}
                </div>
              );
            } else {
              return null;
            }
          });
        }

        if (item.route) {
          const listJSX = Object.keys(item.route).map((key) => {
            return (
              <div key={key} className="item">
                <i className="icon random" />
                <span className="content">
                  <code className="code">{item.route[key].id}</code>
                  →
                  <code className="code">{item.route[key].quiz}</code>
                </span>
              </div>
            );
          });
          routeJSX = (
            <div>
              <h5 className="ui dividing header">
              離開路徑
              </h5>
              <div className="ui divided relaxed list">
                {listJSX}
              </div>
            </div>
          );
        }

        return (
          <tr key={id}>
            <td>
              <code className="code">
                <Link to={"/step/" + item.id}>{item.quiz}</Link>
              </code>
              <p className="comment">{this.state.quiz[item.quiz].title}</p>
            </td>
            <td>
              <div className="ui input">
                <input 
                  type="text" 
                  size="3" 
                  id={id} 
                  name="id" 
                  value={item.id} 
                  placeholder={id} 
                  onChange={this._onInputChange} 
                  autoFocus={this.state.focus === id ? true : false} 
                  />
              </div>
            </td>
            <td>{conditionJSX}{routeJSX}</td>
            <td className="right aligned">
              <a id={id} onClick={this._onStepDelete} className="ui mini red icon labeled button">
                <i className="icon trash" />
                Delete
              </a>
            </td>
          </tr>
        )
      } else {return null;}
      });
    }

    return (
      <div className="QuizList ui basic segment">
        <h2 className="ui header">編輯步驟列表</h2>
        <table className="ui unstackable table">
          <thead>
            <tr>
              <th className="four wide">題目</th>
              <th className="two wide">排序 *</th>
              <th className="six wide">進出規則</th>
              <th className="four wide"></th>
            </tr>
          </thead>
          <tbody>
          { stepListJSX }
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={4} className="right aligned">
                <div className="ui mini buttons">
                  <Link to="/step" onClick={this._save} className={"ui icon labeled teal button " + valid} >
                    <i className="icon checkmark" />
                    Save
                  </Link>
                  <Link to="/step" className="ui icon labeled button" >
                    <i className="icon cancel" />
                    Cancel
                  </Link>
                  <a onClick={this._refresh} className="ui icon labeled yellow button" >
                    <i className="icon refresh" />
                    Refresh
                  </a>
                </div>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }

}

export default StepListEdit;
