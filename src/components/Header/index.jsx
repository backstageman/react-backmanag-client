import React, { useEffect, useState } from "react";
import { Modal } from 'antd';
import './index.less'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from "../../utils/storageUtils";
import { reqWeather } from '../../api'
import { useLocation, useNavigate } from 'react-router-dom'
import LinkButton from '../link-button'
import menuList from '../../config/menuConfig'

export default function Header() {
  const [currentTime, setCurrentTime] = useState(formateDate(Date.now()))
  const [weatherInfo, setWeatherInfo] = useState({})
  const [routeTitle, setRouteTitle] = useState("")
  const { pathname } = useLocation()
  const navigate = useNavigate()
  let username = memoryUtils.user.username

  const getRouteTile = () => {
    menuList.forEach(item => {
      if (item.key === pathname) {
        setRouteTitle(item.title)
      } else if (item.children) {
        const menuItem = item.children.find(cItem => cItem.key === pathname)
        menuItem && setRouteTitle(menuItem.title)
      }
    })
  }

  const getWeather = async () => {
    // 获取天气
    const result = await reqWeather()
    // console.log(result)
    if (result && result.status === "1") {
      setWeatherInfo(result.lives[0])
    }
  }

  // 退出登录
  const logout = (event) => {
    event.preventDefault()
    Modal.confirm({
      mask: true,
      okText: "确认",
      cancelText: "取消",
      content: "确定退出登录?",
      maskClosable: true,
      onOk: () => {
        // 清除用户数据
        storageUtils.removeUser()
        memoryUtils.user = {}

        // 跳转到登录页面
        navigate('/login', {
          replace: false
        })
      }
    })
  }

  useEffect(() => {
    let timer = setInterval(() => {
      setCurrentTime(formateDate(Date.now()))
    }, 1000)

    getWeather()
    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    // 获取用户当前路径的title
    getRouteTile()
    // console.log("routeTitle", routeTitle, pathname)
  }, [pathname])


  return (
    <div className="header">
      <div className="header-top">
        <span>欢迎，{username}</span><LinkButton onClick={logout}>退出</LinkButton>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">{routeTitle}</div>
        <div className="header-bottom-right">
          <span>{currentTime}</span>
          <span className="city">{"城市"}</span>
          <span>{weatherInfo.weather}</span>
        </div>
      </div>
    </div>
  )
}