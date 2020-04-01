import React from 'react'
import { Input, Row, Col } from 'antd'
import styles from './index.less'
import Item from './components/Item'

const { Search } = Input;

class Union extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.search}>
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            enterButton
            style={{ width: '20%', marginTop: 60 }}
            size="large"
          />
        </div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={6}>
            <Item />
          </Col>
          <Col span={6}>
            <Item />
          </Col>
          <Col span={6}>
            <Item />
          </Col>
          <Col span={6}>
            <Item />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Union; 