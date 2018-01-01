import { combineReducers } from 'redux'

import {
  // actions
  LOGIN,
  LOGOUT,
  SET_ANSWER,
  SET_VIEW,
  SET_DATA,
  // constants
  ViewTypes,
  DataTypes,
  EditTypes,
} from './actions'

function user(state = null, action) {
  switch (action.type) {
    case LOGIN:
      return action.userId
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
        [action.contentId]: action.content
      })
    default:
      return state
  }
}

function view(state = ViewTypes.HOME, action) {
  switch (action.type) {
    case SET_VIEW:
      return action.viewType
    default:
      return state
  }
}

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
    case SET_VIEW:
      return action.contentId
    case SET_DATA:
      return action.contentId
    default:
      return state
  }
}

function subId(state = null, action) {
  switch (action.type) {
    case SET_VIEW:
      return action.contentSubId
    case SET_DATA:
      return action.contentSubId
    default:
      return state
  }
}

function subSubId(state = null, action) {
  switch (action.type) {
    case SET_VIEW:
      return action.contentSubSubId
    case SET_DATA:
      return action.contentSubSubId
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
  viewType: view,
  dataType: data,
  contentId: id,
  contentSubId: subId,
  contentSubSubId: subSubId,
  content: content,
  userId: user,
  answer: answer,
})

export default app
