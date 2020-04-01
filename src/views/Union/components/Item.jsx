import React from 'react'
import { Button } from 'antd'
import styles from './Item.less'

class Item extends React.Component {
  render() {
    const description = '该项目运用PHP动态网站开发技术，使用ThinkPHP5开源框架，HTML5、CSS、JavaScript等脚本语言，Web服务器使用Apache，数据库采用MySQL数据库，使用Ajax技术与后端建立连接，以Windows系统作为程序运行环境，实现基于Web的高校社团管理系统的开发'
    const name = '社联文体'
    return (
      <div className={styles.root}>
        <span className={styles.name}>{name}</span>
        <p className={styles.descrip}>{description}</p>
        <Button type="link" className={styles.bt}>> 点击进入</Button>
      </div>
    )
  }
}

export default Item;