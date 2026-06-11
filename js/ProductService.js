const BASE_URL = "https://panda-market-api-crud.vercel.app";

export async function getProductList(page, pageSize, keyword) {
  try {
    const response = await fetch(`${BASE_URL}/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`);
    if (!response.ok) {
      console.error("에러 발생:", response.status);
      return;
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      console.error("에러 발생:", response.status);
      return;
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function createProduct(name, description, price, tags, images) {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, tags, images })
    });
    if (!response.ok) {
      console.error("에러 발생:", response.status);
      return;
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function patchProduct(id, name, description, price, tags, images) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, tags, images })
    });
    if (!response.ok) {
      console.error("에러 발생:", response.status);
      return;
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      console.error("에러 발생:", response.status);
      return;
    }
    console.log("삭제 완료");
  } catch (error) {
    console.error(error);
  }
}