import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/login/login'
import Home from './pages/home/home'
import Admin from './pages/admin/Admin'
// import Admin from './pages/admin/Admin'
import Product from './pages/product'
import Category from './pages/category'
import User from './pages/user'
import Role from './pages/role'
import Bar from './pages/charts/bar'
import Line from './pages/charts/line'
import Pie from './pages/charts/pie'
import Order from './pages/order'
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
          <Route path="/" element={<Admin />} >
            <Route path="/home" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/product" element={<Product />} />
            <Route path="/user" element={<User />} />
            <Route path="/role" element={<Role />} />
            <Route path="/bar" element={<Bar />} />
            <Route path="/line" element={<Line />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/order" element={<Order />} />
            <Route path="/" element={<Navigate to={'/home'} />} />
          </Route>
        </Routes>
      </ConfigProvider>
    </BrowserRouter>
  )
}