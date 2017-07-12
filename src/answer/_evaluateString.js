import _getResult from './_getResult'

export default (string, answerData) => {

  if (!string || !answerData) {
    return string
  }

  // 過濾掉不需四則運算的字串

  const needMath = string.match(/[\+\-\*\/]/) ? true : false
  const needParse = string.match(/[A-Za-z]/) ? false : true

  if (!needMath) {
    if (!needParse) {
      return parseFloat(string) || string
    } else {
      return answerData[string] && parseFloat(answerData[string])
    }
  }

  // 開始四則運算

  let level = 0
  let result = [0]
  let operator = ['']
  const list = string.split(' ').map((item) => item.trim())

  list.forEach((item, index) => {

    if (!item || item.length === 0) {
      return
    }

    if (item.match(/[\+\-\*\/]/)) {
      operator[level] = item
      return
    }

    if (item === '(') {
      level += 1
      result[level] = 0
      operator[level] = ''
      return
    }

    if (item === ')') {

      result = _getResult(level - 1, result, operator, result[level])

      result.pop()
      operator.pop()
      level -= 1
      return
    }

    const value = parseFloat(item) || parseFloat(answerData[item])

    result = _getResult(level, result, operator, value)

  })

  return result[0]

}
