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
import QuizForm from './quiz/QuizForm';

import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      quiz: {},
      answer: {},
      mode: "view",
      valid: false,
      new: {
        id: "quiz_id",
        title: "問題",
        description: "",
        target: "",
        option: {
          1: {
            id: 1,
            title: "選項一",
            value: ""
          }
        }
      }
    };

    this._modes = ["view", "new"];

    this._onQuizAdd = this._onQuizAdd.bind(this);
    this._onInputChange = this._onInputChange.bind(this); // 切換編輯模式
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
      const valid = this.state.valid ? "" : "disabled";
      return (
        <div className="NewQuiz ui basic segment">
          <div className="new ui segment">
            <form ref="form" className="Form ui form">
              <QuizForm {...this.state.new} header="新問題" onChange={this._onInputChange} />
              <hr className="ui divider" />
              <Link to="/quiz" onClick={this._save} className={"ui icon labeled olive button " + valid}>
                <i className="icon checkmark" />
                送出
              </Link>
            </form>
          </div>
        </div>
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

  _onInputChange(event) {

    const target = event.target;

    const name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState((prevState, props) => {

      if (name === "id" && prevState.quiz[value]){
        prevState.valid = false;
      } else {
        if (name === "id" || name === "title") {
          if (value.length === 0) {
            prevState.valid = false;
          } else {
            if (prevState.new.id && prevState.new.title) {
              prevState.valid = true;
            }
          }
        }
      }
      prevState.new[name] = value;
      return {
        new: prevState.new,
        valid: prevState.valid
      };
    });

  }

  componentWillUnmount() {
    this.firebaseData.off();
  }

  _onQuizAdd() {
    this.setState((prevState, props) => {
      return {};
    });
  }

  _save() {

    // TODO: redirect on success
    this.setState((prevState, props) => {

      if (prevState.valid) {
        prevState.quiz[prevState.new.id] = {
          id: prevState.new.id,
          title: prevState.new.title,
          description: prevState.new.description,
          target: prevState.new.target,
          option: prevState.new.option
        };
        firebase.database().ref('quiz').set(prevState.quiz);
      }
      return null;
    });

  }

}

export default App;
