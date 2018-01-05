import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect
} from 'react-router-dom'

import QuizPage from './containers/QuizPage'

const App = () => (
  <Router basename='/llscanner'>
    <QuizPage />
  </Router>
)

export default App
