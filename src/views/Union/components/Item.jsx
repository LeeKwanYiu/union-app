import React from 'react'
import { Button } from 'antd'
import styles from './Item.less'

class Item extends React.Component {
  render() {
    const { unionName = '', introduction = '', handleClickDetail, unionId, userId } = this.props
    return (
      <div className={styles.root}>
        <span className={styles.name}>{unionName}</span>
        <p className={styles.descrip}>{introduction}</p>
        <Button
          type="link"
          className={styles.bt}
          onClick={() => handleClickDetail({ unionName, introduction, unionId, userId })}
        >
          >查看详情
        </Button>
      </div>
    )
  }
}

export default Item;