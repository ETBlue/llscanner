import _evaluateString from './_evaluateString'

export default (condition, answerData) => {
//  console.log(`--- a new condition ---`)

  let output = {
    result: '',
    hint: []
  }

  if (!condition || !condition.logic || !condition.rule || !answerData) {
    output.result = 'unknown'
    return output
  }

  const ruleResult = condition.rule.map((item) => {

    if (!item) {
      return 'unknown'
    }

    const target = _evaluateString(answerData[item.target], answerData)
    const value = _evaluateString(item.value, answerData)

    output.hint.push({
      target: target,
      value: value,
      name: item.target,
      logic: item.logic
    })

//    console.log(`${item.target} -> ${target} | ${item.logic} | ${item.value} -> ${value}`)
    if (!target && target !== 0) {
//      console.log(`result: unknown`)
      return 'unknown'
    }
    if (!value && value !== 0) {
//      console.log(`result: unknown`)
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
//    console.log(`result: ${itemMap[item.logic]}`)

    return itemMap[item.logic]
  })

  const map = {
    and: ruleResult.includes('failed') ? 'failed' : ruleResult.includes('unknown') ? 'unknown' : 'passed',
    or: ruleResult.includes('passed') ? 'passed' : ruleResult.includes('unknown') ? 'unknown' : 'failed',
  }

//  console.log(`rules above tested by ${condition.logic.toUpperCase()}: ${map[condition.logic]}`)
  output.result = map[condition.logic]
  return output

}
