export default (text) => {

  const map = {
    '一': '1',
    '二': '2',
    '三': '3',
    '四': '4',
    '五': '5',
    '六': '6',
    '七': '7',
    '八': '8',
    '九': '9'
  }

  return text.split('').map((character, index) => {
    if (character === '十') {
      // 在頭尾的算 10
      if (text.length === 1) {
        return '10'

      // 在開頭的算 1
      } else if (index === 0) {
        return '1'

      // 在尾巴的算 0
      } else if (index === text.length - 1) {
        return '0'

      // 夾在中間的省略
      } else {
        return ''
      }

    // 其他照翻
    } else {
      return map[character]
    }
  })

}
