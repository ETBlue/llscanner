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

function view(state = ViewTypes.HOME, action) {
  switch (action.type) {
    case SET_VIEW:
      return action.viewType
    default:
      return state
  }
}

function data(state = undefined, action) {
  switch (action.type) {
    case SET_DATA:
      return action.dataType
    default:
      return state
  }
}

function id(state = undefined, action) {
  switch (action.type) {
    case SET_VIEW:
      return action.contentId
    case SET_DATA:
      return action.contentId
    default:
      return state
  }
}

function subId(state = undefined, action) {
  switch (action.type) {
    case SET_VIEW:
      return action.contentSubId
    case SET_DATA:
      return action.contentSubId
    default:
      return state
  }
}

function subSubId(state = undefined, action) {
  switch (action.type) {
    case SET_VIEW:
      return action.contentSubSubId
    case SET_DATA:
      return action.contentSubSubId
    default:
      return state
  }
}

function content(state = undefined, action) {
  switch (action.type) {
    case SET_DATA:
      return action.content
    default:
      return state
  }
}

function user(state = undefined, action) {
  switch (action.type) {
    case LOGIN:
      return action.userId
    case LOGOUT:
      return undefined
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

function app(state = {}, action) {
  return {
    viewType: view(state.viewType, action),
    dataType: data(state.dataType, action),
    contentId: id(state.contentId, action),
    contentSubId: subId(state.contentSubId, action),
    contentSubSubId: subSubId(state.contentSubSubId, action),
    content: content(state.content, action),
    userId: user(state.userId, action),
    answer: answer(state.answer, action),
  }
}

