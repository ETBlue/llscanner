import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  NavLink
} from 'react-router-dom';
import firebase from 'firebase';

import StepList from './step/StepList';

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
      step: {},
      order: {},
      route: {},
      condition: {},
      first: "",
      answer: {},
    };
  }

  componentWillMount() {

    const data = firebase.database().ref();

    data.on('value', snapshot => {

      this.setState((prevState, props) => {

        const quiz = snapshot.val().quiz;
        const step = snapshot.val().step;

        const list = Object.keys(step);
        list.forEach((key, index) => {
          prevState.order[step[key].quiz] = {
            id: key,
            current: step[key].quiz,
            prev: index > 0 ? step[ list[index - 1]].quiz : "",
            next: index < list.length - 1 ? step[ list[index + 1]].quiz : "",
          };
          prevState.route[step[key].quiz] = step[key].route;
          prevState.condition[step[key].quiz] = step[key].condition;
        });
        prevState.first = step[list[0]].quiz;

        return {
          quiz: quiz,
          step: step,
          order: prevState.order,
          route: prevState.route,
          condition: prevState.condition,
          answer: snapshot.val().answer,
          first: prevState.first,
        };
      });
    });
  }

  render() {

    const StepPage = () => {
      return (
        <StepList 
          step={this.state.step} 
        />
      );
    }
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
              <NavLink to="/step" className="item">Step</NavLink>
              <NavLink to="/answer" className="item">Answer</NavLink>
              {/*<NavLink to="/login" className="item">Login</NavLink>*/}
            </nav>
          </header>

          <div className="App-body">
            <Switch>
              <Route exact path="/" render={HomePage} />
              <Route path="/quiz/:id?/:action?" render={({match}) => QuizPage(match.params)} />
              <Route path="/answer" render={() => <p>answer</p>} />
              <Route path="/step" render={StepPage} />
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
