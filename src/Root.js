import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
//  NavLink,
//  Redirect
} from 'react-router-dom'
import {HashLink as Link} from 'react-router-hash-link'

import * as StepData from './data/StepData'
import QuizPage from './containers/QuizPage'
import Header from './components/Header'

const HomePage = () => (
  <section className='ui basic center aligned segment'>
    <h1 className='ui header'>某段歡迎標題</h1>
    <p>某段歡迎文字</p>
    <hr className='ui hidden divider' />
    <Link to={`/${StepData.basic[0]}`} className='ui icon labeled right button'>
      開始
      <i className='icon right chevron'></i>
    </Link>
  </section>
)

const ReportPage = () => (
  <section className='ui basic center aligned segment'>
    <h1 className='ui header'>掃描報告</h1>
    <p>某段敘述文字</p>
    <hr className='ui hidden divider' />
    <Link to={`/${StepData.basic[0]}`} className='ui icon labeled right button'>
      再玩一次
      <i className='icon right chevron'></i>
    </Link>
  </section>
)

const Root = () => {

  const QuizApp = ({ match: {params} }) => (
    <QuizPage quizID={params.quizID} />
  )

  return(
    <Router basename='/llscanner'>
      <section className='ui container'>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/report' component={ReportPage} />
          <Route path='/:quizID?' component={QuizApp} />
        </Switch>
      </section>
    </Router>
  )
}

export default Root
