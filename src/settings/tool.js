export const getID = (obj) => (
  Object.keys(obj)
)

const calc = (a, b, operator) => {
  if (operator === 'start') {
    return b
  }
  if (a === 'unsure' || b === 'unsure') {
    return 'unsure'
  }
  switch(operator) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '*':
      return a * b
    case '/':
      return a / b
    default:
      return 'unsure'
  }
}

const evalMath = (mathString, answer) => {

  let
    level = 0,
    result = [0],
    operator = ['start'],
    unsure = false

  const mathArray = mathString.split(' ')
  mathArray.forEach((fragment, index) => {
    switch (fragment) {
      case '(':
        level += 1
        result[level] = 0
        operator[level] = 'start'
        break
      case '+':
      case '-':
      case '*':
      case '/':
        operator[level] = fragment
        break
      case ')':
        level -= 1
        result[level] = calc(result[level], result[level + 1], operator[level])
        break
      default:
        // fragment 不是數字的話，那就是 answer 中的值了
        let operon
        if (isNaN(parseFloat(fragment))) {
          // answer 中的值也不是數字的話，就回答不知道
          if (!answer[fragment] || answer[fragment].length === 0 || isNaN(parseFloat(answer[fragment]))) {
            unsure = true
            return
          // answer 中的值是數字的話，就拿去算
          } else {
            operon = parseFloat(answer[fragment])
          }
        // fragment 是數字的話，就直接拿去算
        } else {
          operon = parseFloat(fragment)
        }
        // 更新結果
        result[level] = calc(result[level], operon, operator[level])
    }
  })

  if (unsure === true) {
    return 'unsure'

  // 如果沒寫錯的話，最後應該會回到第 0 層
  } else if (level === 0) {
    return result[level]

  // 如果錯了就噴噴
  } else {
    console.log(`error: final level is ${level}`)
    return 'unsure'
  }

}

const evalLogic = (conditionArray, answer) => {

  let userInput = answer[conditionArray[0]]
  let standard = conditionArray[2]
  let message = {
    target: conditionArray[0],
    logic: conditionArray[1],
    formula: '',
    reality: userInput && userInput.length > 0 ? userInput : '無資料',
    ideal: standard,
    result: ''
  }

  if (conditionArray[1] === '==') {
    message.logic = ''
  }

  // 沒資料的話，就說不知道
  if (!standard) {
    message.result = 'unsure'
    return message
  }

  // 標準答案需要四則運算的話，就算算看
  if (standard.split(' ').length > 1) {
    standard = evalMath(standard, answer)
    message.ideal = standard
    message.formula = conditionArray[2]

    // 算不出來的話，就說不知道
    if (standard === 'unsure') {
      message.result = 'unsure'
      return message
    }

  // 沒有四則運算，但本身可以轉數字的話，就轉
  } else if (!isNaN(parseFloat(standard))) {
    standard = parseFloat(standard)

    // 如果成功轉數字，但使用者回答不是數字，就說不知道
    if (userInput && isNaN(userInput)) {
      message.result = 'unsure'
      return message
    }
  }

  // 使用者回答不知道、或者沒回答的話，就說不知道
  if (userInput === 'unsure' || userInput === '' || !userInput) {
    message.result = 'unsure'
    return message
  }

  // 使用者回答可以轉數字的話，就轉
  if (!isNaN(parseFloat(userInput))) {
    userInput = parseFloat(userInput)
  }

  // 走到這裡的，有確定的使用者答案、確定的標準答案，且兩者型別一致
  switch (conditionArray[1]) {
    case '==':
      message.result = userInput === standard
      return message
    case '!=':
      message.result = userInput !== standard
      return message
    case '>':
      message.result = userInput > standard
      return message
    case '<=':
      message.result = userInput <= standard
      return message
    case '<':
      message.result = userInput < standard
      return message
    case '>=':
      message.result = userInput >= standard
      return message
    case 'belong_to':
      message.result = standard.split('、').includes(userInput)
      message.logic = '屬於'
      return message
    case '!belong_to':
      message.result = !standard.split('、').includes(userInput)
      message.logic = '不屬於'
      return message
    case 'include':
      message.result = userInput.split('、').includes(standard)
      message.logic = '包括'
      return message
    case '!include':
      message.result = !userInput.split('、').includes(standard)
      message.logic = '不包括'
      return message
    default:
      message.result = 'unsure'
      return message
  }
}

export const evalCondition = (logic, rule, answer) => {

  if (rule.length === 0) {
    return {
      messages: [],
      result: true
    }
  }

  const messages = rule.split(';')
  .map((str) => str.split('|'))
  .map((arr) => evalLogic(arr, answer))

  const rules = messages.map((message) => {
    return message.result
  })

  let result

  if (logic === '||') {
    if (rules.includes(true)) {
      result = true
    } else if (rules.includes('unsure')) {
      result = 'unsure'
    } else {
      result = false
    }
  } else {
    if (rules.includes(false)) {
      result = false
    } else if (rules.includes('unsure')) {
      result = 'unsure'
    } else {
      result = true
    }
  }

  return {
    messages: messages,
    result: result
  }

}
