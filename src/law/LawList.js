import React, { Component } from 'react'
import {HashLink as Link} from 'react-router-hash-link'
import _fixYear from '../_shared/_fixYear.js'
import './LawList.css'

class LawList extends Component {

  render () {

    const laws = this.props.laws

    let lawListJSX

    if (laws) {
      lawListJSX = Object.keys(laws).map((law) => {
        const lawData = laws[law]

        // 法條名稱為 key，法條關連為 value（set）
        let dependency = new Map()
        lawData.law_data.forEach((article) => {
          if (article.relates) {
            Object.keys(article.relates).forEach((key) => {
              article.relates[key].forEach((item) => {
                let relation = dependency.get(item.law_name) || new Set()
                relation = relation.add(key)
                dependency.set(item.law_name, relation)
              })
            })
          }
        })
        // 法條依關係群組
        let relatedLaws = {
          ioLaws: [],
          sourceLaws: [],
          targetLaws: []
        }
        dependency.forEach((relationSet, lawName) => {
          if (relationSet.has('被引用條文') && relationSet.has('引用條文')) {
            relatedLaws.ioLaws.push(lawName)
          } else if (relationSet.has('被引用條文')) {
            relatedLaws.targetLaws.push(lawName)
          } else if (relationSet.has('引用條文')) {
            relatedLaws.sourceLaws.push(lawName)
          }
        })
        const dependencyJSX = Object.keys(relatedLaws).map((relationType) => {
          if (relatedLaws[relationType].length > 0) {
            let icon
            if (relationType === 'ioLaws') {
              icon = 'exchange'
            } else if (relationType === 'sourceLaws') {
              icon = 'arrow left'
            } else if (relationType === 'targetLaws') {
              icon = 'arrow right'
            }
            const relationTypeJSX = relatedLaws[relationType].map((lawName, index) => {
              return (
                <div key={index} className='item'>
                  <i className={'icon ' + icon} />
                  <div className='content'>
                    <Link to={'/law/' + lawName}>
                      { lawName }
                    </Link>
                  </div>
                </div>
              )
            })
            return (
              <div key={relationType} className='item'>
                <div className='list'>
                  { relationTypeJSX }
                </div>
              </div>
            )
          } else {
            return null
          }
        })

        const versionJSX = lawData.versions ? lawData.versions.map((string, index) => {
          const map = {
            '制定': 'birthday',
            '修正': 'edit',
            '公布': 'announcement'
          }
          let icon = ''
          Object.keys(map).forEach((change) => {
            icon = string.includes(change) ? map[change] : icon
          })

          return (
            <div key={index} className='item'>
              <i className={'icon ' + icon} />
              <div className='content'>
                {_fixYear(string)}
              </div>
            </div>
          )
        }) : ''

        return (
          <tr key={law}>
            <td className='top aligned'>
              <h4 className='ui header'>
                <Link to={'/law/' + lawData.title}>
                  {lawData.title}
                </Link>
              </h4>
            </td>
            <td className='top aligned'>
              <div className='ui relaxed list'>
                { versionJSX }
              </div>
            </td>
            <td className='top aligned'>
              <div className="DependencyList ui relaxed divided list">
                { dependencyJSX }
              </div>
            </td>
          </tr>
        )
      })
    }

    return (
      <div className='LawList ui basic segment'>
        <h2 className='ui header'>法規列表</h2>
        <table className='ui table'>
          <thead>
            <tr>
              <th className='four wide'>法規名稱</th>
              <th className='six wide'>版本</th>
              <th className='six wide'>相依性</th>
            </tr>
          </thead>
          <tbody>
            { lawListJSX }
          </tbody>
        </table>
      </div>
    )
  }
}

export default LawList
