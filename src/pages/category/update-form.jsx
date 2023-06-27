import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';

const UpdateForm = (props) => {
  const [form] = Form.useForm();
  console.log(props, props.currentCatName, "name")


  useEffect(() => {
    console.log("form useEffect", props, form)
    // 组件初始化，传递form对象
    props.setForm(form)
    form.setFieldValue("categoryName", props.currentCatName)
  }, [props.currentCatName])

  return (
    <Form
      form={form}
      layout="vertical"
    >
      <Form.Item label="分类名称" name="categoryName" initialValue={props.currentCatName} required 
        rules={[{
          required: true, message: "分类名称不能为空"
        }]}
      >
        <Input placeholder="请输入分类名称" />
      </Form.Item>
    </Form>
  )
}

export default UpdateForm