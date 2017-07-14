import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from 'react-router-dom'
import firebase from 'firebase'

import _parseArticleID from './_shared/_parseArticleID'
import EditButton from './_shared/EditButton'

import AnswerList from './answer/AnswerList'
import AnswerView from './answer/AnswerView'

import _laws from './law/_laws'
import LawList from './law/LawList'
import ArticleList from './law/ArticleList'
import ArticleView from './law/ArticleView'
import ArticleEdit from './law/ArticleEdit'

import StepList from './step/StepList'
import StepListEdit from './step/StepListEdit'
import StepAdd from './step/StepAdd'
import StepView from './step/StepView'
import StepEdit from './step/StepEdit'

import QuizList from './quiz/QuizList'
import QuizListEdit from './quiz/QuizListEdit'
import QuizAdd from './quiz/QuizAdd'
import QuizView from './quiz/QuizView'
import QuizEdit from './quiz/QuizEdit'

import logo from './logo.svg'
import './App.css'

class App extends Component {
  constructor () {
    super()

    this.state = {
      quiz: {},

      step: {},
      order: {},
      route: {},
      condition: {},

      law: {},
      answer: {},
      first: '',
    }

    this._getLawObject = this._getLawObject.bind(this)
  }

  componentWillMount () {
    const data = firebase.database().ref()

    data.on('value', snapshot => {
      this.setState((prevState, props) => {

        const step = snapshot.val().step
        const list = Object.keys(step)
        list.forEach((key, index) => {
          prevState.order[ step[ key ].quiz ] = {
            id: key,
            current: step[ key ].quiz,
            prev: index > 0 ? step[ list[ index - 1 ] ].quiz : '',
            next: index < list.length - 1 ? step[ list[ index + 1 ] ].quiz : ''
          }
          prevState.route[ step[ key ].quiz ] = step[ key ].route
          prevState.condition[ step[ key ].quiz ] = step[ key ].condition
        })
        prevState.first = step[ list[ 0 ] ].quiz

        return {
          quiz: snapshot.val().quiz,

          step: step,
          order: prevState.order,
          route: prevState.route,
          condition: prevState.condition,

          law: snapshot.val().law,
          answer: snapshot.val().answer,
          first: prevState.first
        }
      })
    })
  }

  _getLawObject (lawData) {

    let lawObject = {}

    if (lawData && lawData.law_data) {
      lawData.law_data.forEach((entry) => {
        if (!entry.rule_no) {
          return
        }
        lawObject[_parseArticleID(entry.rule_no)] = entry
      })
    }

    return lawObject

  }

  render () {
    const quiz = this.state.quiz

    const step = this.state.step
    const order = this.state.order
    const route = this.state.route
    const condition = this.state.condition

    const law = this.state.law
    const answer = this.state.answer

    // generate new step id, used by both quizadd and stepadd
    const stepIDs = Object.keys(step).map((id) => {
      return parseInt(id, 10)
    })
    const newStepID = Math.max(...stepIDs) + 10

    // collect quiz ids and answer values for step validation
    let quizIDs = []
    let answerValues = []
    Object.keys(quiz).forEach((id) => {
      quizIDs.push(id)
      if (quiz[id].type === 'select') {
        if (quiz[id].option) {
          Object.keys(quiz[id].option).forEach((optionID) => {
            const ans = quiz[id].option[optionID].value
            if (ans.length > 0) {
              answerValues.push(ans)
            }
          })
        }
      }
    })

    const HomePage = () => {

      const id = this.state.first
      return (
        <section className='Quiz'>
          <QuizView
            {...quiz[id]}
            order={order[id]}
            route={route[id]}
            condition={condition[id]}
            answer={answer[id]}
          />
          <EditButton 
            link={'/quiz/' + id + '/edit'} 
          />
        </section>
      )
    }

    const AnswerPage = ({answer_id, law_id}) => {

      if (!answer_id || answer_id !== "testdata") {
        return (
          <AnswerList
          />
        )
      }

      if (answer_id && !law_id) {

        return (

          <AnswerView
            answerData={answer}
            laws={_laws}
            answerID={answer_id}
            status='choose_law'
          />

        )
      }

      const lawObject = this._getLawObject(_laws[law_id])

      return (

        <AnswerView
          answerData={answer}
          laws={_laws}
          law={law}
          lawObject={lawObject}
          answerID={answer_id}
          lawID={law_id}
          status='view_result'
        />
      )

    }

    const LawPage = ({law_id, article_id, action}) => {

      const lawData = _laws[law_id]
      if (!law_id || !lawData || !lawData.law_data) {
        return <LawList laws={_laws}/>
      }

      const lawObject = this._getLawObject(lawData)

      const rulesData = law[law_id] || []

      if (!article_id) {
        return (
          <ArticleList 
            lawData={lawData} 
            rulesData={rulesData}
          />
        )
      }

      if (article_id && !action) {
        return (
          <section className='Article'>
            <ArticleView 
              lawID={law_id} 
              articleID={article_id} 
              articleData={lawObject[article_id]}
              ruleData={rulesData[article_id]} 
            />
            <EditButton 
              link={'/law/' + law_id + '/' + article_id + '/edit'} 
            />
          </section>
        )
      }

      if (article_id && action === 'edit') {
        return (
          <section className='Article'>
            <ArticleView 
              lawID={law_id} 
              articleID={article_id} 
              articleData={lawObject[article_id]}
              ruleData={rulesData[article_id]} 
            />
            <ArticleEdit 
              lawID={law_id} 
              articleID={article_id} 
              ruleData={rulesData[article_id]} 
              quizIDs={quizIDs}
            />
          </section>
        )
      }

      return <LawList laws={_laws}/>

    }

    const StepPage = ({ step_id, action }) => {

      if (!step_id) {
        return (
          <StepList
            step={step}
            quiz={quiz}
          />
        )
      }

      if (step_id === 'edit') {
        return (
          <StepListEdit
            step={step}
            quiz={quiz}
          />
        )
      }

      if (step_id === 'new') {
        return (
          <StepAdd
            step={step}
            quiz={quiz}
            stepID={newStepID}
            quizIDs={quizIDs}
          />
        )
      }

      if (step[step_id] && !action) {
        return (
          <section className='Step'>
            <StepView
              stepData={step[step_id]}
              quizData={quiz[step[step_id].quiz]}
            />
            <EditButton 
              link={'/step/' + step_id + '/edit'} 
            />
          </section>
        )
      }

      if (step[step_id] && action === 'edit') {
        return (
          <section className='Step'>
            <StepView
              stepData={step[step_id]}
              quizData={quiz[step[step_id].quiz]}
            />
            <StepEdit
              stepData={step[step_id]}
              quizIDs={quizIDs}
              answerValues={answerValues}
            />
          </section>
        )
      }

      return (
        <StepList
          step={step}
          quiz={quiz}
        />
      )
    }

    const QuizPage = ({ quiz_id, action }) => {

      if (quiz_id === 'new') {
        return (
          <section className='Quiz'>
            <div className='ui marginless basic segment'>
              <h2 className='ui header'>新增測驗題</h2>
            </div>
            <QuizAdd
              quiz={quiz}
              stepID={newStepID}
            />
          </section>
        )
      }

      if (quiz_id === 'edit') {
        return (
          <QuizListEdit
            quiz={quiz}
            answer={answer}
            step={step}
            order={order}
          />
        )
      }

      if (quiz[quiz_id]) {
        if (action === 'edit') {
          return (
            <section className='Quiz'>
              <QuizView
                {...quiz[quiz_id]}
                order={order[quiz_id]}
                route={route[quiz_id]}
                condition={condition[quiz_id]}
                answer={answer[quiz_id]}
              />
              <QuizEdit {...quiz[quiz_id]} />
            </section>
          )
        } else {
          return (
            <section className='Quiz'>
              <QuizView
                {...quiz[quiz_id]}
                order={order[quiz_id]}
                route={route[quiz_id]}
                condition={condition[quiz_id]}
                answer={answer[quiz_id]}
              />
              <EditButton 
                link={'/quiz/' + quiz_id + '/edit'} 
              />
            </section>
          )
        }
      }

      return (
        <QuizList quiz={quiz} />
      )
    }

    return (

      <Router basename='/llscanner'>

        <div className='App'>

          <header className='App-header ui center aligned basic inverted segment'>
            <h1 className='ui inverted header'>
              <img src={logo} className='App-logo ui image' alt='logo' />
              <div className='content'>
              Labor Laws Scanner
              <span className='ui horizontal black label'>alpha</span>
              </div>
            </h1>
            <nav className='ui inverted compact secondary pointing menu'>
              <NavLink exact to='/' className='item'>Home</NavLink>
              <NavLink to='/quiz' className='item'>Quiz</NavLink>
              <NavLink to='/step' className='item'>Step</NavLink>
              <NavLink to='/law' className='item'>Law</NavLink>
              <NavLink to='/answer' className='item'>Answer</NavLink>
              {/* <NavLink to="/login" className="item">Login</NavLink> */}
            </nav>
          </header>

          <div className='App-body'>
            <Switch>
              <Route exact path='/' render={HomePage} />
              <Route path='/quiz/:quiz_id?/:action?' render={({match}) => QuizPage(match.params)} />
              <Route path='/answer/:answer_id?/:law_id?' render={({match}) => AnswerPage(match.params)} />
              <Route path='/step/:step_id?/:action?' render={({match}) => StepPage(match.params)} />
              <Route path='/law/:law_id?/:article_id?/:action?' render={({match}) => LawPage(match.params)} />
              <Route path='/:endpoint' render={({match}) => <p>{match.params.endpoint} page is not found</p>} />
              {/* <Route path="/login" render={() => <div className="auth"></div>} />
                          */}
            </Switch>
          </div>
        </div>
      </Router>
    )
  }

  componentWillUnmount () {
    this.firebaseData.off()
  }
}

export default App
