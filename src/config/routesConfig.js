import { Navigate } from 'react-router-dom'
import Login from '../pages/login/login'
import Home from '../pages/home/home'
import Admin from '../pages/admin/Admin'
// import Admin from '../pages/admin/Admin'
import Product from '../pages/product'
import ProductAdd from '../pages/product/product-add'
import ProductDetail from '../pages/product/product-detail'
import Category from '../pages/category'
import User from '../pages/user'
import Role from '../pages/role'
import Bar from '../pages/charts/bar'
import Line from '../pages/charts/line'
import Pie from '../pages/charts/pie'
import Order from '../pages/order'

// 生成路由表
export default [
  {
    path: "/",
    element: <Admin />,
    children: [
      {
        path: "product",
        element: <Product />,
     /*    children: [
          {
            path: "add",
            element: <ProductAdd />,
          },
          {
            path: "detail",
            element: <ProductDetail />,
          },
        ] */
      },
      {
        path: "product/add",
        element: <ProductAdd />,
      },
      {
        path: "product/detail",
        element: <ProductDetail />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/role",
        element: <Role />,
      },
      {
        path: "/bar",
        element: <Bar />,
      },
      {
        path: "/line",
        element: <Line />,
      },
      {
        path: "/pie",
        element: <Pie />,
      },
      {
        path: "/order",
        element: <Order />,
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Navigate to={"/"} />,
  },
]