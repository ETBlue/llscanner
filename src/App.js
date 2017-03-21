import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import firebase from 'firebase';

import Quiz from './quiz/Quiz';
import QuizView from './quiz/QuizView';
import QuizEdit from './quiz/QuizEdit';
import QuizAdd from './quiz/QuizAdd';

import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      quiz: {},
      answer: {},
    };
  }

  componentWillMount() {

    const data = firebase.database().ref();

    data.on('value', snapshot => {
      this.setState((prevState, props) => {
        return {
          quiz: snapshot.val().quiz,
          answer: snapshot.val().answer
        };
      });
    });
  }

  render() {

    const HomePage = () => {
      return (
        <p>wahahahaha</p>
        );
    }

    const QuizListPage = () => {

      let quizListJSX;

      const quiz = this.state.quiz;

      if (quiz) {
        quizListJSX = Object.keys(quiz).map( (id) => {
          const item = quiz[id];
          return (
            <tr key={id}>
              <td>{id}</td>
              <td>
                <Link key={id} to={"/quiz/" + id}>{item.title}</Link>
              </td>
              <td>{item.target}</td>
            </tr>
          )
        })
      }

      return (
        <div className="QuizListPage ui basic segment">
          <table className="ui striped table">
            <thead>
              <tr>
                <th>編號</th>
                <th>問題</th>
                <th>標的</th>
              </tr>
            </thead>
            <tbody>
            { quizListJSX }
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={3} className="right aligned">
                  <Link to="/quiz/new" className="ui icon labeled button" >
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

    const QuizPage = (params) => {

      const id = params.id;
      const action = params.action;
      const quiz = this.state.quiz;
      const answer = this.state.answer;

      if (quiz[id]) {

        if (action === "edit") {
          return (
            <div>
            <QuizView answer={answer[id]} {...quiz[id]} />
            <QuizEdit answer={answer[id]} {...quiz[id]} />
            </div>
          );
        } else {
          return (
            <Quiz key={id} answer={answer[id]} quiz={quiz[id]} />
          );
        }
      } else {
        return (
          <QuizListPage />
        );
      }

    }

    const NewQuizPage = () => {
      return (
        <QuizAdd quiz={this.state.quiz} />
      );
    }

    return (

      <Router basename="/llscanner">
        <div className="App">
          <header className="App-header ui center aligned basic inverted segment">
            <h1 className="ui inverted header">
            <img src={logo} className="App-logo ui image" alt="logo" />
            <div className="content">
              Labor Laws Scanner 
              <span className="ui horizontal black label">alpha</span>
            </div>
            </h1>
            <nav className="ui inverted compact secondary pointing menu">
              <NavLink exact to="/" className="item">Home</NavLink>
              <NavLink to="/quiz" className="item">Quiz</NavLink>
              <NavLink to="/answer" className="item">Answer</NavLink>
            </nav>
          </header>
          <section className="App-body">
            <Route exact path="/" render={HomePage} />
            <Route path="/quiz/:id?/:action?" render={({match}) => (QuizPage(match.params) || QuizListPage)} />
            <Route path="/quiz/new" render={NewQuizPage} />
            <Route path="/answer" render={() => <p>answer</p>} />

            {/*'<div className="auth"></div>'*/}
          </section>

        </div>
      </Router>
    );
  }

  componentWillUnmount() {
    this.firebaseData.off();
  }

}

export default App;
