import React, { useState, useEffect } from 'react'
import { Card, Table, Button, Select, Input, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import './index.less'
import LinkButton from '../../components/link-button';
import { reqGetProducts, reqQueryProducts } from '../../api'

const { Option } = Select

/* 
  商品新增、更新
*/
export default function Product() {
  const [columns, setColumns] = useState([])
  let [dataSource, setDataSource] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(3)
  let [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [searchType, setSearchType] = useState("productName")
  const [searchValue, setSearchValue] = useState("")

  const getProducts = async (pageNum, pageSize) => {
    setPageNum(pageNum)
    setPageSize(pageSize)
    setIsLoading(true)
    let result;
    if (searchValue.trim().length !== 0) {
      console.log(" ?>>>>", pageNum, pageSize, searchValue, searchType)
      result = await reqQueryProducts({ pageNum, pageSize, searchValue, searchType })
    } else {
      result = await reqGetProducts(pageNum, pageSize)
    }
    setIsLoading(false)
    console.log(result)
    if (result.status === 0) {
      const { total, list } = result.data
      setTotal(total)
      setDataSource(list)
    } else {
      message.error("获取商品接口出错.")
    }
  }

  useEffect(() => {
    initTable()

    // 获取商品条目
    getProducts(pageNum, pageSize)
  }, [])

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
        render: (_, record) => (
          <>
            <Button type="primary">下架</Button><br />
            <span>在售</span>
          </>
        )
      },
      {
        title: '状态',
        dataIndex: 'age',
        render: (_, record) => (
          <>
            <LinkButton >详情</LinkButton>
            <LinkButton >修改</LinkButton>
          </>
        )
      }
    ])
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
      extra={<Button icon={<PlusOutlined />} type="primary">添加商品</Button>}
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
          onChange: getProducts
        }}
      // onChange={}
      />
    </Card>
  )
}
