import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { message, Layout, Space } from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import Header from '../../components/Header'
import LeftNav from '../../components/LeftNav'
import './index.less'
const { Footer, Sider, Content } = Layout;

const Admin = () => {

  const user = memoryUtils.user
  if (!user || !user._id) {
    message.warning("抱歉，您未登录，请先登陆。3秒后将为您跳转登陆页面。")
    return (
      <Routes >
        <Route path="/" element={<Navigate to={'/login'} />} />
      </Routes>
    )
  }
  return (
    <Layout className='fullHeight'>
      <Sider >
        <LeftNav />
      </Sider>
      <Layout> 
        <Header className="header" >Header</Header>
        <Content >Content</Content>
        <Footer className='footer'>
          推荐使用谷歌浏览器，以获得更加的体验。&copy;XX后台管理系统所有
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Admin