import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import PropTypes from 'prop-types'

const Detail = ({data}) => {
  const detail = data.map((entry, index) => {
    const parsed = entry.conditionMsg.map((msg, key) => {
      let result, rowStyle
      switch (msg.result) {
        case 'unsure':
          result = 'unsure'
          rowStyle = 'warning'
          break
        case true:
          result = 'true'
          rowStyle = 'positive'
          break
        case false:
          result = 'false'
          rowStyle = 'negative'
          break
        default:
          result = msg.result
      }
      return (
        <tr key={key} className={rowStyle} >
          <td>
          {msg.target}
          </td>
          <td>
          {msg.logic} {msg.ideal}<br />
          <span style={{fontSize: '0.8em', opacity: '0.8'}}>
          {msg.formula}
          </span>
          </td>
          <td>
          {msg.reality}
          </td>
          <td>
          {result}
          </td>
        </tr>
      )
    })
    let logic
    switch (entry.conditionLogic) {
      case '&&':
        logic = '同時'
        break
      case '||':
        logic = '擇一'
        break
      default:
    }
    const paragraph = entry.paragraph && entry.paragraph.toString()
    const subParagraph = entry.subParagraph && entry.subParagraph.toString()
    const item = entry.item && entry.item.toString()
    let description = (
      <th colSpan='4' >
      根據{entry.law}（{entry.version} 版）
      {paragraph && paragraph.length > 0 ? `第 ${paragraph} 條` : '' }
      {subParagraph && subParagraph.length > 0 ? `第 ${subParagraph} 項` : ''}
      {item && item.length > 0 ? `第 ${item} 款` : ''}
      ，需{logic}通過以下規則：
      </th>
    )
    let result
    switch (entry.result) {
      case 'unsure':
        result = '不確定'
        break
      case true:
        result = '通過'
        break
      case false:
        result = '不通過'
        break
      default:
    }
    return (
      <table key={index} className='ui table' >
        <thead>
          <tr>
            {description}
          </tr>
          <tr>
            <th className='five wide'>
            規則
            </th>
            <th className='five wide'>
            理想
            </th>
            <th className='three wide'>
            現實
            </th>
            <th className='three wide'>
            結果
            </th>
          </tr>
        </thead>
        <tbody>
        {parsed}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan='4'>
            掃描結果：{result}
            </th>
          </tr>
        </tfoot>
      </table>
    )
  })
  return (
    <div>
    {detail}
    </div>
    )
}

const Report = ({report}) => {
  console.log(report)
  return (
    <section className='Report ui basic center aligned segment'>
      <h1 className='ui header'>掃描結果</h1>
      <p>你的工作規定共有
        <span className='ui large horizontal red label' style={{margin: '0 0.5rem'}} >
        {report.failed.length}
        </span>
        項不合格，
        <span className='ui large horizontal green label' style={{margin: '0 0.5rem'}} >
        {report.passed.length}
        </span>
        項合格
      </p>
      <p>
        另有 {report.unsure.length} 項目前無法判斷
      </p>
      <hr className='ui hidden divider' />
      <h2 className='ui icon header'>
        <i className='icon red warning sign'></i>
        不合格
      </h2>
      {<Detail data={report.failed} />}
      <h2 className='ui icon header'>
        <i className='icon green check square'></i>
        合格
      </h2>
      {<Detail data={report.passed} />}
      <h2 className='ui icon header'>
        <i className='icon help circle'></i>
        無法判斷
      </h2>
      {<Detail data={report.unsure} />}
      <hr className='ui hidden divider' />
      <Link to='/' className='ui icon labeled right button'>
        重來
        <i className='icon right chevron'></i>
      </Link>
    </section>
  )
}

Report.proptypes = {
}

export default Report
