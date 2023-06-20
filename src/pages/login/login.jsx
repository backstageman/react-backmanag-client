import React from 'react'
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './login.less'
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils';

// login组件，登录页
function Login() {
  const navigate = useNavigate()

  // 判断用户是否登录
  const user = memoryUtils.user
  if (user && user._id) {
    // 已经登陆过，跳转到Admin主页
    return (
      <Routes >
        <Route path="/" element={<Navigate to={'/'} />} />
      </Routes>
    )
  }

  const validatePwd = (rule, value) => {
    if (!value.trim()) {
      return Promise.reject(new Error("请输入密码"))
    } else if (value.trim().length < 4) {
      return Promise.reject(new Error("密码不能小于4位"))
    } else if (value.trim().length > 12) {
      return Promise.reject(new Error("密码不能超过12位"))
    } else if (!(/^[a-zA-Z0-9_]+$/.test(value))) {
      return Promise.reject(new Error("密码必须是英文、数字或下划线组成"))
    }
    return Promise.resolve()
  }

  const onFinish = async (values) => {
    console.log('Success:', values);
    const { username, password } = values
    const response = await reqLogin(username, password)
    console.log('成功了', response)
    if (response.status === 0) {
      message.success("登陆成功")
      // 路由组件跳转到/
      navigate("/", { replace: true })
      // 持久化用户数据
      storageUtils.saveUser(response.data)
      memoryUtils.user = response.data
    } else {
      message.error("用户名或密码错误！")
    }

  };

  return (
    <div className='login'>
      <header className='login-header'>
        <img src={logo} alt="logo" />
        <h1>React项目：后台管理系统</h1>
      </header>
      <section className='login-content'>
        <h2>用户登录</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入用户名!' },
              { min: 4, message: '用户名不能小于4位!' },
              { max: 12, message: '用户名不能超过12位!' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ validator: validatePwd }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button subBtn">
              登陆
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  )
}

export default Login