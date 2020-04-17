import React from 'react'
import { connect } from 'react-redux'
import styles from './index.less'
import unionbg from '../../picture/unionbg3.png'
import UnionItem from './components/UnionItem'
import CreateUnionModal from './components/CreateUnionModal'
import { Row, Col, Button } from 'antd'

class MyUnion extends React.Component {
  state = {
    visible: false
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'GET_MYUNION',
    })
  }

  onCreate = values => {
    const { loginState, dispatch } = this.props
    const { userInfo } = loginState
    const data = { ...values }
    data.creator = userInfo.id
    data.name = userInfo.name
    data.type = JSON.stringify(data.type)
    dispatch({
      type: 'APPLICATION_SUBMIT',
      payload: data
    })
    this.setState({
      visible: false
    })
  }

  handleClick = () => {
    this.setState({
      visible: true
    })
  }

  render() {
    const { visible } = this.state
    const { myUnionState } = this.props
    const { myUnion } = myUnionState
    return (
      <div className={styles.root}>
        <div className={styles.topPart}>
          <img src={unionbg} alt="我的社团" style={{ width: '100%' }} />
          <span className={styles.title}>我的社团</span>
        </div>
        <div style={{ margin: 50 }}>
          <p>
            <Button type="link" style={{ fontSize: '1.2rem' }} onClick={this.handleClick}>+新建社团</Button>
          </p>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {
              myUnion.map((item, index) => (
                <Col span={8} key={index}>
                  <UnionItem
                    unionName={item.unionName}
                    introduction={item.introduction}
                    id={item._id}
                  />
                </Col>
              ))
            }
          </Row>
        </div>
        <CreateUnionModal
          visible={visible}
          onCreate={this.onCreate}
          onCancel={() => {
            this.setState({
              visible: false
            })
          }}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    myUnionState: state.myUnionPage,
    loginState: state.loginPage
  })
)(MyUnion)