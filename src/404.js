import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import * as firebase from 'firebase';
//import firebaseui from 'firebaseui';
//import 'firebaseui/dist/firebaseui.css';

const config = {
  apiKey: "AIzaSyClANd-6brCZyuqnDgW79bON4HUK9yyOys",
  authDomain: "labor-laws-scanner.firebaseapp.com",
  databaseURL: "https://labor-laws-scanner.firebaseio.com",
  storageBucket: "labor-laws-scanner.appspot.com",
  messagingSenderId: "745920819067"
};
firebase.initializeApp(config);

//const uiConfig = {
//  singInSuccessUrl: "success",
//  signInOptions: [
//    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//    firebase.auth.EmailAuthProvider.PROVIDER_ID
//  ],
//  tosUrl: "/"
//};
//let ui = new firebaseui.auth.AuthUI(firebase.auth());
//ui.start('.auth', uiConfig);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
