import React, { useState } from 'react'
import Row from './row'

// 整体筛选
const Filter = ({ data, onChange = () => { } }) => {
  const defaultObj = {}
  data.forEach(item => {
    defaultObj[item.name] = 'all'
  })
  const [activeObj, setObjActive] = useState(defaultObj)
  const handleChange = (key) => {
    const newActiveObj = { ...activeObj, ...key }
    onChange(newActiveObj)
    setObjActive(newActiveObj)
  }
  return (
    data.map((item, index) => (
      <Row
        name={item.name}
        title={item.title}
        dataSource={item.data}
        onChange={handleChange}
        key={index}
      />
    ))
  )
}

export default Filter;