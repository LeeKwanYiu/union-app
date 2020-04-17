import React from 'react'
import { Input, Row, Col, Pagination, Empty, message } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styles from './index.less'
import Item from './components/Item'
import DetailModal from './components/DetailModal';
import Filter from '../../components/Filter'
import type from '../../config/type'
import request from '../../store/request'

const { Search } = Input;

// dataChange of type data
const typeData = { name: 'type', title: '类型', data: [] }
for (const key in type) {
  const obj = {}
  obj.key = key
  obj.label = type[key].label
  typeData.data.push(obj)
}

// year data
const yearData = {
  name: 'year',
  title: '年份',
  data: [
    { key: '2020', label: '2020' },
    { key: '2019', label: '2019' },
    { key: '2018', label: '2018' }
  ]
}
const filterDataSource = [typeData, yearData]
// 页面大小
const pageSize = 8

class Union extends React.Component {
  state = {
    data: [],
    current: 1,
    total: 0,
    filterParams: { type: 'all', year: 'all' }, // 筛选器
    union: {}, //点击的社团
    visible: false, // 弹框是否可视
    okText: '申请加入'
  }

  componentDidMount() {
    this.getData({
      pageSize,
      current: 1,
      type: 'all',
      year: 'all',
      searchVal: ''
    })
  }

  // 动态获取数据
  getData = async params => {
    const result = await request({
      url: '/api/unions',
      method: 'POST',
      data: params
    })
    const { errorCode, data } = result
    if (errorCode === 0) {
      const { total, current, list } = data
      this.setState({
        data: list,
        total,
        current
      })
    }
  }

  // 过滤器
  handleFilterChange = obj => {
    const { searchVal } = this.state
    const data = { ...obj, pageSize, current: 1, name: searchVal }
    this.setState({
      filterParams: obj
    })
    this.getData(data)
  }

  // 分页器
  handlePageChange = current => {
    const { filterParams, searchVal } = this.state
    const params = { ...filterParams, current, pageSize, name: searchVal }
    this.getData(params)
  }

  // 模糊搜索
  handleSearch = value => {
    const { filterParams } = this.state
    const params = { ...filterParams, current: 1, pageSize, name: value }
    this.getData(params)
    this.setState({
      searchVal: value
    })
  }

  // 点击详情
  handleClickDetail = value => {
    const { loginState } = this.props
    const { id } = loginState.userInfo
    const { userId } = value
    this.setState({
      union: value,
      visible: true,
      okText: userId.includes(id) ? '点击进入' : '申请加入'
    })
  }

  // 申请加入社团
  applyToUnion = async data => {
    const result = await request({
      url: '/api/unions/application',
      method: "POST",
      data
    })
    const { errorCode } = result
    if (errorCode === 0)
      message.success("申请加入成功")
    else if (errorCode === 20301)
      message.error("已提交过申请")
    else
      message.error("申请加入失败")
  }

  // 弹框确定
  handleOk = () => {
    const { okText, union } = this.state
    const { history, loginState } = this.props
    const { unionId } = union
    if (okText === '点击进入') {
      history.push(`/myunion/${unionId}/introduction`)
    }
    else {
      const { id, name } = loginState.userInfo
      this.applyToUnion({ userId: id, unionId, name })
    }
    this.setState({
      visible: false
    })
  }

  // 弹框取消 
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const { data, current, total, union, visible, okText } = this.state
    return (
      <div className={styles.root}>
        <div className={styles.search}>
          <Search
            placeholder="查找社团"
            onSearch={this.handleSearch}
            enterButton
            style={{ width: '20%', marginTop: 60 }}
            size="large"
          />
        </div>
        <Filter
          data={filterDataSource}
          onChange={this.handleFilterChange}
        />
        {
          data.length > 0 ? (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginTop: 30 }}>
              {
                data.map((item, index) => (
                  <Col span={6} key={index}>
                    <Item
                      unionName={item.unionName}
                      introduction={item.introduction}
                      userId={item.userId}
                      unionId={item._id}
                      handleClickDetail={this.handleClickDetail}
                    />
                  </Col>
                ))
              }
            </Row>
          ) : <Empty style={{ marginTop: 50 }} />
        }
        <Pagination
          current={current}
          pageSize={pageSize}
          total={total}
          style={{ float: 'right', marginRight: 30, marginTop: 50 }}
          onChange={this.handlePageChange}
        />
        <DetailModal
          visible={visible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          union={union}
          okText={okText}
        />
      </div >
    )
  }
}

export default connect(
  state => ({
    loginState: state.loginPage
  })
)(withRouter(Union)); 