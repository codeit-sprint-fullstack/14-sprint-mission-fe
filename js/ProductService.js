// =============================================
// ProductService.js
// 상품(Product) 관련 API 호출 함수 모음
// 비동기 처리: async/await + try/catch
// =============================================

const BASE_URL = "https://panda-market-api-crud.vercel.app";

// 응답 상태가 2XX가 아니면 콘솔에 에러 출력
function checkStatus(response) {
  if (!response.ok) {
    console.error(`Error ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

// 상품 목록 조회 (페이지, 페이지 크기, 검색어 쿼리 파라미터)
export async function getProductList({ page = 1, pageSize = 10, keyword = "" } = {}) {
  try {
    const response = await fetch(
      `${BASE_URL}/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
    );
    return await checkStatus(response);
  } catch (error) {
    console.error("getProductList 오류:", error);
  }
}

// 상품 단건 조회
export async function getProduct(productId) {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`);
    return await checkStatus(response);
  } catch (error) {
    console.error("getProduct 오류:", error);
  }
}

// 상품 등록 (name, description, price, tags, images)
export async function createProduct({ name, description, price, tags, images }) {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, tags, images }),
    });
    return await checkStatus(response);
  } catch (error) {
    console.error("createProduct 오류:", error);
  }
}

// 상품 수정 (변경할 필드만 updates에 담아서 전달)
export async function patchProduct(productId, updates) {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    return await checkStatus(response);
  } catch (error) {
    console.error("patchProduct 오류:", error);
  }
}

// 상품 삭제
export async function deleteProduct(productId) {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "DELETE",
    });
    return await checkStatus(response);
  } catch (error) {
    console.error("deleteProduct 오류:", error);
  }
}
