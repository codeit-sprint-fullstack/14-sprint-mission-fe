const PRODUCT_API_URL = 'https://panda-market-api-crud.vercel.app/products';

// ========================================================================================================================
// ★★★★★ getProductList 함수 - 상품 목록 불러오기 ★★★★★
// ========================================================================================================================

export async function getProductList( page, pageSize, keyword ) {
  const getUrl =
  `${PRODUCT_API_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`;

  try {
    const response = await fetch(getUrl, {
      method: 'GET',
    });

    if (!response.ok) {
      console.error(`요청 실패: ${response.status}`);
      throw new Error(`요청 실패: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('getProductList 오류:', error);
    throw error;
  }
}


// ========================================================================================================================
// ★★★★★ getProduct 함수 - 특정 상품 불러오기 ★★★★★
// ========================================================================================================================
export async function getProduct(id) {
  const getUrl = `${PRODUCT_API_URL}/${id}`;

  try {
    const response = await fetch(getUrl, {
      method: 'GET',
    });

    if (!response.ok) {
      console.error(`요청 실패: ${response.status}`);
      throw new Error(`요청 실패: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('getProduct 오류:', error);
    throw error;
  }
}


// ========================================================================================================================
// ★★★★★ createProduct 함수 - 상품 생성하기 ★★★★★
// ========================================================================================================================
export async function createProduct( name, description, price, tags, images ) {
  try {
    const response = await fetch(PRODUCT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, price, tags, images }),
    });

    if (!response.ok) {
      console.error(`요청 실패: ${response.status}`);
      throw new Error(`요청 실패: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('createProduct 오류:', error);
    throw error;
  }
}


// ========================================================================================================================
// ★★★★★ patchProduct 함수 - 상품 수정하기 ★★★★★
// ========================================================================================================================
export async function patchProduct(id, name, description, price, tags, images) {
  const patchUrl = `${PRODUCT_API_URL}/${id}`;

  try {
    const response = await fetch(patchUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, price, tags, images }),
    });

    if (!response.ok) {
      console.error(`요청 실패: ${response.status}`);
      throw new Error(`요청 실패: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('patchProduct 오류:', error);
    throw error;
  }
}


// ========================================================================================================================
// ★★★★★ deleteProduct 함수 - 상품 삭제하기 ★★★★★
// ========================================================================================================================
export async function deleteProduct(id) {
  const deleteUrl = `${PRODUCT_API_URL}/${id}`;

  try {
    const response = await fetch(deleteUrl, {
      method: 'DELETE',
    });

    if (!response.ok) {
      console.error(`요청 실패: ${response.status}`);
      throw new Error(`요청 실패: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('deleteProduct 오류:', error);
    throw error;
  }
}
