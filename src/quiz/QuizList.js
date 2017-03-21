import React, { Component } from 'react';
import firebase from 'firebase';
import {Link} from 'react-router-dom';

class QuizList extends Component {

  constructor(props) {

    super(props);

    this.state = {
      allQuiz: this.props.quiz,
      valid: true
    };

  }

  _setID (event) {

  }


  _save() {

  }


  _vlidate(prevState) {
    let valid = true;
    if (prevState.quizData.title.length === 0) {
      valid = false;
    }
    return valid;
  }

  render() {

    let quizListJSX;
    const quiz = this.state.allQuiz;

    if (quiz) {
      quizListJSX = Object.keys(quiz).map( (id) => {
        const item = quiz[id];
        return (
          <tr key={id}>
            <td>
              <Link key={id} to={"/quiz/" + id}>{item.title}</Link>
            </td>
            <td>{id}</td>
            <td>action</td>
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
              <th>問題</th>
              <th>目標代號</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          { quizListJSX }
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={3} className="right aligned">
                <Link to="/quiz/new" className="ui icon labeled mini green button" >
                  <i className="icon add" />
                  New Quiz
                </Link>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }

}

export default QuizList;
