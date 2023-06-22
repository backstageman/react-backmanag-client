/* 
  根据接口定义接口请求。
  包含应用中所有接口请求函数的模块
  每个函数的返回值都是promise
*/
import ajax from "./ajax";

// 登陆
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST')


// 添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')

// 获取天气
export const reqWeather = (key = "4d99be79572df9b72cd339db0d22fad7", cityAdcode = "310104") => ajax("https://restapi.amap.com/v3/weather/weatherInfo?parameters", { key, city: cityAdcode }, "GET")

// 获取当前的城市