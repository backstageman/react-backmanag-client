import { Navigate } from 'react-router-dom'
import Home from '../pages/home'

// 生成路由表
export default [
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "news",
        element: <News />,
      },
      {
        path: "message",
        element: <Message />,
      },
    ]
  },
  {
    path: "/",
    element: <Navigate to={"/about"} />,
  },
]