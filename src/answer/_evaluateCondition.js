import _evaluateString from './_evaluateString'

export default (condition, answerData) => {

  if (!condition || !condition.logic || !condition.rule || !answerData) {
    return 'unknown'
  }

  const ruleResult = condition.rule.map((item) => {

    if (!item) {
      return 'unknown'
    }

    const target = _evaluateString(answerData[item.target], answerData)
    const value = _evaluateString(item.value, answerData)

    if (!target || !value) {
      return 'unknown'
    }

    const targetArray = typeof target !== 'string' ? [] : target.split(',').map(item => item.trim())
    const valueArray = typeof value !== 'string' ? [] : value.split(',').map(item => item.trim())

    const itemMap = {
      equal_to: target === value ? 'passed' : 'failed',
      not_equal_to: target !== value ? 'passed' : 'failed',
      greater_than: target > value ? 'passed' : 'failed',
      not_greater_than: target <= value ? 'passed' : 'failed',
      less_than: target < value ? 'passed' : 'failed',
      not_less_than: target >= value ? 'passed' : 'failed',
      belong_to: valueArray.includes(target) ? 'passed' : 'failed',
      not_belong_to: !valueArray.includes(target) ? 'passed' : 'failed',
      include: targetArray.includes(value) ? 'passed' : 'failed',
      not_include: !targetArray.includes(value) ? 'passed' : 'failed',
    }
    return itemMap[item.logic]
  })

  const map = {
    and: ruleResult.includes('failed') ? 'failed' : 'passed',
    or: ruleResult.includes('passed') ? 'failed' : 'passed',
  }

  return map[condition.logic]

}
