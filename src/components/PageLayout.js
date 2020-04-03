import React from 'react';
import { Layout } from 'antd';
import HeaderNav from './HeaderNav';
import styles from './PageLayout.less';

const { Content } = Layout
/**
 * PageLayout组件
 * 定义整个页面的布局
 */
class PageLayout extends React.Component {
  componentDidMount() {

  }

  render() {
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
// export default connect(state => ({
//   number: state.number,
// }))(App);

export default PageLayout