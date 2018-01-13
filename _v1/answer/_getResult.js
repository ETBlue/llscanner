export default (level, result, operator, value) => {

  if (operator[level] === '') {
    result[level] = value
  }
  if (operator[level] === '+') {
    result[level] += value
  }
  if (operator[level] === '-') {
    result[level] -= value
  }
  if (operator[level] === '*') {
    result[level] *= value
  }
  if (operator[level] === '/') {
    result[level] /= value
  }

  return result

}
