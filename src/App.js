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
      path: {},
      order: {},
      route: {},
      condition: {},
      // quizOrder: {},
      first: "",
      answer: {},
    };
  }

  componentWillMount() {

    const data = firebase.database().ref();

    data.on('value', snapshot => {

      this.setState((prevState, props) => {

        const quiz = snapshot.val().quiz;
        const path = snapshot.val().path;

        const list = Object.keys(path);
        list.forEach((key, index) => {
          prevState.order[path[key].quiz] = {
            id: key,
            current: path[key].quiz,
            prev: index > 0 ? path[ list[index - 1]].quiz : "",
            next: index < list.length - 1 ? path[ list[index + 1]].quiz : "",
          };
          prevState.route[path[key].quiz] = path[key].route;
          prevState.condition[path[key].quiz] = path[key].condition;
        });
        prevState.first = path[list[0]].quiz;

//        let orderArray = [];
//        Object.keys(quiz).forEach((key) => {
//          orderArray.push(quiz[key].order);
//          prevState.quizOrder[quiz[key].order] = {
//            current: key
//          };
//        });
//
//        orderArray = orderArray.sort();
//        orderArray.forEach((order, index) => {
//          if (index > 0) {
//            prevState.quizOrder[order].prev = prevState.quizOrder[orderArray[index - 1]].current;
//          } else {
//            prevState.quizOrder[order].prev = "";
//            prevState.first = prevState.quizOrder[order].current;
//          }
//          if (index < orderArray.length - 1) {
//            prevState.quizOrder[order].next = prevState.quizOrder[orderArray[index + 1]].current;
//          } else {
//            prevState.quizOrder[order].next = "";
//          }
//        });

        return {
          quiz: quiz,
          path: path,
          order: prevState.order,
          route: prevState.route,
          condition: prevState.condition,
          answer: snapshot.val().answer,
          first: prevState.first,
          //quizOrder: prevState.quizOrder,
        };
      });
    });
  }

  render() {

    const HomePage = () => {

      const id = this.state.first;

      const quiz = this.state.quiz;
      const order = this.state.order;
      const route = this.state.route;
      const condition = this.state.condition;
      const answer = this.state.answer;

      return (
        <section className="Quiz">
          <QuizView 
            {...quiz[id]} 
            order={order[id]} 
            route={route[id]} 
            condition={condition[id]} 
            answer={answer[id]} 
          />
          <Link to={"/quiz/" + id + "/edit"} className="ui mini icon button" >
            <i className="icon pencil" />
          </Link>
        </section>
      );
    }

    const QuizPage = (params) => {

      const id = params.id;
      const action = params.action;

      const quiz = this.state.quiz;
      const order = this.state.order;
      const route = this.state.route;
      const condition = this.state.condition;
      const answer = this.state.answer;

      if (id === "new") {
        return (
          <QuizAdd quiz={quiz} />
        );
      }

      if (id === "edit") {
        return (
          <QuizListEdit quiz={quiz} />
        );
      }

      if (quiz[id]) {

        if (action === "edit") {
          return (
            <section key={id}>
              <QuizView 
                {...quiz[id]} 
                order={order[id]} 
                route={route[id]} 
                condition={condition[id]} 
                answer={answer[id]} 
              />
              <QuizEdit {...quiz[id]} />
            </section>
          );

        } else {
          return (
            <section key={id} className="Quiz">
              <QuizView 
                {...quiz[id]} 
                order={order[id]} 
                route={route[id]} 
                condition={condition[id]} 
                answer={answer[id]} 
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
