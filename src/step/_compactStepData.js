import _compactList from '../_shared/_compactList'

export default (stepData) => {

  if (!stepData) {
    return {
      id: '',
      quiz: '',
    }
  }

  if (stepData.precondition && stepData.precondition.rule) {
    stepData.precondition.rule = _compactList(stepData.precondition.rule)
  }

  if (stepData.route) {
    stepData.route = _compactList(stepData.route)
  }

  return stepData

}
