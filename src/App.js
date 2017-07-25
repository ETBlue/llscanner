import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect
} from 'react-router-dom'
import {HashLink as Link} from 'react-router-hash-link'

import firebase from 'firebase'
import firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

import { Sidebar, Segment } from 'semantic-ui-react'

import _parseArticleID from './_shared/_parseArticleID'
import EditButton from './_shared/EditButton'

import AnswerView from './answer/AnswerView'

import _laws from './law/_laws'
import LawList from './law/LawList'
import ArticleList from './law/ArticleList'
import ArticleView from './law/ArticleView'
import ArticleEdit from './law/ArticleEdit'

import StepList from './step/StepList'
import StepListEdit from './step/StepListEdit'
import StepView from './step/StepView'
import StepEdit from './step/StepEdit'

import _evaluateCondition from './answer/_evaluateCondition'

import QuizList from './quiz/QuizList'
import QuizListEdit from './quiz/QuizListEdit'
import QuizView from './quiz/QuizView'
import QuizEdit from './quiz/QuizEdit'

import logo from './logo.svg'
import messegerMascot from './g0v-jian.jpg'
import apologizingMascot from './g0v-jian-jp.jpg'
import './App.css'

class App extends Component {
  constructor () {
    super()

    this.state = {
      quiz: {},
      route: {},
      precondition: {},

      step: [],
      order: {},
      first: null,

      law: {},
      answer: {},

      authenticated: false,
      user: {},
      answerOwner: 'public',

      showSidebar: false,
      showModal: false,
    }

    this.ui =  new firebaseui.auth.AuthUI(firebase.auth())

    this._compileStep = this._compileStep.bind(this)
    this._getLawObject = this._getLawObject.bind(this)
    this._toggleSidebar = this._toggleSidebar.bind(this)
    this._signOut = this._signOut.bind(this)
    this._showModal = this._showModal.bind(this)
    this._hideModal = this._hideModal.bind(this)
  }

  componentWillMount () {

    const uiConfig = {
      callbacks: {
        // Called when the user has been successfully signed in.
        signInSuccess: function(user, credential, redirectUrl) {
          // Do not redirect.
          return false;
        },
      },
      //singInSuccessUrl: "/welcome",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //firebase.auth.GithubAuthProvider.PROVIDER_ID,
        //firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      tosUrl: "/"
    };

    firebase.auth().onAuthStateChanged((user) => {

      if (user) {

        this.ui.reset();

        this.setState((prevState, props) => {

          prevState.authenticated = true
          prevState.user = {
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            photoURL: user.photoURL,
            uid: user.uid,
            phoneNumber: user.phoneNumber,
            providerData: user.providerData,
            accessToken: user.getToken().then((accessToken) => accessToken)
          }
          prevState.answerOwner = user.uid

          return prevState
        })

        firebase.database().ref(`answer/${user.uid}`).on('value', snapshot => {

          this.setState((prevState, props) => {

            if (snapshot.val()) {
              prevState.answer = snapshot.val()
            } else {
              firebase.database().ref(`answer/${user.uid}`).set({placeholder: 'true'})
            }

            prevState = this._compileStep(prevState)
            return prevState
          })

        }, (error) => {
          console.log(error)
        })

      } else {

        this.ui.start('.auth', uiConfig);

        this.setState((prevState, props) => {

          prevState.authenticated = false
          prevState.user = {}
          prevState.answerOwner = 'public'

          return prevState
        })

        firebase.database().ref(`answer/public`).on('value', snapshot => {

          this.setState((prevState, props) => {

            if (snapshot.val()) {
              prevState.answer = snapshot.val()
            } else {
              firebase.database().ref(`answer/public`).set({placeholder: 'true'})
            }

            prevState = this._compileStep(prevState)
            return prevState
          })

        }, (error) => {
          console.log(error)
        })
      }

    })

    firebase.database().ref('quiz').on('value', snapshot => {
      this.setState((prevState, props) => {

        const quiz = snapshot.val()
        Object.keys(quiz).forEach((quiz_id) => {
          prevState.route[ quiz_id ] = quiz[ quiz_id ].route
          prevState.precondition[ quiz_id ] = quiz[ quiz_id ].precondition
        })
        prevState.quiz = quiz

        return prevState
      })
    })

    firebase.database().ref('step').on('value', snapshot => {
      this.setState((prevState, props) => {
        prevState.step = snapshot.val()

        prevState = this._compileStep(prevState)
        return prevState
      })
    })

    firebase.database().ref('law').on('value', snapshot => {
      this.setState((prevState, props) => {
        prevState.law = snapshot.val()
        return prevState
      })
    })

  }

  _compileStep (prevState) {

    prevState.first = null

    const quiz = prevState.quiz
    const step = prevState.step

    let prev = null

    step.forEach((item, index) => {
      if (quiz[item]) {

        if (!prevState.precondition[item] || (prevState.precondition[item] && _evaluateCondition(prevState.precondition[item], prevState.answer).result !== 'failed')) {

          if (!prevState.first) {
            prevState.first = item
          }
          if (prev) {
            prevState.order[prev].next = item
          }
          prevState.order[item] = {
            prev: prev
          }
          if (index === step.length - 1) {
            prevState.order[item].next = null
          }
          prev = item

        } else {
          if (index === step.length - 1) {
            prevState.order[prev].next = null
          }
        }

      } else {
        if (index === step.length - 1) {
          prevState.order[prev].next = null
        }
      }
    })

    return prevState

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

  _toggleSidebar () {

    this.setState((prevState, props) => {
      prevState.showSidebar = !prevState.showSidebar
      return prevState
    })

  }

  _signOut () {

    firebase.auth().signOut()

  }

  _showModal () {

    this.setState((prevState, props) => {
      prevState.showModal = true
      return prevState
    })

  }

  _hideModal () {

    this.setState((prevState, props) => {
      prevState.showModal = false
      return prevState
    })

  }

  render () {

    const quiz = this.state.quiz
    const route = this.state.route
    const precondition = this.state.precondition

    const step = this.state.step
    const order = this.state.order
    const first = this.state.first

    const law = this.state.law
    const answer = this.state.answer

    const authenticated = this.state.authenticated
    const user = this.state.user
    const answerOwner = this.state.answerOwner

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

    const profileJSX = !authenticated ? null :
      <div className='ui inverted grey basic marginless segment'>
        <div className='ui bordered tiny circular image'
          style={{border: "2px solid #fff"}}
        >
          <img src={user.photoURL} alt='avatar' />
        </div>
        <p>
          {user.displayName}
        </p>
        <button className='ui fluid small basic inverted button'
          onClick={this._signOut}
        >
          <i className='icon sign out' />
          登出
        </button>
      </div>

    const loginButtonJSX = authenticated ? null :
      <div className='ui inverted grey basic marginless segment'>
        <button className='ui fluid small basic inverted button'
          onClick={this._showModal}
        >
          <i className='icon sign in' />
          登入
        </button>
      </div>

    const bugReportJSX = (
      <section>
        <img className='ui centered medium image' src={apologizingMascot} />
        <p>你看得到這頁，表示我 bug 了！請把目前的網址貼給開發者。。。</p>
        <p>
          <a className='ui small icon labeled button'
            href='https://github.com/ETBlue/llscanner/issues/new'
            target='_blank'
          >
            <i className='icon github' />
            回報 bug 去（需 GitHub 帳號）
          </a>
        </p>
      </section>
    )

    const requireAuthJSX = (
      <section>
        <img className='ui centered medium image' src={messegerMascot} />
        <p>哈咤～～你需要登入才能編輯喔！</p>
        <p>
          <button className='ui small icon labeled button'
            onClick={this._showModal}
          >
            <i className='icon sign in' />
            登入
          </button>
        </p>
      </section>
    )

    const HomePage = () => {

      const quiz_id = first

      return (
        <section className='Quiz'>
          <QuizView
            quizData={quiz[quiz_id]}
            orderData={order[quiz_id]}
            routeData={route[quiz_id]}
            answerData={answer[quiz_id]}
            answerOwner={answerOwner}
          />
          {authenticated ?
          <EditButton 
            link={`/quiz/${quiz_id}/edit`} 
          /> : null
          }
        </section>
      )
    }

    const QuizPage = ({ quiz_id, action }) => {

      if (!quiz_id) {
        return (
          <QuizList
            quiz={quiz}
            step={step}
            authenticated={authenticated}
          />
        )
      }

      if (quiz_id === 'edit' && !authenticated) {
        return requireAuthJSX
      }

      if (quiz_id === 'edit' && authenticated) {
        return (
          <QuizListEdit
            quiz={quiz}
          />
        )
      }

      if (!quiz[quiz_id]) {
        return (
          <section>
            <img className='ui centered medium image' src={messegerMascot} />
            <p>哈咤～～題庫裡沒有<span className='code'>{quiz_id}</span>這一筆！</p>
            <p>
              <Link className='ui icon labeled mini button' to='/quiz/'>
                <i className='left arrow icon' />
                回測驗題列表
              </Link>
            </p>
          </section>
        )
      }

      if (!action && 
        precondition[quiz_id] && 
        _evaluateCondition(precondition[quiz_id], answer).result === 'failed') {
        if (order[quiz_id] && order[quiz_id].next) {
          return (
            <Redirect to={`/quiz/${order[quiz_id].next}/`}/>
          )
        } else {
          return (
            <Redirect to={`/answer/`}/>
          )
        }
      }

      if (!action || action !== 'edit') {
        return (
          <section className='Quiz'>
            <QuizView
              quizData={quiz[quiz_id]}
              orderData={order[quiz_id]}
              routeData={route[quiz_id]}
              answerData={answer[quiz_id]}
              answerOwner={answerOwner}
            />
            {authenticated ?
              <EditButton 
                link={`/quiz/${quiz_id}/edit`} 
              /> : null
            }
          </section>
        )
      }

      if (!authenticated) {
        return requireAuthJSX
      }

      if (authenticated) {
        return (
          <section className='Quiz'>
            <QuizView
              quizData={quiz[quiz_id]}
              orderData={order[quiz_id]}
              routeData={route[quiz_id]}
              answerData={answer[quiz_id]}
              answerOwner={answerOwner}
            />
            <QuizEdit quizData={quiz[quiz_id]} />
          </section>
        )
      }

      return bugReportJSX

    }

    const StepPage = ({ step_id, action }) => {

      if (!step_id) {
        return (
          <StepList
            step={step}
            quiz={quiz}
            authenticated={authenticated}
          />
        )
      }

      if (step_id === 'edit' && !authenticated) {
        return requireAuthJSX
      }

      if (step_id === 'edit' && authenticated) {
        return (
          <StepListEdit
            step={step}
          />
        )
      }

      if (!step.includes(step_id)) {
        return (
          <section>
            <img className='ui centered medium image' src={messegerMascot} />
            <p>哈咤～～故事線裡沒有<span className='code'>{step_id}</span>這個步驟！</p>
            <p>
              <Link className='ui icon labeled mini button' to='/step/'>
                <i className='left arrow icon' />
                回故事線
              </Link>
            </p>
          </section>
        )
      }

      const stepIndex = step.indexOf(step_id)

      if (quiz && !quiz[step_id]) {
        firebase.database().ref(`quiz/${step_id}`).set({
          id: step_id,
          title: '',
          description: '',
          type: '',
        })
        return null
      }

      if (!action || action !== 'edit') {
        return (
          <section className='Step'>
            <StepView
              quizData={quiz[step_id]}
              quizID={step_id}
              stepIndex={stepIndex}
            />
            {authenticated ?
              <EditButton 
                link={`/step/${step_id}/edit`} 
              /> : null
            }
          </section>
        )
      }

      if (!authenticated) {
        return requireAuthJSX
      }

      if (authenticated) {
        return (
          <section className='Step'>
            <StepView
              quizData={quiz[step_id]}
              quizID={step_id}
              stepIndex={stepIndex}
            />
            <StepEdit
              quizData={quiz[step_id]}
              quizID={step_id}
              quizIDs={quizIDs}
              answerValues={answerValues}
            />
          </section>
        )
      }

      return bugReportJSX
    }

    const LawPage = ({law_id, article_id, action}) => {

      if (!law_id) {
        return <LawList laws={_laws}/>
      }

      const lawData = _laws[law_id]

      if (!lawData || !lawData.law_data) {
        return (
          <section>
            <img className='ui centered medium image' src={messegerMascot} />
            <p>哈咤～～這網站沒有<span className='code'>{law_id}</span>的資料！</p>
            <p>
              <Link className='ui icon labeled mini button' to='/law/'>
                <i className='left arrow icon' />
                回法規列表
              </Link>
            </p>
          </section>
        )
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

      if (!lawObject[article_id]) {
        return (
          <section>
            <img className='ui centered medium image' src={messegerMascot} />
            <p>哈咤～～<span className='code'>{law_id}</span>裡面沒有<span className='code'>{article_id}</span>這一條！</p>
            <p>
              <Link className='ui icon labeled mini button' to={`/law/${law_id}/`}>
                <i className='left arrow icon' />
                回{law_id}
              </Link>
            </p>
          </section>
        )
      }

      if (!action || action !== 'edit') {
        return (
          <section className='Article'>
            <ArticleView 
              lawID={law_id} 
              articleID={article_id} 
              articleData={lawObject[article_id]}
              ruleData={rulesData[article_id]} 
            />
            {authenticated ?
              <EditButton 
                link={'/law/' + law_id + '/' + article_id + '/edit'} 
              /> : null
            }
          </section>
        )
      }

      if (!authenticated) {
        return requireAuthJSX
      }

      if (authenticated) {
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

      return bugReportJSX
    }

    const AnswerPage = ({law_id}) => {

      if (!law_id || !_laws[law_id]) {
        return (
          <AnswerView
            answerData={answer}
            laws={_laws}
            status='choose_law'
            quiz={quiz}
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
          lawID={law_id}
          status='view_result'
          quiz={quiz}
        />
      )

    }

    return (

      <Router basename='/llscanner'>

          <Sidebar.Pushable className='App'>

            <section className='ui dimmer modals visible active' style={this.state.showModal ? {'zIndex': '1000', 'opacity': '1'} : {'zIndex': '-1', 'opacity': '0'} } onClick={this._hideModal}>
              <div className='auth ui modal visible active' />
            </section>

            <Sidebar as={Segment}
              animation='push'
              direction='right'
              visible={this.state.showSidebar}
              color='grey'
              inverted={true}
              basic={true}
              style={{padding: "1rem 0"}}
            >

              {profileJSX}
              {loginButtonJSX}

              <nav className='ui basic fluid vertical grey inverted menu'>
                <NavLink exact to='/' className='item'
                  onClick={this._toggleSidebar}
                >
                  首頁
                </NavLink>
                <NavLink to='/quiz/' className='item'
                  onClick={this._toggleSidebar}
                >
                  測驗題
                </NavLink>
                <NavLink to='/step/' className='item'
                  onClick={this._toggleSidebar}
                >
                  故事線
                </NavLink>
                <NavLink to='/law/' className='item'
                  onClick={this._toggleSidebar}
                >
                  掃描規則
                </NavLink>
                <NavLink to='/answer/' className='item'
                  onClick={this._toggleSidebar}
                >
                  我的答案
                </NavLink>
              </nav>

            </Sidebar>

            <Sidebar.Pusher>

              <header className='App-header ui center aligned basic inverted black segment'>

                <div className='ui right floated black icon button'
                  onClick={this._toggleSidebar}
                  >
                  <i className='sidebar icon' />
                </div>

                <h1 className='ui inverted marginless header'>
                  <img src={logo} className='App-logo ui image' alt='logo' />
                  <div className='content'>
                  勞基法掃描器
                  <span className='ui horizontal black label'>開發到一半預覽版</span>
                  </div>
                </h1>

              </header>

              <div className='App-body'>
                <Switch>
                  <Route exact path='/' render={HomePage} />
                  <Route path='/quiz/:quiz_id?/:action?' render={({match}) => QuizPage(match.params)} />
                  <Route path='/answer/:law_id?' render={({match}) => AnswerPage(match.params)} />
                  <Route path='/step/:step_id?/:action?' render={({match}) => StepPage(match.params)} />
                  <Route path='/law/:law_id?/:article_id?/:action?' render={({match}) => LawPage(match.params)} />
                  <Route path='/:endpoint' render={({match}) => <p>{match.params.endpoint} page is not found</p>} />
                </Switch>
              </div>

            </Sidebar.Pusher>

          </Sidebar.Pushable>

      </Router>
    )
  }

  componentWillUnmount () {
    this.firebaseData.off()
  }
}

export default App
