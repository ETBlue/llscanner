export default (condition, answerData) => {

  if (!condition || !condition.logic || !condition.rule || !answerData) {
    return 'unknown'
  }

  const ruleResult = condition.rule.map((item) => {
    if (!item) {
      return 'unknown'
    }
    const target = answerData[item.target]
    const value = item.value
    if (!target || !value) {
      return 'unknown'
    }
    const itemMap = {
      equal_to: target === value ? 'passed' : 'failed',
      not_equal_to: target !== value ? 'passed' : 'failed',
      greater_than: parseInt(target, 10) > parseInt(value, 10) ? 'passed' : 'failed',
      not_greater_than: parseInt(target, 10) <= parseInt(value, 10) ? 'passed' : 'failed',
      less_than: parseInt(target, 10) < parseInt(value, 10) ? 'passed' : 'failed',
      not_less_than: parseInt(target, 10) >= parseInt(value, 10) ? 'passed' : 'failed',
      belong_to: value.split(',').includes(target) ? 'passed' : 'failed',
      not_belong_to: !value.split(',').includes(target) ? 'passed' : 'failed',
      include: target.split(',').includes(value) ? 'passed' : 'failed',
      not_include: !target.split(',').includes(value) ? 'passed' : 'failed',
    }
    return itemMap[item.logic]
  })

  const map = {
    and: ruleResult.includes('failed') ? 'failed' : 'passed',
    or: ruleResult.includes('passed') ? 'failed' : 'passed',
  }

  return map[condition.logic]

}
