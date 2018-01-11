import { connect } from 'react-redux'
//import { push } from 'react-router-redux'
import PropTypes from 'prop-types'

import { RuleData } from '../data/RuleData'
import { AnswerData } from '../data/AnswerData'
import Report from '../components/Report'
import { evalCondition } from '../settings/tool'

const mapStateToProps = (state, ownProps) => {

  let report = {
    'na': [],
    'maybeNa': [],
    'failed': [],
    'unsure': [],
    'passed': [],
  }

  //const answer = state.answer
  const answer = AnswerData

  RuleData.forEach((rule, index) => {
    const preconditionEval = evalCondition(rule.preconditionLogic, rule.precondition, answer)
    rule.preconditionMsg = preconditionEval.messages
    switch (preconditionEval.result) {
      case false:
        report.na.push(rule)
        break
      case 'unsure':
        report.maybeNa.push(rule)
        break
      case true:
        const conditionEval = evalCondition(rule.conditionLogic, rule.condition, answer)
        rule.conditionMsg = conditionEval.messages
        switch (conditionEval.result) {
          case false:
            report.failed.push(rule)
            break
          case 'unsure':
            report.unsure.push(rule)
            break
          case true:
            report.passed.push(rule)
            break
          default:
            console.log('error')
        }
        break
      default:
        console.log('error')
    }
  })

  return {
    report: report
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const ReportPage = connect(mapStateToProps, mapDispatchToProps)(Report)

ReportPage.proptypes = {
}

export default ReportPage
