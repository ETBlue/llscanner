import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  NavLink
} from 'react-router-dom';
import firebase from 'firebase';

import ArticleList from './law/ArticleList';
import LawList from './law/LawList';

import 勞動基準法 from './law/json/勞動基準法.json';
import 勞資爭議處理法 from './law/json/勞資爭議處理法.json';
import 大量解僱勞工保護法 from './law/json/大量解僱勞工保護法.json';
import 工會法 from './law/json/工會法.json';
import 船員法 from './law/json/船員法.json';
import 高級中等學校建教合作實施及建教生權益保障法 from './law/json/高級中等學校建教合作實施及建教生權益保障法.json';

import StepList from './step/StepList';
import StepListEdit from './step/StepListEdit';
import StepAdd from './step/StepAdd';
import StepView from './step/StepView';
import StepEdit from './step/StepEdit';

import QuizList from './quiz/QuizList';
import QuizListEdit from './quiz/QuizListEdit';
import QuizAdd from './quiz/QuizAdd';
import QuizView from './quiz/QuizView';
import QuizEdit from './quiz/QuizEdit';

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

    const quiz = this.state.quiz;
    const step = this.state.step;
    const order = this.state.order;
    const route = this.state.route;
    const condition = this.state.condition;
    const answer = this.state.answer;

    // generate new step id, used by both quizadd and stepadd
    const stepIDs = Object.keys(step).map((id) =>{
      return parseInt(id, 10);
    });
    const newStepID = Math.max( ...stepIDs ) + 10;

    const HomePage = () => {

      const id = this.state.first;
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

    const LawPage = (params) => {

      const id = params.id;
      const law = {
        勞動基準法: 勞動基準法,
        勞資爭議處理法: 勞資爭議處理法,
        大量解僱勞工保護法: 大量解僱勞工保護法,
        工會法: 工會法,
        船員法: 船員法,
        高級中等學校建教合作實施及建教生權益保障法: 高級中等學校建教合作實施及建教生權益保障法,
      };

      if (id) {
        return (
          <ArticleList
            lawData={law[id]} 
          />
        );
      } else {
        return (
          <LawList
            law={law} 
          />
        );
      }
    }
    const StepPage = (params) => {

      const id = params.id;
      const action = params.action;

      // collect quiz ids and answer values for step validation
      let quizIDs = [];
      let answerValues = [];
      Object.keys(quiz).forEach((id) => {
        quizIDs.push(id);
        if (quiz[id].type === "select") {
          if (quiz[id].option) {
            Object.keys(quiz[id].option).forEach((optionID) => {
              const ans = quiz[id].option[optionID].value;
              if (ans.length > 0) {
                answerValues.push(ans);
              }
            });
          }
        }
      });

      if (id === "new") {
        return (
          <StepAdd 
            step={step} 
            quiz={quiz} 
            stepID={newStepID} 
            quizIDs={quizIDs} 
          />
        );
      }
      if (id === "edit") {
        return (
          <StepListEdit 
            step={step} 
            quiz={quiz} 
          />
        );
      }
      if (step[id]) {

        if (action === "edit") {
          return (
            <section key={id}>
              <StepView 
                stepData={step[id]} 
                quizData={quiz[step[id].quiz]}
              />
              <StepEdit 
                stepData={step[id]} 
                quizData={quiz[step[id].quiz]}
                quizIDs={quizIDs} 
                answerValues={answerValues} 
              />
            </section>
          );

        } else {
          return (
            <section key={id}>
              <StepView 
                stepData={step[id]} 
                quizData={quiz[step[id].quiz]}
              />
              <Link to={"/step/" + id + "/edit"} className="ui mini icon button" >
                <i className="icon pencil" />
              </Link>
            </section>
          );
        }
      }
      return (
        <StepList 
          step={step} 
          quiz={quiz} 
        />
      );
    }

    const QuizPage = (params) => {

      const id = params.id;
      const action = params.action;

      if (id === "new") {
        return (
          <QuizAdd 
            quiz={quiz} 
            stepID={newStepID} 
          />
        );
      }

      if (id === "edit") {
        return (
          <QuizListEdit 
            quiz={quiz} 
            answer={answer} 
            step={step} 
            order={order} 
          />
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
              <NavLink to="/law" className="item">Law</NavLink>
              <NavLink to="/answer" className="item">Answer</NavLink>
              {/*<NavLink to="/login" className="item">Login</NavLink>*/}
            </nav>
          </header>

          <div className="App-body">
            <Switch>
              <Route exact path="/" render={HomePage} />
              <Route path="/quiz/:id?/:action?" render={({match}) => QuizPage(match.params)} />
              <Route path="/answer" render={() => <p>answer</p>} />
              <Route path="/step/:id?/:action?" render={({match}) => StepPage(match.params)} />
              <Route path="/law/:id?" render={({match}) => LawPage(match.params)} />
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
