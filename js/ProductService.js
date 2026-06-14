async function getProductList({ page = 1, pageSize = 10, keyword }) {
  const url = new URL('https://panda-market-api-crud.vercel.app/products');
  url.searchParams.append('page', String(page));
  url.searchParams.append('pageSize', String(pageSize));
  url.searchParams.append('keyword', keyword);

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`오류 발생: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('getProductList 오류:', error.message);
  }
}

async function getProduct(productId) {
  const url = `https://panda-market-api-crud.vercel.app/products/${productId}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`오류 발생: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('getProduct 오류:', error.message);
  }
}

async function createProduct({ name, description, price, tags, images }) {
  try {
    const res = await fetch('https://panda-market-api-crud.vercel.app/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        price,
        tags,
        images,
      }),
    });
    if (!res.ok) {
      throw new Error(`오류 발생: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('createProduct 오류:', error.message);
  }
}

async function patchProduct(productId, updateData) {
  try {
    const res = await fetch(`https://panda-market-api-crud.vercel.app/products/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    if (!res.ok) {
      throw new Error(`오류 발생: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('patchProduct 오류:', error.message);
  }
}

async function deleteProduct(productId) {
  try {
    const res = await fetch(`https://panda-market-api-crud.vercel.app/products/${productId}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(`오류 발생: ${res.status}`);
    }
    return true;
  } catch (error) {
    console.error('deleteProduct 오류:', error.message);
  }
}


export { getProductList, getProduct, createProduct, patchProduct, deleteProduct };