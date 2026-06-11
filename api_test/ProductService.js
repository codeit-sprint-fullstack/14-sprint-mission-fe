const baseURL = "https://panda-market-api-crud.vercel.app";
function buildProductListUrl({ page = 1, pageSize = 10, keyword = "" } = {}) {
  const url = new URL("/products", baseURL);
  url.searchParams.set("page", page);
  url.searchParams.set("pageSize", pageSize);

  if (keyword) {
    url.searchParams.set("keyword", keyword);
  }

  return url;
}
async function parseJson(res) {
  const text = await res.text();

  if (!text) {
    return null;
  }

  return JSON.parse(text);
}
async function handleProductRes(res) {
  const data = await parseJson(res);

  if (!res.ok) {
    const message = data?.message || `요청 실패. 에러 코드 : ${res.status}`;
    const error = new Error(message);
    error.isLoggedIn = true;
    console.error(message);
    throw error;
  }

  return data;
}
function handleProductError(error) {
  if (!error.isLoggedIn) {
    console.error(error.message);
  }

  return null;
}
export async function getProductList({ page = 1, pageSize = 10, keyword = "" } = {}) {
  try {
    const response = await fetch(buildProductListUrl({ page, pageSize, keyword }), {
      method: "GET",
    });

    return await handleProductRes(response);
  } catch (error) {
    return handleProductError(error);
  }
}
export async function getProduct(productId) {
  try {
    const response = await fetch(`${baseURL}/products/${productId}`, {
      method: "GET",
    });

    return await handleProductRes(response);
  } catch (error) {
    return handleProductError(error);
  }
}
export async function createProduct({ name, description, price, tags, images }) {
  try {
    const response = await fetch(`${baseURL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        price,
        tags,
        images,
      }),
    });

    return await handleProductRes(response);
  } catch (error) {
    return handleProductError(error);
  }
}
export async function patchProduct(productId, { name, description, price, tags, images }) {
  try {
    const response = await fetch(`${baseURL}/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        price,
        tags,
        images,
      }),
    });

    return await handleProductRes(response);
  } catch (error) {
    return handleProductError(error);
  }
}
export async function deleteProduct(productId) {
  try {
    const response = await fetch(`${baseURL}/products/${productId}`, {
      method: "DELETE",
    });

    return await handleProductRes(response);
  } catch (error) {
    return handleProductError(error);
  }
}
