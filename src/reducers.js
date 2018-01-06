import { combineReducers } from 'redux'

import {
  // actions
  LOGIN,
  LOGOUT,
  SET_ANSWER,
//  SET_VIEW,
  SET_DATA,
  // constants
//  ViewTypes,
  DataTypes,
  EditTypes,
} from './actions'

function user(state = null, action) {
  switch (action.type) {
    case LOGIN:
      return action.userID
    case LOGOUT:
      return null
    default:
      return state
  }
}

function answer(state = {}, action) {
  switch (action.type) {
    case SET_ANSWER:
      return Object.assign({}, state, {
        [action.contentID]: action.content
      })
    default:
      return state
  }
}

//function view(state = ViewTypes.HOME, action) {
//  switch (action.type) {
//    case SET_VIEW:
//      return action.viewType
//    default:
//      return state
//  }
//}

function data(state = null, action) {
  switch (action.type) {
    case SET_DATA:
      return action.dataType
    default:
      return state
  }
}

function id(state = null, action) {
  switch (action.type) {
//    case SET_VIEW:
    case SET_DATA:
      return action.contentID
    default:
      return state
  }
}

function subID(state = null, action) {
  switch (action.type) {
//    case SET_VIEW:
    case SET_DATA:
      return action.contentSubID
    default:
      return state
  }
}

function subSubID(state = null, action) {
  switch (action.type) {
//    case SET_VIEW:
    case SET_DATA:
      return action.contentSubSubID
    default:
      return state
  }
}

function content(state = null, action) {
  switch (action.type) {
    case SET_DATA:
      return action.content
    default:
      return state
  }
}

const app = combineReducers({
//  viewType: view,
  dataType: data,
  contentID: id,
  contentSubID: subID,
  contentSubSubID: subSubID,
  content: content,
  userID: user,
  answer: answer,
})

export default app
