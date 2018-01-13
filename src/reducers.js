import {
  // actions
  LOGIN,
  LOGOUT,
  SET_ANSWER,
//  SET_VIEW,
  SET_DATA,
  // constants
//  ViewTypes,
//  DataTypes,
//  EditTypes,
} from './actions'

export function userID(state = null, action) {
  switch (action.type) {
    case LOGIN:
      return action.userID
    case LOGOUT:
      return null
    default:
      return state
  }
}

export function answer(state = {}, action) {
  switch (action.type) {
    case SET_ANSWER:
      return Object.assign({}, state, {
        [action.contentID]: action.content
      })
    default:
      return state
  }
}

//export function view(state = ViewTypes.HOME, action) {
//  switch (action.type) {
//    case SET_VIEW:
//      return action.viewType
//    default:
//      return state
//  }
//}

export function dataType(state = null, action) {
  switch (action.type) {
    case SET_DATA:
      return action.dataType
    default:
      return state
  }
}

export function contentID(state = null, action) {
  switch (action.type) {
//    case SET_VIEW:
    case SET_DATA:
      return action.contentID
    default:
      return state
  }
}

export function contentSubID(state = null, action) {
  switch (action.type) {
//    case SET_VIEW:
    case SET_DATA:
      return action.contentSubID
    default:
      return state
  }
}

export function contentSubSubID(state = null, action) {
  switch (action.type) {
//    case SET_VIEW:
    case SET_DATA:
      return action.contentSubSubID
    default:
      return state
  }
}

export function content(state = null, action) {
  switch (action.type) {
    case SET_DATA:
      return action.content
    default:
      return state
  }
}
