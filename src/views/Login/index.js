import React from "react";
import { Row, Col, Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined, AntCloudOutlined } from '@ant-design/icons';
import style from './index.less'
import picture from '../../picture/icon.png'

const FormItem = Form.Item;
const { Meta } = Card;


class LoginPage extends React.Component {
  // 判断是否登录过，若登录过直接跳转到主页
  componentDidMount() {
    // const { history } = this.props;
    // const token = getToken();
    // if (token) {
    //   history.push("/home");
    // }
  }

  // 验证工号
  validateUserAccount = (rule, value, callback) => {
    const valid = /^[0-9]{9}$/;
    if (!valid.test(value) || !value) {
      callback("请输入正确的工号");
    } else {
      callback();
    }
  };


  // 提交登录信息
  handleSubmit = e => {

  };

  render() {
    const form = (
      <Form onFinish={this.handleSubmit} className="login-form">
        <FormItem
          hasFeedback
          name="username"
          rules={[
            {
              required: true,
              message: "请输入学生号"
            }
          ]}>
          <Input
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="请输入学生号"
          />
        </FormItem>
        <FormItem
          hasFeedback
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码"
            }
          ]}>
          <Input
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="请输入密码"
          />
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
        </FormItem>
      </Form >
    );
    return (
      <div className={style.root}>
        <Row type="flex" justify="center" align="middle">
          <Col>
            <Card
              hoverable
              bordered={false}
              cover={
                <div className={style.top}>
                  <img className={style.picture} src={picture} alt="picture" />
                  {form}
                </div>}
            >
              <Meta
                avatar={
                  <AntCloudOutlined
                    type="ant-design"
                    style={{
                      color: "#1890ff",
                      fontSize: 28,
                    }}
                  />
                }
                title="Union Management System"
                description="   面向社团的分布式团队协作管理系统"
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default LoginPage

