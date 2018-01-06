import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect
} from 'react-router-dom'
import {HashLink as Link} from 'react-router-hash-link'

import StepData from './data/StepData'
import QuizPage from './containers/QuizPage'
import Header from './components/Header'

const HomePage = () => (
  <section>
    <p>welcome</p>
    <Link to={`/${StepData[0]}`} className='ui button'>
    start
    </Link>
  </section>
)

const ReportPage = () => (<p>report</p>)

const QuizApp = ({ match: {params} }) => (
  <QuizPage quizID={params.quizID} />
)

const Root = (store) => (
  <Router basename='/llscanner'>
    <section>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/report' component={ReportPage} />
        <Route path='/:quizID?' component={QuizApp} />
      </Switch>
    </section>
  </Router>
)

export default Root
