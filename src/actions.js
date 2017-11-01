const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"

const VIEW_REPORT = "VIEW_REPORT"

const VIEW_QUIZLIST = "VIEW_QUIZLIST"
const VIEW_STEPLIST = "VIEW_STEPLIST"
const VIEW_LAWLIST = "VIEW_LAWLIST"
const VIEW_RULELIST = "VIEW_RULELIST"

const VIEW_QUIZ = "VIEW_QUIZ"
const VIEW_STEP = "VIEW_STEP"
const VIEW_RULE = "VIEW_RULE"

const ADD_QUIZ = "ADD_QUIZ"
const ADD_STEP = "ADD_STEP"

const DELETE_QUIZ = "DELETE_QUIZ"
const DELETE_STEP = "DELETE_STEP"

const UPDATE_QUIZ = "UPDATE_QUIZ"
const UPDATE_STEP = "UPDATE_STEP"
const UPDATE_RULE = "UPDATE_RULE"
const UPDATE_ANSWER = "UPDATE_ANSWER"

export function login(id) {return { type: LOGIN, id }}
export function logout() {return { type: LOGOUT }}
export function viewReport() {return { type: VIEW_REPORT }}
export function viewQuizList() {return { type: VIEW_QUIZLIST }}
export function viewStepList() {return { type: VIEW_STEPLIST }}
export function viewLawList() {return { type: VIEW_LAWLIST }}
export function viewRuleList(lawId) {return { type: VIEW_RULELIST, lawId }}
export function viewQuiz(id) {return { type: VIEW_QUIZ, id }}
export function viewStep(id) {return { type: VIEW_STEP, id }}
export function viewRule(lawId, ruleId) {return { type: VIEW_RULE, lawId, ruleId }}
export function addQuiz(id) {return { type: ADD_QUIZ, id }}
export function addStep() {return { type: ADD_STEP }}
export function deleteQuiz(id) {return { type: DELETE_QUIZ, id }}
export function deleteStep(id) {return { type: DELETE_STEP, id }}
export function updateQuiz(id, content) {return { type: UPDATE_QUIZ, id, content }}
export function updateStep(id, content) {return { type: UPDATE_STEP, id, content }}
export function updateRule(lawId, ruleId, content) {return { type: UPDATE_RULE, lawId, ruleId, content }}
export function updateAnswer(id, content) {return { type: UPDATE_ANSWER, id, content }}

