const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"

const VIEW_REPORT = "VIEW_REPORT"

const VIEW_QUIZLIST = "VIEW_QUIZLIST"
const VIEW_QUIZ = "VIEW_QUIZ"
const UPDATE_QUIZ = "UPDATE_QUIZ"
const ADD_QUIZ = "ADD_QUIZ"
const DELETE_QUIZ = "DELETE_QUIZ"

const VIEW_STEPLIST = "VIEW_STEPLIST"
const VIEW_STEP = "VIEW_STEP"
const UPDATE_STEP = "UPDATE_STEP"
const ADD_STEP = "ADD_STEP"
const DELETE_STEP = "DELETE_STEP"

const VIEW_LAWLIST = "VIEW_LAWLIST"
const VIEW_LAW = "VIEW_LAW"
const VIEW_RULE = "VIEW_RULE"
const UPDATE_RULE = "UPDATE_RULE"
const ADD_RULE = "ADD_RULE"
const DELETE_RULE = "DELETE_RULE"

const UPDATE_ANSWER = "UPDATE_ANSWER"

export function login(userId) {return { type: LOGIN, userId }}
export function logout() {return { type: LOGOUT }}

export function viewReport() {return { type: VIEW_REPORT }}

export function viewQuizList() {return { type: VIEW_QUIZLIST }}
export function viewQuiz(quizId) {return { type: VIEW_QUIZ, quizId }}
export function updateQuiz(quizId, content) {return { type: UPDATE_QUIZ, quizId, content }}
export function addQuiz(quizId) {return { type: ADD_QUIZ, quizId }}
export function deleteQuiz(quizId) {return { type: DELETE_QUIZ, quizId }}

export function viewStepList() {return { type: VIEW_STEPLIST }}
export function viewStep(stepId) {return { type: VIEW_STEP, stepId }}
export function updateStep(stepId, content) {return { type: UPDATE_STEP, stepId, content }}
export function addStep() {return { type: ADD_STEP }}
export function deleteStep(stepId) {return { type: DELETE_STEP, stepId }}

export function viewLawList() {return { type: VIEW_LAWLIST }}
export function viewLaw(lawId) {return { type: VIEW_LAW, lawId }}
export function viewRule(lawId, ruleId) {return { type: VIEW_RULE, lawId, ruleId }}
export function updateRule(lawId, ruleId, content) {return { type: UPDATE_RULE, lawId, ruleId, content }}
export function addRule(lawId, ruleId, content) {return { type: ADD_RULE, lawId, ruleId, content }}
export function deleteRule(lawId, ruleId, content) {return { type: DELETE_RULE, lawId, ruleId, content }}

export function updateAnswer(quizId, content) {return { type: UPDATE_ANSWER, quizId, content }}
