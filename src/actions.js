// user actions
const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"
const SET_ANSWER = "SET_ANSWER"

// ui actions
const SET_VIEW = "SET_VIEW"

// data acitons
const SET_DATA = "SET_DATA"

// settings
export const ViewTypes: {
  HOME: "HOME",
  QUIZLIST: "QUIZLIST",
  STEPLIST: "STEPLIST",
  LAWLIST: "LAWLIST",
  QUIZ: "QUIZ",
  STEP: "STEP",
  LAW: "LAW",
  RULE: "RULE",
  REPORT: "REPORT",
}
export const DataTypes: {
  QUIZ: "QUIZ",
  STEP: "STEP",
  RULE: "RULE",
}
export const EditTypes: {
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
contentId = undefined, 
content = undefined) {
  return {
    type: SET_ANSWER, 
    contentId, 
    content
  }
}
export function setView(
viewType = undefined, 
contentId = undefined, 
contentSubId = undefined, 
contentSubSubId = undefined) {
  return {
    type: SET_VIEW, 
    viewType, 
    contentId, 
    contentSubId, 
    contentSubSubId
  }
}
export function editData(
dataType = undefined, 
editType = undefined, 
contentId = undefined, 
contentSubId = undefined, 
contentSubSubId = undefined, 
content = undefined) {
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
