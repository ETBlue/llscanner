export const getID = (obj) => (
  Object.keys(obj)
)

export const evalLogic = (arr, answer) => {
  const val = answer[arr[0]]
  switch (arr[1]) {
    case '==':
      return val === arr[2]
    case '!=':
      return val !== arr[2]
    case '>':
      return val > arr[2]
    case '<=':
      return val <= arr[2]
    case '<':
      return val < arr[2]
    case '>=':
      return val >= arr[2]
    case 'belong_to':
      return arr[2].split(';').includes(val)
    case '!belong_to':
      return !arr[2].split(';').includes(val)
    case 'include':
      return val.split(';').includes(arr[2])
    case '!include':
      return !val.split(';').includes(arr[2])
    default:
      return true
  }
}

export const evalCondition = (logic, rule, answer) => {

  if (rule.length === 0) {
    return true
  }

  const rules = rule.split(';')
  .map((str) => str.split('|'))
  .map((arr) => evalLogic(arr, answer))

  if (logic === '||') {
    return rules.includes(true)
  } else {
    return !rules.includes(false)
  }

}