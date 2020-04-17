import React from 'react';
import { Layout } from 'antd';
import UserAvatar from '../UserAvatar'
import HeaderNav from '../HeaderNav';
import SiderNav from '../SiderNav';
import styles from './PageLayout.less';

const { Content, Header } = Layout
/**
 * PageLayout组件
 * 定义整个页面的布局
 */
class PageLayout extends React.Component {
  componentDidMount() {

  }

  render() {
    const { role } = this.props
    if (role === 'admin') {
      return (
        <Layout className={styles.adminRoot}>
          <Header>
            <div style={{ float: 'right' }}>
              <UserAvatar />
            </div>
          </Header>
          <Layout>
            <SiderNav />
            <Layout className={styles.contentLayout}>
              <Content className={styles.content}>
                {
                  this.props.children
                }
              </Content>
            </Layout>
          </Layout>
        </Layout>
      )
    }
    else {
      return (
        <Layout className={styles.root}>
          <HeaderNav />
          <Content>
            {
              this.props.children
            }
          </Content>
        </Layout>
      );
    }
  }
}
// export default connect(state => ({
//   number: state.number,
// }))(App);

export default PageLayout