import React, { useState, useEffect } from 'react'
import { Card, Button, Table, message, Modal } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button'
import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api/index'
import './index.less'
import UpdateForm from './update-form';
import AddForm from './add-form';

export default function Category() {
  const [categoryLists, setCategoryLists] = useState([])
  const [columns, setColumns] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [subCategorys, setSubCategorys] = useState([])
  const [parentId, setParentId] = useState("0")
  const [parentName, setParentName] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(0);
  const [currentCatName, setCurrentCatName] = useState("") // 修改的分类对象名称
  const [currentCatId, setCurrentCatId] = useState("") // 修改的分类对象名称
  const [currentForm, setCurrentForm] = useState({}) // 当前操作的表单对象

  const showModal = (currentCat) => {
    // 清空表单内的数据
    // console.log("currentCat .>", currentCat)
    setCurrentCatName(currentCat.name)
    setCurrentCatId(currentCat._id)
    // currentForm.setFieldValue("categoryName",currentCat.name)

    setIsModalOpen("1");
    // console.log("currentCatName", currentCatName, "currentCatName", currentCat, currentForm)
  };
  const handleOk = (type) => {
    if (type === "update") { // 更新分类的ok
      // 更新分类
      updateCategory()
    } else {
      // 添加分类
      addCategory()
    }
  };

  const handleCancel = (type) => {
    if (type === "update") { // 更新分类的取消
      // 清空表单内的数据
      currentForm.resetFields()
      setCurrentCatName("")
      setCurrentCatId("")
    } else {
      // 清空表单内的数据
      currentForm.resetFields()
    }
    setIsModalOpen("0");
  };

  const addCategory = async () => {
    try {
      // console.log("values >>", currentForm.validateFields())
      // 1. 获取表单中的值
      const { categorys, categoryName } = await currentForm.validateFields()

      // 2. 发送请求，添加分类
      const result = await reqAddCategory(categorys, categoryName)
      if (result.status === 0) {
        message.success("添加分类成功。")
      } else {
        message.error("添加分类失败。")
      }
      
      /* 
        目前的问题， 添加分类，可能出现添加后刷新页面的问题
      */
      if (categorys === currentCatId) {
        // 添加的分类id等于当前分类id
        // 重新刷新表格
        getCategoryLists()
      } else if (categorys === "0") { // 在二级分类列表下添加一级分类，重新获取一级分类列表，但是不需要显示一级列表。
        // 无需刷新表格
        getCategoryLists()
      }

      // 清空表单内的数据
      currentForm.resetFields()
      // setCurrentCatName("")
      // setCurrentCatId("")

      // 隐藏弹出层
      setIsModalOpen("0");
    } catch (errorInfo) {
      console.log("errorInfo", errorInfo)
      message.error("表单中的数据不合法。")
    }
  }

  const updateCategory = async () => {
    // 验证表单中的数据
    try {
      // 1. 获取表单中的值
      const { categoryName } = await currentForm.validateFields()
      const categoryId = currentCatId

      // 2. 发送请求，修改分类项
      const result = await reqUpdateCategory({ categoryId, categoryName })
      if (result.status === 0) {
        message.success("更新分类成功。")
      } else {
        message.error("更新分类失败。")
      }
      // 隐藏弹出层
      setIsModalOpen("0");

      // 清空表单内的数据
      currentForm.resetFields()
      setCurrentCatName("")
      setCurrentCatId("")

      // 重新刷新表格
      getCategoryLists()
    } catch (errorInfo) {
      message.error("表单中的数据不合法。")
    }
  }

  const getSubCate = (record) => {
    // console.log("record", record) 
    setParentId(record._id)
    setParentName(record.name)
  }

  const showCategorys = () => {
    setParentId("0")
    setSubCategorys([])
    setParentName("")
  }

  const initColumns = () => {
    const columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        width: "300px",
        render: (record) => {
          return (
            <span>
              <LinkButton onClick={() => {
                setCurrentCatName(record.name)
                setCurrentCatId(record._id)
                showModal(record)
              }}>修改分类</LinkButton>
              {
                parentId === '0' ? <LinkButton onClick={() => {
                  setCurrentCatId(record._id)
                  getSubCate(record)
                }}>查看子分类</LinkButton> : null
              }
            </span>
          )
        }
      },
    ];
    setColumns(columns)
  }

  const getCategoryLists = async (currentCatId) => {
    // console.log("getCategoryLists", currentCatId, parentId)
    setIsLoading(true)
    const currentId = currentCatId || parentId
    const result = await reqCategorys(currentId)
    setIsLoading(false)
    if (result.status === 0) {
      if (parentId === "0") {
        setCategoryLists(result.data)
      } else {
        setSubCategorys(result.data)
      }
    } else {
      message.error("获取分类列表失败。")
    }
  }

  useEffect(() => {
    getCategoryLists()

    initColumns()
  }, [parentId])

  return (
    <Card
      title={parentId === "0" ? "一级分类列表" :
        (
          <span>
            <LinkButton onClick={showCategorys}>{"一级分类列表"}</LinkButton>
            <ArrowRightOutlined style={{ margin: "0 10px" }} />
            <span>{parentName}</span>
          </span>
        )
      }
      extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => {
        setIsModalOpen("2");
      }}>添加</Button>}
      className='category-card'
    >
      <Table
        dataSource={parentId === "0" ? categoryLists : subCategorys}
        columns={columns}
        bordered
        loading={isLoading}
        pagination={{
          defaultPageSize: 5,
          showQuickJumper: true,
          // showSizeChanger: true,
        }}
        rowKey={(record) => record._id}
      />

      <Modal title="更新分类"
        open={isModalOpen === '1' ? true : false}
        onOk={() => { handleOk("update") }}
        onCancel={() => { handleCancel("update") }}>
        <UpdateForm currentCatName={currentCatName} setForm={(form) => {
          // console.log("setForm  form ,,,", form)
          setCurrentForm(form)
        }} />
      </Modal>
      <Modal title="添加分类"
        open={isModalOpen === "2" ? true : false}
        onOk={() => { handleOk("add") }}
        onCancel={() => { handleCancel("add") }}>
        <AddForm categoryLists={categoryLists} parentId={parentId} currentCatId={currentCatId} setForm={(form) => {
          // console.log(categoryLists, "categoryLists")
          setCurrentForm(form)
        }} />
      </Modal>
    </Card>
  )
}
