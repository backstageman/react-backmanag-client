import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import {message} from 'antd'
import memoryUtils from '../../utils/memoryUtils'

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
    <div>
      Admin {user.username}
    </div>
  )
}

export default Admin