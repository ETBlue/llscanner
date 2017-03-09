import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import Quiz from './components/Quiz';

class App extends Component {

  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    const data = firebase.database().ref().child('quiz');
    data.on('value', snapshot => {
      this.setState({
        quiz: snapshot.val()
      });
    });
  }

  componentWillUnmount() {
    this.firebaseData.off();
  }

  _getQuiz() {
    const quiz = this.state.quiz;
    if (quiz) {
      return (
        Object.keys(quiz).map( (quizitem) => {
          const item = quiz[quizitem];
          return (
            <Quiz key={item.id} {...item} />
          )
        })
      );
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header ui center aligned basic inverted segment">
          <h2 className="ui inverted header">
          <img src={logo} className="App-logo ui image" alt="logo" />
          <div className="content">
            Labor Law Scanner 
            <span className="ui horizontal black label">alpha</span>
          </div>
          </h2>
        </header>
        {this._getQuiz()}
        <div className="auth"></div>
      </div>
    );
  }
}

export default App;
