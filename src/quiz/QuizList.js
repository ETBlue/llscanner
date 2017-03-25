import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class QuizList extends Component {

  constructor(props) {

    super(props);

    this.state = {
      allQuiz: this._compileQuiz(this.props.quiz)
    };

    this._compileQuiz = this._compileQuiz.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => {
      return {
        allQuiz: this._compileQuiz(nextProps.quiz),
      };
    });
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

  render() {

    let quizListJSX;
    const quiz = this.state.allQuiz;

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
              <Link key={item.id} to={"/quiz/" + item.id}>{item.title}</Link>
            </td>
            <td>{item.id}</td>
            <td>{item.order}</td>
            <td>{condition}</td>
            <td className="right aligned">
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
              <th>代號</th>
              <th>順序</th>
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
                  <Link to="/quiz/new" className="ui icon labeled green button" >
                    <i className="icon add" />
                    New Quiz
                  </Link>
                  <Link to="/quiz/edit" className="ui icon labeled button" >
                    <i className="icon pencil" />
                    Edit List
                  </Link>
                </div>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }

}

export default QuizList;
