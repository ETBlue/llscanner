import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyClANd-6brCZyuqnDgW79bON4HUK9yyOys',
  authDomain: 'labor-laws-scanner.firebaseapp.com',
  databaseURL: 'https://labor-laws-scanner.firebaseio.com',
  storageBucket: 'labor-laws-scanner.appspot.com',
  messagingSenderId: '745920819067'
}
firebase.initializeApp(config)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
