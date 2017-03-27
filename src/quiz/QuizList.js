import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class QuizList extends Component {

  constructor(props) {

    super(props);

    this.state = {
      quiz: this.props.quiz,
    };

  }

  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => {
      return {
        quiz: nextProps.quiz,
      };
    });
  }

  render() {

    let quizListJSX;
    const quiz = this.state.quiz;

    if (quiz) {
      quizListJSX = Object.keys(quiz).map( (id) => {

        const item = quiz[id];

        return (
          <tr key={id}>
            <td>
              <Link key={item.id} to={"/quiz/" + item.id}>{item.title}</Link>
            </td>
            <td>{item.id}</td>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
          { quizListJSX }
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={3} className="right aligned">
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
