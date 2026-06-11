import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://panda-market-api-crud.vercel.app/products'}
)

export async function getProductList(
  page = 1,
  pageSize = 10,
  keyword = '',
) {try 
  {
  const res = await instance.get('/',
    { params: {
      page,
      pageSize,
      keyword,
    },
  }
  )
  return res.data
} catch(e) {
  console.error(e.message)
}
}


export async function getProduct(productId) {
  try {
    const res = await instance.get(`/${productId}`)
    return res.data
  } catch(e) {
    console.error(e.message)
  }
}


export async function createProduct(
  name,
  description, 
  price, 
  tags,
  images,
) {try 
  {
  const res = await instance.post('/',
    {
      name, 
      description,
      price,
      tags,
      images,
    }
  )
  return res.data
} catch(e) {
  console.error(e.message)
}
}


export async function patchProduct(
  productId,
  name,
  description,
  price,
  tags,
  images,
) { try {
    const res = await instance.patch(
      `/${productId}`, 
    {
      name,
      description,
      price,
      tags,
      images,
    },
  )
  return res.data
  } catch(e) {
  console.error(e.message)
  }
} 

export async function deleteProduct(productId) 
{ try {
    const res = await instance.delete(`/${productId}`)  
    return res.data
  } catch(e) {
    console.error(e.message)
  }
}
