import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import * as reducers from './reducers'

//import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
//import * as firebase from 'firebase'

//const config = {
//  apiKey: 'AIzaSyClANd-6brCZyuqnDgW79bON4HUK9yyOys',
//  authDomain: 'labor-laws-scanner.firebaseapp.com',
//  databaseURL: 'https://labor-laws-scanner.firebaseio.com',
//  storageBucket: 'labor-laws-scanner.appspot.com',
//  messagingSenderId: '745920819067'
//}
//firebase.initializeApp(config)

import Root from './Root'

const history = createHistory()
const middleware = routerMiddleware(history)
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

//store.subscribe(() =>
//  console.log(store.getState())
//)

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Root />
    </ConnectedRouter>
  </Provider>
  ,
  document.getElementById('root')
)
