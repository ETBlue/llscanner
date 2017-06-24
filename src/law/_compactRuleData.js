import _compactList from '../_shared/_compactList'

export default (ruleData) => {

  if (!ruleData) {
    return []
  }

  return _compactList(ruleData).map((entry, index) => {
    if (!entry) {
      return false
    }
    if (entry.condition && entry.condition.rule) {
      entry.condition.rule = _compactList(entry.condition.rule)
    }
    if (entry.precondition && entry.precondition.rule) {
      entry.precondition.rule = _compactList(entry.precondition.rule)
    }
    return entry
  })

}
