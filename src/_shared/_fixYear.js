export default (string) => {

  const part = string.split('年')
  const year = parseInt(part[ 0 ].replace('中華民國', ''), 10) + 1911
  return (`${year}年${part[1]}`)

}
