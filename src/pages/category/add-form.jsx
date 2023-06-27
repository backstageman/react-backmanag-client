import React, { useState, useEffect } from 'react'
import { Select, Form, Input } from 'antd';

const { Option } = Select;

const AddForm = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    props.setForm(form)
    form.setFieldValue("categoryName", "")
    // console.log(props, "add")
    const initCategoryId = props.currentCatId || props.parentId
    form.setFieldValue("categorys", initCategoryId)
  }, [props.parentId, props.currentCatId, props.categoryLists])


  return (
    <Form
      form={form}
      layout="vertical"
    // initialValues={{ requiredMarkValue: requiredMark }}
    >
      <Form.Item label="分类项目" name="categorys" initialValue={props.currentCatId || "0"}
        rules={[
          {required: true, message: "必须选择一个所属分类"}
        ]}
      >
        <Select>
          <Option value='0'>一级分类</Option>
          {
            props.categoryLists.map(item => {
              return <Option value={item._id} key={item._id}>{item.name}</Option>
            })
          }
        </Select>
      </Form.Item>
      <Form.Item
        label="分类名称"
        name="categoryName"
        rules={[
          {required: true, message: "分类名称必填"}
        ]}
      >
        <Input placeholder="请输入分类名称" />
      </Form.Item>
    </Form>
  )

}

export default AddForm