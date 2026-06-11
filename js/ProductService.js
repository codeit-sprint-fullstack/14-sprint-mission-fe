export const BASE_URL =
  'https://panda-market-api-crud.vercel.app';


async function getProductList(
  page = 1,
  pageSize = 10,
  keyword = '',
  orderBy = 'recent') {
  try {
    const query =
      `?page=${page}` +
      `&pageSize=${pageSize}` +
      `&keyword=${keyword}` +
      `&orderBy=${orderBy}`;

    const response = await fetch(`${BASE_URL}/products${query}`)

    if (!response.ok) {
      console.log(`에러: ${response.status}`);
      throw new Error('상품 목록 조회 실패');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getProduct(productId) {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`);

    if (!response.ok) {
      console.error(`에러: ${response.status}`);
      throw new Error(`상품 조회 실패`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function createProduct(name, description, price, tags, images) {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        price,
        tags,
        images
      }),
    });

    if (!response.ok) {
      console.error(`에러: ${response.status}`);
      throw new Error('상품 생성 실패')
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function patchProduct(productId, name, description, price, tags, images) {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        price,
        tags,
        images
      }),
    });

    if (!response.ok) {
      console.error(`에러: ${response.status}`);
      throw new Error('상품 수정 실패')
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
  }
}

async function deleteProduct(productId) {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      console.error(`에러: ${response.status}`);
      throw new Error('상품 삭제 실패');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
  }
}


export {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,

};