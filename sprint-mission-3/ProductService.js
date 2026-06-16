export async function getProductList(page = 1, pageSize = 10, keyword = '') {
  try {
    const url = new URL('https://panda-market-api-crud.vercel.app/products');
    url.searchParams.append('page', page);
    url.searchParams.append('pageSize', pageSize);
    url.searchParams.append('keyword', keyword);

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log('함수 정의부에서 에러: ', error.message);
    throw error;
  }
};

export async function getProduct(id) {
  try {
    const res = await fetch(`https://panda-market-api-crud.vercel.app/products/${id}`);

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();
    return data
  } catch (error) {
    console.log('함수 정의부에서 에러: ', error.message);
    throw error;
  }
};

export async function createProduct(name, description, price, tags, images) {
  const product = {
    name,
    description,
    price,
    tags,
    images,
  };

  try {
    const res = await fetch('https://panda-market-api-crud.vercel.app/products', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log('함수 정의부에서 에러: ', error.message);
    throw error;
  }
};

export async function patchProduct(id, name, description, price, tags, images) {
  const newProduct = {
    name,
    description,
    price,
    tags,
    images,
  };

  try {
    const res = await fetch(`https://panda-market-api-crud.vercel.app/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(newProduct),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log('함수 정의부에서 에러: ', error.message);
    throw error;
  }
};

export async function deleteProduct(id) {
  try {
    const res = await fetch(`https://panda-market-api-crud.vercel.app/products/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.text();
    return data;
  } catch (error) {
    console.log('함수 정의부에서 에러: ', error.message);
    throw error;
  }
};