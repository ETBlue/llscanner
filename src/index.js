import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import app from './reducers'

//import ReactDOM from 'react-dom'
//import App from './App'
import 'semantic-ui-css/semantic.min.css'
//import './index.css'
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

let store = createStore(app)

store.subscribe(() =>
  console.log(store.getState())
)

render(
  <Provider store={store}>
    <Root />
  </Provider>
  ,
  document.getElementById('root')
)
