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
import ReportPage from './containers/ReportPage'
import Header from './components/Header'
import Footer from './components/Footer'

const HomePage = () => (
  <section className='ui basic center aligned very padded segment'>
    <h1 className='ui header'>我的公司合法嗎？趕快來看 ᕕ ( ᐛ ) ᕗ</h1>
    <hr className='ui hidden divider' />
    <p>大公司人資、小公司老闆、廣大的勞工、所有站在勞資關係第一線的苦主～</p>
    <p>勞基法一下改過來、一下改過去，搞得你暈頭轉向嗎？不知道算白話文還文言文的法條文字，讓你無所適從嗎？歷經一年多開發，法律麻瓜的救星——勞基法掃描器——終於姍姍來遲了！ㄜ... 坦白說，這種工程師悶著頭自幹的外行狗食，也沒什麼好讓人放心的 =.= 但就加減參考看看吧，聊勝於無啦 :Q</p>
    <hr className='ui hidden divider' />
    <hr className='ui hidden divider' />
    <Link to={`/${StepData.basic[0]}`} className='ui teal button'>
      開始
      <i className='icon right chevron' style={{marginLeft: '1rem', marginRight: '-0.5rem'}} ></i>
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
        <Footer />
      </section>
    </Router>
  )
}

export default Root
