import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Card, List, message } from 'antd'
import { LeftCircleTwoTone } from '@ant-design/icons'
import LinkButton from '../../components/link-button'
import { reqGetCategoryNameById } from '../../api'
import './index.less'

/* 
  商品详情
*/
export default function ProductDetail() {
  const navigate = useNavigate()
  const location = useLocation()
  const [productItem, setProductItem] = useState(location.state.productItem)
  const [cName1, setCName1] = useState("")
  const [cName2, setCName2] = useState("")

  useEffect(() => {
    const { state: { productItem } } = location
    console.log(productItem)
    setProductItem(productItem)
    getProductCategoryName()
  }, [productItem])

  const getProductCategoryName = async () => {
    const { pCategoryId, categoryId } = productItem
    try {
      if (pCategoryId === '0') {
        const result = await reqGetCategoryNameById(categoryId)
        setCName1(result.data.name)
      } else {
        const results = await Promise.all([reqGetCategoryNameById(pCategoryId), reqGetCategoryNameById(categoryId)])
        setCName1(results[0].data.name)
        setCName2(results[1].data.name)
      }
    } catch (error) {
      message.error("获取商品分类失败.")
    }
  }

  return (
    <Card
      title={
        <span>
          <LinkButton onClick={() => navigate(-1)}>
            <LeftCircleTwoTone />
            <span className='back-button' >商品详情</span>
          </LinkButton>
        </span>}>
      <List
        // size="small"
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        // bordered
        dataSource={[{}, {}]}
        // renderItem={(item) => <List.Item>{item}</List.Item>}
        className='product-list'
      />
      <List.Item className='product-item'>
        <span className="product-left">商品名称：</span>
        <span>{productItem.name}</span>
      </List.Item>
      <List.Item className='product-item'>
        <span className="product-left">商品描述：</span>
        <span>{productItem.desc}</span>
      </List.Item>
      <List.Item className='product-item'>
        <span className="product-left">商品价格：</span>
        <span>{productItem.price}元</span>
      </List.Item>
      <List.Item className='product-item'>
        <span className="product-left">所属分类：</span>
        <span>{cName1}{cName2 ? ` ---> ` + cName2 : ''}</span>
      </List.Item>
      <List.Item className='product-item'>
        <span className="product-left">商品图片：</span>
        <span>
          {
            productItem.imgs.map(item => {
              return <img key={item} src={"http://localhost:5000/upload/" + item} alt="product image" />
            })
          }
          {/* <img src="" alt="product image" /> */}
        </span>
      </List.Item>
      <List.Item className='product-item'>
        <span className="product-left">商品详情：</span>
        <span dangerouslySetInnerHTML={{ __html: productItem.detail }}></span>
      </List.Item>
    </Card>
  )
}
