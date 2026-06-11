async function getProductList(page, pageSize, keyword){
  try{
    const response = await fetch(`https://panda-market-api-crud.vercel.app/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`);
    if(!response.ok){
      console.error('getProductList 에러:', response.status);
      throw new Error('상품 리스트 불러오기 실패');
    }
    const data =  await response.json();
    return data;
  }catch(error){
    console.error(error.message)
  }
}

async function getProduct(productId){
  try{
    const response =  await fetch(`https://panda-market-api-crud.vercel.app/products/${productId}`);
    if(!response.ok){
      console.error('getProduct 에러:', response.status);
      throw new Error('상품 불러오기 실패');
    }
    const data =  await response.json();
    return data;
  }catch(error){
    console.error(error.message)
  }
}

async function createProduct(name, description, price, tags, images){
  const productData = {
    name,
    description,
    price,
    tags,
    images
  };
  try{
    const response = await fetch('https://panda-market-api-crud.vercel.app/products', {
      method: 'POST',
      body: JSON.stringify(productData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(!response.ok){
      console.error('createProduct 에러:', response.status);
      throw new Error('상품 생성 실패');
    }
    const data =  await response.json();
    return data;
  }catch(error) {
    console.error(error.message)
  }
}

async function patchProduct(productId, name, description, price, tags, images){
  const patchData = {
    name,
    description,
    price,
    tags,
    images
  };
  try{
    const response = await fetch(`https://panda-market-api-crud.vercel.app/products/${productId}`, {
      method: 'PATCH',
      body: JSON.stringify(patchData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(!response.ok){
      console.error('patchProduct 에러:', response.status);
      throw new Error('상품 수정 실패');
    }
    const data =  await response.json();
    return data;
  }catch(error){
    console.error(error.message)
  }
}

async function deleteProduct(productId){
  try {
    const response = await fetch(`https://panda-market-api-crud.vercel.app/products/${productId}`, {
      method: 'DELETE',
    })
    if(!response.ok){
      console.error('deleteProduct 에러:', response.status);
      throw new Error('상품 삭제 실패');
    }
    const data =  await response.json();
    return data;
  }catch(error){
    console.error(error.message)
  }
}

export default { 
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
}