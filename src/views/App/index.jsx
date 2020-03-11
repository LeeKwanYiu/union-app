import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { increment } from '../../actions/index';
import style from './index.less';

class App extends React.Component {
  onClick() {
    this.props.dispatch(increment());
  }

  onClick2() {
    this.props.dispatch({ type: 'INCREMENT_ASYNC' });
  }

  render() {
    console.log(style);
    return (
      <div className={style.root}>
        <div>react-router 测试</div>
        <nav>
          <ul>
            <li>
              <Link to="/about/">页面一</Link>
            </li>
            <li>
              <Link to="/users/">页面</Link>
            </li>
          </ul>
        </nav>

        <br />
        <div>redux & redux-saga测试</div>
        <div>
          current number： {this.props.number}{' '}
          <button onClick={() => this.onClick()}>点击+1</button>
        </div>
        <div>
          current number： {this.props.number}{' '}
          <button onClick={() => this.onClick2()}>点击2秒后+1</button>
        </div>
      </div>
    );
  }
}
export default connect(state => ({
  number: state.number,
}))(App);
