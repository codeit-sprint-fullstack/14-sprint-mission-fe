// getProductList() -> 상품 목록 조회

export async function getProductList(page, pageSize, orderBy, keyword) {
  try {
    const response = await fetch(
      `https://panda-market-api-crud.vercel.app/products?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`,
    );
    if (!response.ok) {
      console.error("상품 목록 조회 실패");
      return;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// getProduct(productId) -> 상품 상세 조회

export async function getProduct(productId) {
  try {
    const response = await fetch(
      `https://panda-market-api-crud.vercel.app/products/${productId}`,
    );
    if (!response.ok) {
      console.error("상품 상세 조회 실패");
      return;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}


// createProduct(products) -> 상품 등록
export async function createProduct(product) {
  try {
    const response = await fetch(
      `https://panda-market-api-crud.vercel.app/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      },
    );

    if (!response.ok) {
      console.error("상품 등록 실패");
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}


// patchProduct(productId) -> 상품 수정
export async function patchProduct(productId, product) {
  try {
    const response = await fetch(
      `https://panda-market-api-crud.vercel.app/products/${productId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      },
    );

    if (!response.ok) {
      console.error("상품 수정 실패");
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}


// deleteProduct(productId) -> 상품 삭제
export async function deleteProduct(productId) {
  try {
    const response = await fetch(
      `https://panda-market-api-crud.vercel.app/products/${productId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      console.error("상품 삭제 실패");
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
