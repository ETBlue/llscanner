import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom'
import firebase from 'firebase';

import Quiz from './quiz/Quiz';
import QuizForm from './quiz/QuizForm';
import Button from './quiz/Button';

import toggleMode from './_toggleMode';

import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      quiz: {},
      answer: {},
      mode: "view",
      new: {}
    };

    this._modes = ["view", "new"];

    this._quizDefault = {
      id: "",
      title: "",
      description: "",
      target: "",
      option: {}
    };

    this._onQuizAdd = this._onQuizAdd.bind(this);
    this._toggle = this._toggle.bind(this); // 切換編輯模式
    this._save = this._save.bind(this); // 將編輯的資料送出到 server

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

    const QuizListPage = () => {

      let currentQuizJSX;

      const quiz = this.state.quiz;
      const answer = this.state.answer;

      if (quiz) {
        currentQuizJSX = Object.keys(quiz).map( (id) => {
          const item = quiz[id];
          return (
            <Quiz key={item.id} answer={answer[item.id]} {...item} />
          )
        })
      }

      return (
        <div>
          <Link to="/quiz/new" className="ui icon button" >
            <i className="icon add" />
          </Link>
          { currentQuizJSX }
        </div>
      );
    }

    const QuizPage = (match) => {

      const id = match.params.id;
      const quiz = this.state.quiz;
      const answer = this.state.answer;

      console.log(quiz[id]);

      if (quiz[id]) {
        return (
          <Quiz key={id} answer={answer[id]} {...quiz[id]} />
        );
      } else {
        return (<div></div>);
      }
    }

    const NewQuizPage = () => {
      return (
        <div className="NewQuiz ui basic segment">
          <div className="new ui segment">
            <form ref="form" className="Form ui form">
              <QuizForm header="新問題" onChange={this._onInputChange} reference={this._inputRefQuiz} target="_formDataQuiz" data={this.props} />
            </form>
          </div>
        </div>
      );
    }

    return (

      <Router>
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
            <Route exact path="/" render={QuizPage} />
            <Route exact path="/quiz" render={QuizListPage} />
            <Route exact path="/quiz/:id" render={({match}) => (QuizPage(match) || QuizListPage)} />
            <Route path="/quiz/new" render={NewQuizPage} />
            <Route path="/answer" render={() => <p>answer</p>} />

            {/*'<div className="auth"></div>'*/}
          </section>

        </div>
      </Router>
    );
  }

  _onInputChange(){

  }

  componentWillUnmount() {
    this.firebaseData.off();
  }

  _onQuizAdd() {
    this.setState((prevState, props) => {
      return {};
    });
  }

  _toggle() {

    this.setState((prevState, props) => {
      return {mode: toggleMode(prevState.mode, ...this._modes)};
    });
  }

  _save(event) {

    firebase.database().ref('quiz/' + this.props.id).set(this.state.new, () => {
      this.setState({new: {}});
    });

  }

}

export default App;
