import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  NavLink
} from 'react-router-dom';
import firebase from 'firebase';

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
      quizOrder: {},
      firstQuiz: ""
    };
  }

  componentWillMount() {

    const data = firebase.database().ref();

    data.on('value', snapshot => {
      this.setState((prevState, props) => {

        const quiz = snapshot.val().quiz;

        let orderArray = [];
        Object.keys(quiz).forEach((key) => {
          orderArray.push(quiz[key].order);
          prevState.quizOrder[quiz[key].order] = {
            current: key
          };
        });

        orderArray = orderArray.sort();
        orderArray.forEach((order, index) => {
          if (index > 0) {
            prevState.quizOrder[order].prev = prevState.quizOrder[orderArray[index - 1]].current;
          } else {
            prevState.quizOrder[order].prev = "";
            prevState.firstQuiz = prevState.quizOrder[order].current;
          }
          if (index < orderArray.length - 1) {
            prevState.quizOrder[order].next = prevState.quizOrder[orderArray[index + 1]].current;
          } else {
            prevState.quizOrder[order].next = "";
          }
        });

        return {
          quiz: quiz,
          answer: snapshot.val().answer,
          quizOrder: prevState.quizOrder,
          firstQuiz: prevState.firstQuiz
        };
      });
    });
  }

  render() {

    const HomePage = () => {
      const quiz = this.state.quiz;
      const order = this.state.quizOrder;
      const first = this.state.firstQuiz;
      const answer = this.state.answer;
      const prev = quiz[first] ? order[quiz[first].order].prev : "";
      const next = quiz[first] ? order[quiz[first].order].next : "";

      return (
        <section key={this.state.firstQuiz} className="Quiz">
          <QuizView 
            prev={prev} 
            next={next} 
            answer={answer[first]} {...quiz[first]} 
          />
          <Link to={"/quiz/" + first + "/edit"} className="ui mini icon button" >
            <i className="icon pencil" />
          </Link>
        </section>
      );
    }

    const QuizPage = (params) => {

      const id = params.id;
      const action = params.action;
      const quiz = this.state.quiz;
      const order = this.state.quizOrder;
      const answer = this.state.answer;

      if (id === "new") {
        return (
          <QuizAdd quiz={this.state.quiz} />
        );
      }

      if (id === "edit") {
        return (
          <QuizListEdit quiz={quiz} answer={answer} />
        );
      }

      if (quiz[id]) {

        if (action === "edit") {
          return (
            <section key={id}>
              <QuizView 
                prev={order[quiz[id].order].prev} 
                next={order[quiz[id].order].next} 
                answer={answer[id]} {...quiz[id]} 
              />
              <QuizEdit answer={answer[id]} {...quiz[id]} />
            </section>
          );

        } else {
          return (
            <section key={id} className="Quiz">
              <QuizView 
                prev={order[quiz[id].order].prev} 
                next={order[quiz[id].order].next} 
                answer={answer[id]} {...quiz[id]} 
              />
              <Link to={"/quiz/" + id + "/edit"} className="ui mini icon button" >
                <i className="icon pencil" />
              </Link>
            </section>
          );
        }
      }

      return (
        <QuizList quiz={quiz} />
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
              {/*<NavLink to="/login" className="item">Login</NavLink>*/}
            </nav>
          </header>

          <div className="App-body">
            <Switch>
              <Route exact path="/" render={HomePage} />
              <Route path="/quiz/:id?/:action?" render={({match}) => QuizPage(match.params)} />
              <Route path="/answer" render={() => <p>answer</p>} />
              <Route path="/:endpoint" render={({match}) => <p>{match.params.endpoint} page is not found</p>} />
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
