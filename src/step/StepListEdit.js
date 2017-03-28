import React, { Component } from 'react';
import firebase from 'firebase';
import {Link} from 'react-router-dom';

import _copyNested from '../_copyNested'

class StepListEdit extends Component {

  constructor(props) {

    super(props);

    // to be rendered
    this.state = {
      step: this.props.step,
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

  }

  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => {

      // data initialization... again
      this._initialStep = _copyNested(nextProps.step);

      return {
        step: nextProps.step,
        valid: true,
        focus: ""
      };
    });
  }

  _refresh() {
    this.setState((prevState, props) => {
      return {
        step: _copyNested(this._initialStep),
        valid: true,
        focus: ""
      };
    });

  }

  _save() {

    if (this.state.valid) {
      firebase.database().ref('step').set(this.state.step);
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

    const valid = this.state.valid ? "" : "disabled";
    const step = this.state.step;

    let stepListJSX;
    if (step) {

      stepListJSX = Object.keys(step).map( (id) => {
      const item = step[id];
      if (item) {

        let condition;
        let route;

        if (item.condition) {

          condition = Object.keys(item.condition).map((key) => {
          if (item.condition[key]) {

            const target = Object.keys(item.condition[key]).map((target) => {
            if (item.condition[key][target]) {

              const rule = item.condition[key][target];
              const answer = rule.answer.split(",").map((str, index, arr) => {
                return (
                  <span key={str}>
                  <code className="code">{str.trim()}</code>
                  {index < arr.length - 1 ? ", " : "" }
                  </span>
                );
              });
              return (
                <div key={target} className="item">
                  當
                  <code className="code">{rule.id}</code>
                  的答案
                  <code className="code">{rule.condition}</code>
                  這些值
                  {answer}
                  時
                </div>
              );
            } else {return null;}
            });

            return (
              <div key={key} className="ui divided list">
              {target}
              </div>
            );
          } else {return null;}
          });
        }

        if (item.route) {
          const list = Object.keys(item.route).map((key) => {
          if (item.route[key]){

            return (
              <div key={key} className="item">
                回答
                <code className="code">{key}</code>
                將導向
                <code className="code">{item.route[key]}</code>
              </div>
            );

          } else {return null;}
          });
          route = (
            <div className="ui divided list">
              {list}
            </div>
          );
        }

        return (
          <tr key={id}>
            <td>
              <code className="code">
                <Link to={"/step/" + item.id}>{item.quiz}</Link>
              </code>
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
            <td>{condition}{route}</td>
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
              <th className="four wide">代號</th>
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
                  <Link to="/step" onClick={this._save} className={"ui icon labeled olive button " + valid} >
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
