import _parseNumericText from './_parseNumericText.js'

export default (text) => {
  const number = text.replace('第', '').replace('條', '').replace(' ', '').split('之').map((section, part) => {
    let subnumber = _parseNumericText(section).join('')

    // 如果原條號有「之」的話
    if (part === 1) {
      subnumber = '-' + subnumber
    }
    return subnumber
  })

  return number.join('')
}
