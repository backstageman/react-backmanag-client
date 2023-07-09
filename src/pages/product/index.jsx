import React, { useState, useEffect } from 'react'
import { Card, Table, Button, Select, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons';
import './index.less'
import LinkButton from '../../components/link-button';
import { reqGetProducts, reqQueryProducts, reqUpdataStatus } from '../../api'

const { Option } = Select

/* 
  商品列表页
*/
export default function Product() {
  const [columns, setColumns] = useState([])
  let [dataSource, setDataSource] = useState([])
  let [pageNum, setPageNum] = useState(1)
  let [pageSize, setPageSize] = useState(3)
  let [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [searchType, setSearchType] = useState("productName")
  const [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate()

  // 获取商品列表
  const getProducts = async (pageNum, pageSize) => {
    // 把分页信息存储到storage中
    localStorage.setItem("pageNum", pageNum)
    localStorage.setItem("pageSize", pageSize)
    setPageNum(pageNum)
    setPageSize(pageSize)
    setIsLoading(true)
    let result;
    if (searchValue.trim().length !== 0) {
      result = await reqQueryProducts({ pageNum, pageSize, searchValue, searchType })
    } else {
      result = await reqGetProducts(pageNum, pageSize)
    }
    setIsLoading(false)
    if (result.status === 0) {
      const { total, list, pageNum, pageSize } = result.data
      setTotal(total)
      setDataSource(list)
      setPageNum(pageNum)
      setPageSize(pageSize)
    } else {
      message.error("获取商品接口出错.")
    }
  }

  useEffect(() => {
    initTable()

    // 获取商品条目
    getProducts(pageNum, pageSize)
  }, [])

  const goToProductDetail = (_, record) => {
    // 跳转到详情页，并把商品信息带过去
    navigate("detail", {
      state: {
        productItem: record
      }
    })
  }

  const updataStatus = async (product) => {
    const { _id, status } = product
    const newStatus = status === 1 ? 2 : 1;
    const result = await reqUpdataStatus(_id, newStatus)
    if (result.status === 0) {
      message.success("操作成功.")
    } else {
      message.error("操作失败.请求出错")
    }
    // 从localStorage中取分页信息
    const pageNum = localStorage.getItem("pageNum")
    const pageSize = localStorage.getItem("pageSize")
    // 重新刷新列表
    getProducts(pageNum, pageSize)
  }

  const initTable = () => {
    setColumns([
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => "￥" + price
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (_, record) => {
          const { status } = record
          return (<>
            {/* 
            1  代表在售
            2  代表已下架
          */}
            <Button type="primary" danger={status === 1} onClick={() => { updataStatus(record) }} >{status === 1 ? "下架" : "上架"}</Button><br />
            <span>{status === 1 ? "在售" : "已下架"}</span>
          </>)
        }
      },
      {
        title: '状态',
        dataIndex: 'age',
        render: (_, record) => (
          <>
            <LinkButton onClick={() => { goToProductDetail(_, record) }}>详情</LinkButton>
            <LinkButton >修改</LinkButton>
          </>
        )
      }
    ])
  }

  const goToAddPage = () => {
    // 跳转到商品添加页
    navigate("add")
  }

  return (
    <Card title={
      <>
        <Select value={"productName"} className='product-title' onChange={value => setSearchType(value)} >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>

        <Input placeholder='关键字' className='product-input' value={searchValue} onChange={e => setSearchValue(e.target.value)} />

        <Button type="primary" onClick={(event) => getProducts(pageNum, pageSize)}>搜索</Button>
      </>
    }
      extra={<Button icon={<PlusOutlined />} type="primary" onClick={goToAddPage}>添加商品</Button>}
    >
      <Table
        bordered
        rowKey={"_id"}
        loading={isLoading}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          current: pageNum,
          defaultPageSize: pageSize,
          pageSize,
          total,
          // showTotal,
          showQuickJumper: true,
          onChange: (curPageNum, curPageSize) => { getProducts(curPageNum, curPageSize) }
        }}
      // onChange={}
      /* onChange={(pagination, filters, sorter, extra) => {getProducts(pagination, filters, sorter, extra)}} */
      />
    </Card>
  )
}
