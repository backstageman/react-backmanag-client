import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd';
import logo from '../../assets/images/logo.png'
import './index.less'
import menuConfig from '../../config/menuConfig'

const LeftNav = () => {
  const [items, setItems] = useState([])
  const [defaultOpenKeys, setDefaultOpenKeys] = useState([])
  // 获取当前的路由location对象
  const location = useLocation()
  let openKey = []
  useEffect(() => {
    // 初始化设置菜单项
    setItems(createMenuList(menuConfig))
  }, [])

  // 使用数组的map方法生成菜单item项
  /* const createMenuList = (menuConfig) => {
     return menuConfig.map(item => {
       if (item.children && item.children.length) {
         return {
           label: item.title,
           key: item.key, icon: item.icon, children: createMenuList(item.children)
         }
       } else {
         return { label: <Link to={item.key}>{item.title}</Link>, key: item.key, icon: item.icon }
       }
     })
   } */

  // 使用数组的reduce方法生成菜单item项
  const createMenuList = (menuConfig) => {
    return menuConfig.reduce((pre, current) => {
      if (current.children && current.children.length) {
        // 查找与当前路径匹配的子菜单项
        const cItem = current.children.find(cItem => cItem.key === location.pathname)
        cItem && (openKey.push(cItem.parent))
        console.log("openkey", openKey)
        pre.push({
          label: current.title,
          key: current.key, icon: current.icon, children: createMenuList(current.children)
        })
      } else {
        pre.push({ label: <Link to={current.key}>{current.title}</Link>, key: current.key, icon: current.icon })
      }
      return pre
    }, [])
  }

  return (
    <>
      <div className="left-nav">
        <Link to={"/"}>
          <header className="left-nav-header">
            <img src={logo} alt="logo" />
            <h2>后台管理系统</h2>
          </header>
        </Link>
        <Menu
          selectedKeys={[location.pathname]}
          defaultOpenKeys={openKey}
          mode="inline"
          theme="dark"
          items={items}
        />
      </div>
    </>
  )
}

export default LeftNav