export default (text) => {

  const map = {
    equal_to: '等於',
    not_equal_to: '不等於',
    greater_than: '大於',
    not_greater_than: '不超過',
    less_than: '小於',
    not_less_than: '不小於',
    belong_to: '屬於',
    not_belong_to: '不屬於',
    include: '包含',
    not_include: '不包含',
  }

  return map[text]

}
