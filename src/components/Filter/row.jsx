import React, { useState } from 'react'
import style from './row.less'

const Row = ({ title, name, dataSource, onChange }) => {
  const data = JSON.parse(JSON.stringify(dataSource))
  data.unshift({ key: 'all', label: `全部${title}` })
  const [activeItem, setActiveItem] = useState(data[0].key)
  const handleClick = (key) => {
    setActiveItem(key)
    const obj = {}
    obj[name] = key
    onChange(obj)
  }
  return (
    <ul className={style.root}>
      {
        data.map((item, index) => {
          return (
            <li className="tag" onClick={() => handleClick(item.key)} key={index}>
              <span className={activeItem === item.key ? "text active" : "text unactive"}>{item.label}</span>
            </li>
          )
        })
      }
    </ul>
  )
}

export default Row;