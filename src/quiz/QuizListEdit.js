import React, { Component } from 'react';
import firebase from 'firebase';
import {Link} from 'react-router-dom';

class QuizListEdit extends Component {

  constructor(props) {

    super(props);

    // to be rendered
    this.state = {
      quiz: this.props.quiz,
      valid: true,
      focus: ""
    };

    // form control functions
    this._onInputChange = this._onInputChange.bind(this);
    this._onQuizDelete = this._onQuizDelete.bind(this);
    this._validate = this._validate.bind(this);
    this._refresh = this._refresh.bind(this);
    this._save = this._save.bind(this);

    // data preparation
    this._compilePath = this._compilePath.bind(this);
    this._copyNested = this._copyNested.bind(this);

    // data initialization
    this._initialState = this._copyNested(this.state);
    this._answer = this.props.answer;
    this._path = this.props.path;
    this._order = this._compilePath(this.props.path);
    this._initialAnswer = this._copyNested(this.props.answer);
    this._initialPath = this._copyNested(this.props.path);
    this._initialOrder = this._copyNested(this._order);

  }

  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => {

      // data initialization... again
      this._initialState.quiz = this._copyNested(nextProps.quiz);
      this._answer = nextProps.answer;
      this._path = nextProps.path;
      this._order = this._compilePath(nextProps.path);
      this._initialAnswer = this._copyNested(nextProps.answer);
      this._initialPath = this._copyNested(nextProps.path);
      this._initialOrder = this._copyNested(this._order);

      return {
        quiz: nextProps.quiz,
      };
    });
  }

  _compilePath(path) {
    let order = {};
    if (path) {
    Object.keys(path).forEach((key) => {
      order[path[key].quiz] = {
        id: key,
        current: path[key].quiz,
        prev: path[key - 1].quiz,
        next: path[key + 1].quiz,
      };
    });
    }
    return order;
  }

  _copyNested(obj) {
    if (obj) {
      let data = Object.assign({}, obj);
      if (Object.keys(obj).length > 0) {
      Object.keys(obj).forEach((id) => {
        data[id] = obj[id];
        if (Object.keys(obj[id]).length > 0 && typeof obj[id] !== "string") {
        Object.keys(obj[id]).forEach((prop) => {
          data[id][prop] = obj[id][prop];
          if (Object.keys(obj[id][prop]).length > 0 && typeof obj[id][prop] !== "string") {
          Object.keys(obj[id][prop]).forEach((attr) => {
            data[id][prop][attr] = obj[id][prop][attr];
            if (Object.keys(obj[id][prop][attr]).length > 0 && typeof obj[id][prop][attr] !== "string") {
            Object.keys(obj[id][prop][attr]).forEach((field) => {
              data[id][prop][attr][field] = obj[id][prop][attr][field];
            });
            }
          });
          }
        });
        }
      });
      }
      return data;
    }
  }

  _refresh() {
    this.setState((prevState, props) => {

    this._answer = this._copyNested(this._initialAnswer);
    this._path = this._copyNested(this._initialPath);
    this._order = this._compilePath(this._initialOrder);

      return {
        quiz: this._copyNested(this._initialState.quiz),
        valid: this._initialState.valid,
        focus: this._initialState.focus
      };
    });

  }

  _save() {

    if (this.state.valid) {
      firebase.database().ref('quiz').set(this.state.quiz);
      firebase.database().ref('answer').set(this._answer);
      firebase.database().ref('path').set(this._path);
    }
  }

  _validate(id) {

    let valid = true;
    if ( id.length === 0 || id === "new" || id === "edit" || id === "quiz_id" ) {
      valid = false;
    }
    return valid;
  }

  _validateAll(quiz) {
    let valid = true;
    Object.keys(quiz).forEach((key) => {
      if (!this._validate(key)) {
        valid = false;
      }
    });
    return valid;
  }

  _onQuizDelete (event) {

    const id = event.target.id;
    this.setState((prevState, props) => {
      delete prevState.quiz[id];
      delete this._answer[id];
      delete this._path[this._order[id].id]
      delete this._order[id];

      return prevState;
    });
  }

  _onInputChange(event) {

    const target = event.target;

    const id = target.id;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const number = target.getAttribute("data-number"); // 中繼狀態用的 id 替身

    this.setState((prevState, props) => {

      if (name === "id") {

        if ( !this._validate(value) ) {
          prevState.valid = false;
          prevState.quiz[number].id = value;
          prevState.focus = number;

        } else {

          if (prevState.quiz[value] !== undefined ) {
            prevState.valid = false;
            prevState.quiz[number].id = value;
            prevState.focus = number;

          } else {
            prevState.quiz[value] = Object.assign({}, prevState.quiz[id]);
            prevState.quiz[value].id = value;
            prevState.focus = value;
            delete prevState.quiz[id];

            this._answer[value] = this._answer[id];
            delete this._answer[id];

            this._path[this._order[id].id].id.quiz = value;

            this._order[value] = this._order[id];
            this._order[value].current = value;
            delete this._order[id];

            prevState.valid = this._validateAll(prevState.quiz);
          }
        }
      }

      return prevState;
    });

  }

  render() {

    const valid = this.state.valid ? "" : "disabled";
    const quiz = this.state.quiz;

    let quizListJSX;
    if (quiz) {

      quizListJSX = Object.keys(quiz).map( (id) => {

        const item = quiz[id];

        return (
          <tr key={id}>
            <td>
              <Link to={"/quiz/" + id}>{item.title}</Link>
            </td>
            <td>{item.type}</td>
            <td>
              <div className="ui input">
                <input 
                  type="text" 
                  id={item.id} 
                  data-number={id}
                  name="id" 
                  value={item.id} 
                  placeholder={id} 
                  onChange={this._onInputChange} 
                  autoFocus={this.state.focus === id ? true : false} 
                  />
              </div>
            </td>
            <td className="right aligned">
              <a id={id} onClick={this._onQuizDelete} className="ui mini red icon labeled button">
                <i className="icon trash" />
                Delete
              </a>
            </td>
          </tr>
        )
      })
    }

    return (
      <div className="QuizList ui basic segment">
        <h2 className="ui header">編輯測驗題列表</h2>
        <table className="ui unstackable table">
          <thead>
            <tr>
              <th className="five wide">題目</th>
              <th className="two wide">類型</th>
              <th className="five wide">代號 *</th>
              <th className="four wide"></th>
            </tr>
          </thead>
          <tbody>
          { quizListJSX }
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={4} className="right aligned">
                <div className="ui mini buttons">
                  <Link to="/quiz" onClick={this._save} className={"ui icon labeled olive button " + valid} >
                    <i className="icon checkmark" />
                    Save
                  </Link>
                  <Link to="/quiz" className="ui icon labeled button" >
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

export default QuizListEdit;
