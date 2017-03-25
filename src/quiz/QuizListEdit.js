import React, { Component } from 'react';
import firebase from 'firebase';
import {Link} from 'react-router-dom';

class QuizListEdit extends Component {

  constructor(props) {

    super(props);

    this.state = {
      allQuiz: this._compileQuiz(this.props.quiz),
      valid: true,
      focus: ""
    };

    this._onInputChange = this._onInputChange.bind(this);
    this._onQuizDelete = this._onQuizDelete.bind(this);
    this._refresh = this._refresh.bind(this);
    this._save = this._save.bind(this);
    this._validate = this._validate.bind(this);
    this._initialState = Object.assign({}, this.state);
    this._initialState.allQuiz = this._compileQuiz(this.props.quiz);

  }

  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => {
      this._initialState.allQuiz = this._compileQuiz(nextProps.quiz);
      return {
        allQuiz: this._compileQuiz(nextProps.quiz),
      };
    });
  }

  _save() {

    if (this.state.valid) {
      firebase.database().ref('quiz').set(this.state.allQuiz);
    }
  }

  _compileQuiz(allQuiz) {
    if (allQuiz) {
      let data = Object.assign({}, allQuiz);
      Object.keys(allQuiz).forEach((key) => {
        data[key] = {};
        Object.keys(allQuiz[key]).forEach((field) => {
          data[key][field] = allQuiz[key][field];
        });
      });
      return data;
    }
  }

  _refresh() {
    this.setState((prevState, props) => {

      const allQuiz = this._compileQuiz(this._initialState.allQuiz);
      return {
        allQuiz: allQuiz,
        valid: this._initialState.valid,
        focus: this._initialState.focus
      };
    });

  }

  _validate(id) {

    let valid = true;
    if ( id.length === 0 || id === "new" || id === "edit" || id === "quiz_id" ) {
      valid = false;
    }
    return valid;
  }

  _validateAll(allQuiz) {
    let valid = true;
    let keys = {};
    Object.keys(allQuiz).forEach((key) => {
      const order = allQuiz[key].order;
      if (!keys[order]) {
        keys[order] = true;
      } else {
        valid = false;
      }
      if (!this._validate(key)) {
        valid = false;
      }
    });
    return valid;
  }

  _onQuizDelete (event) {

    const id = event.target.id;
    this.setState((prevState, props) => {
      delete prevState.allQuiz[id];
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
          prevState.allQuiz[number].id = value;
          prevState.focus = number;

        } else {

          if (prevState.allQuiz[value] !== undefined ) {
            prevState.valid = false;
            prevState.allQuiz[number].id = value;
            prevState.focus = number;

          } else {
            prevState.allQuiz[value] = Object.assign({}, prevState.allQuiz[id]);
            delete prevState.allQuiz[id];

            prevState.allQuiz[value].id = value;
            prevState.focus = value;

            prevState.valid = this._validateAll(prevState.allQuiz);
          }
        }
      }
      if (name === "order") {
        if (value.length === 0) {
          prevState.valid = false;
        } else {
          prevState.valid = this._validateAll(prevState.allQuiz);
        }
        prevState.allQuiz[id].order = value;
      }

      return prevState;
    });

  }

  render() {

    const valid = this.state.valid ? "" : "disabled";
    const quiz = this.state.allQuiz;

    let quizListJSX;
    if (quiz) {

      quizListJSX = Object.keys(quiz).map( (id) => {

        const item = quiz[id];
        const condition = Object.keys(item.condition).map((key) => {
          return (
            <div key={key}>{item.condition[key].id}: {item.condition[key].value}</div>
          );
        });

        return (
          <tr key={id}>
            <td>
              <Link to={"/quiz/" + id}>{item.title}</Link>
            </td>
            <td>
              <div className="ui input">
                <input 
                  autoFocus={this.state.focus === id ? true : false} 
                  id={item.id} 
                  data-number={id}
                  title="id" 
                  onChange={this._onInputChange} 
                  placeholder={id} 
                  value={item.id} 
                  type="text" />
              </div>
            </td>
            <td>
              <div className="ui input">
                <input id={id} title="order" onChange={this._onInputChange} placeholder={item.order} value={item.order} size="3" type="text" />
              </div>
            </td>
            <td>
              {condition}
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
        <h2 className="ui header">測驗題列表</h2>
        <table className="ui unstackable table">
          <thead>
            <tr>
              <th>題目</th>
              <th>代號 *</th>
              <th>順序 *</th>
              <th>條件</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          { quizListJSX }
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={5} className="right aligned">
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
