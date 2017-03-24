import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from 'react-router-dom';
import firebase from 'firebase';

import Quiz from './quiz/Quiz';
import QuizList from './quiz/QuizList';
import QuizListEdit from './quiz/QuizListEdit';
import QuizView from './quiz/QuizView';
import QuizEdit from './quiz/QuizEdit';
import QuizAdd from './quiz/QuizAdd';

import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {

    super();

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

    const QuizPage = (params) => {

      const id = params.id;
      const action = params.action;
      const quiz = this.state.quiz;
      const answer = this.state.answer;

      if (id === "new") {
        return (
          <QuizAdd quiz={this.state.quiz} />
        );
      }

      if (id === "edit") {
        return (
          <QuizListEdit quiz={this.state.quiz} />
        );
      }

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
      }

      return (
        <QuizList quiz={this.state.quiz} />
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
              <NavLink to="/login" className="item">Login</NavLink>
            </nav>
          </header>

          <div className="App-body">
            <Switch>
              <Route exact path="/" render={HomePage} />
              <Route path="/quiz/:id?/:action?" render={({match}) => QuizPage(match.params)} />
              <Route path="/answer" render={() => <p>answer</p>} />
              {/*<Route path="/login" render={() => <div className="auth"></div>} />
                          */}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }

  componentWillUnmount() {
    this.firebaseData.off();
  }

}

export default App;
