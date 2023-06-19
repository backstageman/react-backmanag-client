import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login/login'
import Home from './pages/home/home'
import Admin from './pages/admin/Admin'
import memoryUtils from './utils/memoryUtils';
import storageUtils from './utils/storageUtils';

// 根组件
export default function App() {
  // 保存用户登录信息
  const user = storageUtils.getUser()
  memoryUtils.user = user
  
  return (
    <BrowserRouter >
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00b96b',
          },
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Admin />} />
        </Routes>
      </ConfigProvider>
    </BrowserRouter>
  )
}