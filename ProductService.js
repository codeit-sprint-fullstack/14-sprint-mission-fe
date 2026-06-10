import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://panda-market-api-crud.vercel.app'
});

export async function getProductList(page, pageSize, keyword) {
  try{
    const response = await instance.get(`products`, {
        params: {
            page: page,
            pageSize: pageSize,
            keyword: keyword
        }
    });
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getProduct(productId) {
    try {
        const response = await instance.get(`products/${productId}`);
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
}

export async function createProduct({ name, description, price, tags, images }) {
  try {
    const response = await instance.post(`products`, {
        name: name,
        description: description,
        price: price,
        tags: tags,
        images: images
    });
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function patchProduct( productId, updateData ) {
  try {
    const response = await instance.patch(`products/${productId}`, updateData);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function deleteProduct(productId){
    try {
        const response = await instance.delete(`products/${productId}`);
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
}