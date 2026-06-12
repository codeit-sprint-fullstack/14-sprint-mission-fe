import axios from "axios"

const instance = axios.create({
  baseURL: 'https://panda-market-api-crud.vercel.app'
})

async function getProductList(params = {}) {
  try {
    const res = await instance.get('/products', { params, })
    return res.data
  } catch (e) {
    console.log('에러 발생: ', e.message)
    throw e
  }
}

async function getProduct(id) {
  try {
    const res = await instance.get(`/products/${id}`)
    return res.data
  } catch (e) {
    console.log('에러 발생: ', e.message)
    throw e
  }
}

async function createProduct(productData) {
  try {
    const res = await instance.post('/products', productData)
    return res.data
  } catch (e) {
    console.log('에러 발생: ', e.message)
    throw e
  }
}

async function patchProduct(id, productData) {
  try {
    const res = await instance.patch(`/products/${id}`, productData)
    return res.data
  } catch (e) {
    console.log('에러 발생: ', e.message)
    throw e
  }
}

async function deleteProduct(id) {
  try {
    const res = await instance.delete(`/products/${id}`)
    return res.data
  } catch (e) {
    console.log('에러 발생: ', e.message)
    throw e
  }
}

export default {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
}