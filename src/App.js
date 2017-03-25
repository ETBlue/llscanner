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
    };
  }

  componentWillMount() {

    const data = firebase.database().ref();

    data.on('value', snapshot => {
      this.setState((prevState, props) => {
        return {
          quiz: snapshot.val().quiz,
          answer: snapshot.val().answer,
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

      let orderArray = [];
      let orderMap = {};
 
      Object.keys(quiz).forEach((key) => {
        orderArray.push(quiz[key].order);
        orderMap[quiz[key].order] = {
          current: key
        };
      });

      orderArray = orderArray.sort();
      orderArray.forEach((order, index) => {
        if (index > 0) {
          orderMap[order].prev = orderMap[orderArray[index - 1]].current;
        } else {
          orderMap[order].prev = "";
        }
        if (index < orderArray.length - 1) {
          orderMap[order].next = orderMap[orderArray[index + 1]].current;
        } else {
          orderMap[order].next = "";
        }
      });

      if (id === "new") {
        return (
          <QuizAdd quiz={this.state.quiz} />
        );
      }

      if (id === "edit") {
        return (
          <QuizListEdit quiz={this.state.quiz} answer={this.state.answer} />
        );
      }

      if (quiz[id]) {

        if (action === "edit") {
          return (
            <section key={id}>
              <QuizView 
                prev={orderMap[quiz[id].order].prev} 
                next={orderMap[quiz[id].order].next} 
                answer={answer[id]} {...quiz[id]} 
              />
              <QuizEdit answer={answer[id]} {...quiz[id]} />
            </section>
          );

        } else {
          return (
            <section key={id} className="Quiz">
              <QuizView 
                prev={orderMap[quiz[id].order].prev} 
                next={orderMap[quiz[id].order].next} 
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
              {/*<NavLink to="/login" className="item">Login</NavLink>*/}
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
