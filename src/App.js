import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import Quiz from './quiz/Quiz';
import QuizForm from './quiz/QuizForm';
import Button from './quiz/Button';
import toggleMode from './_toggleMode';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quiz: {},
      mode: "currentQuizMode",
      visibility: {
        currentQuiz: "visible",
        newQuiz: "hidden"
      }
    };
    this._modeSettings = {
      currentQuizMode: ["currentQuiz"],
      newQuizMode: ["newQuiz"]
    };
    this._quizDefault = {
      id: "",
      title: "",
      description: "",
      target: "",
      option: {}
    };
    this._renderCurrentQuiz = this._renderCurrentQuiz.bind(this);
    this._addNewQuiz = this._addNewQuiz.bind(this);
    this._renderNewQuiz = this._renderNewQuiz.bind(this);
    this._inputRefQuiz = this._inputRefQuiz.bind(this); // 將編輯人員填入的表單資料放到暫存區
    this._renderMode = this._renderMode.bind(this); // 切換編輯模式
    this._toggle = this._toggle.bind(this); // 切換編輯模式
    this._save = this._save.bind(this); // 將編輯的資料送出到 server

    this._formDataQuiz = {}; // 從表單讀入的資料暫存區，第一層
    this._currentMode = "";
    this._currentVisibility = {};
  }

  componentWillMount() {
    const data = firebase.database().ref().child('quiz');
    data.on('value', snapshot => {
      this.setState((prevState, props) => {
        return { quiz: snapshot.val() };
      }, () => {
        console.log(this.state);
        this.render();
      });
    });
    this._currentMode = this.state.mode;
    this._currentVisibility = Object.assign({}, this.state.visibility);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header ui center aligned basic inverted segment">
          <h2 className="ui inverted header">
          <img src={logo} className="App-logo ui image" alt="logo" />
          <div className="content">
            Labor Laws Scanner 
            <span className="ui horizontal black label">alpha</span>
          </div>
          </h2>
        </header>
        <section className="App-body">
          <Button onClick={this._toggle} icon="add" color="" className="" title="" />
          <div className={this.state.visibility.currentQuiz + " toggleAppMode"}>
            {this._renderCurrentQuiz()}
          </div>
          <div className={this.state.visibility.newQuiz + " toggleAppMode"}>
            {this._renderNewQuiz()}
          </div>
          {/*'<div className="auth"></div>'*/}
        </section>
      </div>
    );
  }

  componentWillUnmount() {
    this.firebaseData.off();
  }

  _renderCurrentQuiz() {
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

  _addNewQuiz() {
    this._currentMode = "newQuizMode";
    this._renderMode();
  }

  _renderNewQuiz() {
    return(
      <div className="NewQuiz ui basic segment">
        <div className="new ui segment">
          <form ref="form" className="Form ui form">
            <QuizForm header="新問題" reference={this._inputRefQuiz} target="_formDataQuiz" data={this.props} />
          </form>
        </div>
      </div>
    )
  }

  _inputRefQuiz(target, id, key, value) {
    this[target][key] = value;
  }

  _toggle() {
    this._currentMode = toggleMode(this._currentMode, "currentQuizMode", "newQuizMode");
    this._renderMode();
  }

  _renderMode() {
    if (this._currentMode !== this.state.mode ) {
      Object.keys(this._currentVisibility).forEach((key) => {
        this._currentVisibility[key] = "hidden";
      });
      this._modeSettings[this._currentMode].forEach((item) => {
        this._currentVisibility[item] = "visible";
      });
      this.setState((prevState, props) => {
        return {
          mode: this._currentMode,
          visibility: this._currentVisibility
        };
      });
    }
  }
    this.setState((prevState, props) => {
      return {
        answer: null,
        mode: "view",
        viewMode: "visible", 
        editMode: "hidden",
        formData: {
          id: quizData.id,
          title: quizData.title,
          description: quizData.description,
          target: quizData.target,
          option: optionData
        },
        newOption: {},
      };
    },
    () => {
      this._initialState = Object.assign({}, this.state);
      this._initialState.formData = Object.assign({}, this.state.formData);
      this._initialState.formData.option = Object.assign({}, this.state.formData.option);
      this._formDataQuiz = {};
      this._formDataOption = {};
      this._formDataNewOption = {};
    });
  }

}

export default App;
