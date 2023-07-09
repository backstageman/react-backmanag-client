import React, { } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Select, Input, Form } from 'antd'
import LinkButton from '../../components/link-button'
import { LeftCircleTwoTone } from '@ant-design/icons'

const { TextArea } = Input

/* 
  商品新增、更新
*/
const formItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 9,
  },
}

export default function ProductAdd() {
  const navigate = useNavigate()
  const [form] = Form.useForm();

  return (
    <Card
      title={
        <span>
          <LinkButton onClick={() => navigate(-1)}>
            <LeftCircleTwoTone />
            <span className='back-button' >商品添加/更新</span>
          </LinkButton>
        </span>}
    >
      <Form
        form={form}
        name="dynamic_rule"
      // la
      // labelCol={formItemLayout}
      >
        <Form.Item
          {...formItemLayout}
          name="username"
          label="商品名称"
          rules={[
            {
              required: true,
              message: 'Please input your name',
            },
          ]}
        >
          <Input placeholder="请输入商品名称" allowClear />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="productDesc"
          label="商品描述"
          rules={[
            {
              required: true,
              message: 'Please input your nickname',
            },
          ]}
        >
          <TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2 }} allowClear showCount maxLength={500} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="price"
          label="商品价格"
          rules={[
            {
              required: true,
              message: 'Please input your nickname',
            },
          ]}
        >
          <Input placeholder="请输入商品价格" addonAfter="元" allowClear />
        </Form.Item>
      </Form>
    </Card >
  )
}
