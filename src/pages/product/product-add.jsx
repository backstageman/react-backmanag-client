import React from 'react'
import { Card, Button, Select, Input } from 'antd'

/* 
  商品新增、更新
*/
const { Option } = Select

export default function ProductAdd() {

  return (
    <Card title={
      <>
        <Select value={"1"}>
          <Option value="1">按名称搜索</Option>
          <Option value="2">按描述搜索</Option>
        </Select>

        <Input placeholder='关键字' />

        <Button>搜索</Button>
      </>
    }>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  )
}
