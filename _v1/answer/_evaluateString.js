import _getResult from './_getResult'

export default (string, answerData) => {

  if (!string || !answerData) {
    return string
  }

  // 過濾掉不需四則運算的字串

  const needMath = string.match(/[+\-*/]/) ? true : false
  const needParse = string.match(/[A-Za-z]/) ? false : true

  // 含英文字的直接原樣遣返
  if (!needParse) {
    return string
  }

  // 不含英文字（只有數字 & 中文）、但也不需要加減乘除的，轉數字後遣返
  if (!needMath) {
    return parseFloat(string) || parseFloat(answerData[string]) || answerData[string]
  }

  // 清場完畢，開始四則運算囉

  let level = 0
  let result = [0]
  let operator = ['']
  let cart = ''

  const list = string.replace(/[ ]/g, '').split('')
  list.forEach((char, index) => {

    let value

    // 不是特殊字元的話，往購物車裡面塞
    if (!char.match(/[+\-*/()]/)) {

      cart += char

      // 不是特殊字元，但又到底了，把購物車結帳後歸零
      if (index === list.length - 1) {
        if (parseFloat(cart) || parseFloat(cart) === 0) {
          value = parseFloat(cart)
        } else if (parseFloat(answerData[cart]) || parseFloat(answerData[cart]) === 0) {
          value = parseFloat(answerData[cart])
        } else {
          value = cart
        }
        // console.log(parseFloat(cart) + ', ' + parseFloat(answerData[cart]) + ', ' + cart + ' -> ' + value)
        result = _getResult(level, result, operator, value)
        operator[level] = ''
        cart = ''

      }

      return
    }

    // 遇到特殊字元，且購物車裡有貨，把購物車結帳後歸零
    if (cart !== '') {

      if (parseFloat(cart) || parseFloat(cart) === 0) {
        value = parseFloat(cart)
      } else if (parseFloat(answerData[cart]) || parseFloat(answerData[cart]) === 0) {
        value = parseFloat(answerData[cart])
      } else {
        value = cart
      }
        // console.log(parseFloat(cart) + ', ' + parseFloat(answerData[cart]) + ', ' + cart + ' -> ' + value)
      result = _getResult(level, result, operator, value)
      operator[level] = ''
      cart = ''

    }

    // 遇到特殊字元，且特殊字元是運算子的話，記下來
    if (char.match(/[+\-*/]/)) {

      operator[level] = char

      return
    }

    // 遇到特殊字元，且特殊字元是左刮號的話，新開一層亞空間
    if (char === '(') {

      level += 1
      result[level] = 0
      operator[level] = ''

      return
    }

    // 遇到特殊字元，且特殊字元是右刮號的話，亞空間結帳
    if (char === ')') {

      result = _getResult(level - 1, result, operator, result[level])

      result.pop()
      operator.pop()
      level -= 1
      return
    }

  })

  return result[0]

}
