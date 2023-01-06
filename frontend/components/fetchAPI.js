import axios from 'axios'
import { useState } from 'react'
const productsUrl = 'http://127.0.0.1:8000/api/products/'
const categoriesUrl = 'http://127.0.0.1:8000/api/categories/'
const [productList, setProductsList] = useState([])
const [searchList, setSearchList] = useState([])
const getProductList = async (setProductsList) => {
  try {
    const response = await axios.get(productsUrl)
    setProductsList(response.data)
  } catch (err) {
    console.info(err)
  }
}

const searchFor = async (input) => {
  try {
    const response = await axios.get(productsUrl + `?search=${input}`)
    setProductsList(response.data)
  } catch (err) {
    console.info(err)
  }
}

export { getProductList, searchFor }
