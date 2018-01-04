// user actions
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const SET_ANSWER = "SET_ANSWER"

// ui actions
export const SET_VIEW = "SET_VIEW"

// data acitons
export const SET_DATA = "SET_DATA"

// settings
export const ViewTypes = {
  HOME: "HOME",
  QUIZ: "QUIZ",
  REPORT: "REPORT",
  ADMIN: "ADMIN",
  ADMIN_QUIZ: "ADMIN_QUIZ",
  ADMIN_STEP: "ADMIN_STEP",
  ADMIN_RULE_LIST: "ADMIN_RULE_LIST",
  ADMIN_RULE: "ADMIN_RULE",
}
export const DataTypes = {
  QUIZ: "QUIZ",
  STEP: "STEP",
  RULE: "RULE",
}
export const EditTypes = {
  UPDATE: "UPDATE",
  ADD: "ADD",
  DELETE: "DELETE",
}

// aciton creators
export function login(userId) {
  return {
    type: LOGIN, 
    userId
  }
}
export function logout() {
  return {
    type: LOGOUT
  }
}
export function setAnswer(
contentId = null, 
content = null) {
  return {
    type: SET_ANSWER, 
    contentId, 
    content
  }
}
export function setView(
viewType = null, 
contentId = null, 
contentSubId = null, 
contentSubSubId = null) {
  return {
    type: SET_VIEW, 
    viewType, 
    contentId, 
    contentSubId, 
    contentSubSubId
  }
}
export function editData(
dataType = null, 
editType = null, 
contentId = null, 
contentSubId = null, 
contentSubSubId = null, 
content = null) {
  return {
    type: SET_DATA, 
    dataType, 
    editType, 
    contentId, 
    contentSubId, 
    contentSubSubId, 
    content
  }
}
