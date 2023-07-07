/* 
  根据接口定义接口请求。
  包含应用中所有接口请求函数的模块
  每个函数的返回值都是promise
*/
import ajax from "./ajax";
const BASE = ''

// 登陆
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST')


// 添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')

// 获取天气
export const reqWeather = (key = "4d99be79572df9b72cd339db0d22fad7", cityAdcode = "310104") => ajax("https://restapi.amap.com/v3/weather/weatherInfo?parameters", { key, city: cityAdcode }, "GET")

// 获取当前的城市

// 获取分类列表
export const reqCategorys = (parentId) => ajax('/manage/category/list', { parentId })
// 添加分类
export const reqAddCategory = (parentId, categoryName) => ajax('/manage/category/add', { parentId: parentId, categoryName: categoryName }, "POST")
// 更新分类
export const reqUpdateCategory = ({ categoryId, categoryName }) => ajax('/manage/category/update', { categoryId, categoryName }, "POST")

// 获取商品分页列表
export const reqGetProducts = (pageNum, pageSize) => ajax(`/api1/manage/product/list`, { pageNum, pageSize })

// 搜索获取商品列表
export const reqQueryProducts = ({ pageNum, pageSize, searchValue, searchType }) => ajax(`/api1/manage/product/search`, {
  pageNum, pageSize, [searchType]: searchValue
})

// 根据分类ID获取分类
export const reqGetCategoryNameById = (categoryId) => ajax('/api1/manage/category/info', {
  categoryId
})

// 商品上架、下架
export const reqUpdataStatus = (productId, status) => ajax("/api1/manage/product/updateStatus", {
  productId, status
}, "POST")