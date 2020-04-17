import React from 'react'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'
import styles from './UnionItem.less'

const UnionItem = ({ unionName, introduction, id }) => {
  const history = useHistory()
  const handleClick = () => {
    history.push({
      pathname: `myunion/${id}/introduction`,
    })
  }
  return (
    <div className={styles.root}>
      <span className={styles.name}>{unionName}</span>
      <p className={styles.descrip}>{introduction}</p>
      <Button type="link" className={styles.bt} onClick={handleClick}>> 点击进入</Button>
    </div>
  )
}


export default UnionItem;