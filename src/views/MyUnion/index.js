import React from 'react'
import styles from './index.less'
import unionbg from '../../picture/unionbg3.png'
import UnionItem from './components/UnionItem'
import { Row, Col, Button } from 'antd'

class MyUnion extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.topPart}>
          <img src={unionbg} alt="我的社团" style={{ width: '100%' }} />
          <span className={styles.title}>我的社团</span>
        </div>
        <div style={{ margin: 50 }}>
          <p>
            <Button type="link" style={{ fontSize: '1.2rem' }}>+新建社团</Button>
          </p>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={8}>
              <UnionItem />
            </Col>
            <Col span={8}>
              <UnionItem />
            </Col>
            <Col span={8}>
              <UnionItem />
            </Col>
            <Col span={8}>
              <UnionItem />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default MyUnion;