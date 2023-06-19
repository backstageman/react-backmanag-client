/* 
  发送ajax请求的函数模块
  函数返回一个promise对象实例
*/
import axios from 'axios'
import { message } from 'antd'

export default function ajax(url, data = {}, method = "GET") {
  return new Promise((resolve, reject) => {
    let promise

    if (method.toLocaleUpperCase() === 'GET') {
      promise = axios.get(url, {
        params: data
      })
    } else if (method.toLocaleUpperCase() === 'POST') {
      promise = axios.post(url, data)
    }

    promise.then(response => {
      resolve(response.data)
    }).catch(error => {
      // messageApi.error("请求出错!", error.message)
      message.error("请求出错: " + error.message)
    })
  })
}