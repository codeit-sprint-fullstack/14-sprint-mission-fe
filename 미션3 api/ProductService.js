const PRODUCT_API_URL = 'https://panda-market-api-crud.vercel.app/products';

// ========================================================================================================================
// ★★★★★ getProductList 함수 - 상품 목록 불러오기 ★★★★★
// ========================================================================================================================

  export async function getProductList(page = 1, pageSize = 10, keyword = '') {                                                                                                                                                                                                                         
    try {         
      const response = await axios.get(PRODUCT_API_URL, {                                                                                                                                                                                                                                               
        params: { page, pageSize, keyword },
      });                                                                                                                                                                                                                                                                                               
      return response.data;
    } catch (error) {
      console.error(`요청 실패: ${error.response?.status}`);                                                                                                                                                                                                                                            
      console.error('getProductList 오류:', error);
      throw error;                                                                                                                                                                                                                                                                                      
    }                                                                                                                                                                                                                                                                                                   
  }


// ========================================================================================================================
// ★★★★★ getProduct 함수 - 특정 상품 불러오기 ★★★★★
// ========================================================================================================================
  export async function getProduct(id) {
    try {
      const response = await axios.get(`${PRODUCT_API_URL}/${id}`);
      return response.data;                                                                                                                                                                                                                                                                             
    } catch (error) {
      console.error(`요청 실패: ${error.response?.status}`);                                                                                                                                                                                                                                            
      console.error('getProduct 오류:', error);
      throw error;
    }                                                                                                                                                                                                                                                                                                   
  }


// ========================================================================================================================
// ★★★★★ createProduct 함수 - 상품 생성하기 ★★★★★
// ========================================================================================================================
  export async function createProduct(name, description, price, tags, images) {
    try {
      const response = await axios.post(PRODUCT_API_URL, {
        name, description, price, tags, images,                                                                                                                                                                                                                                                         
      });
      return response.data;                                                                                                                                                                                                                                                                             
    } catch (error) {
      console.error(`요청 실패: ${error.response?.status}`);
      console.error('createProduct 오류:', error);
      throw error;                                                                                                                                                                                                                                                                                      
    }
  } 


// ========================================================================================================================
// ★★★★★ patchProduct 함수 - 상품 수정하기 ★★★★★
// ========================================================================================================================
  export async function patchProduct(id, name, description, price, tags, images) {
    try {
      const response = await axios.patch(`${PRODUCT_API_URL}/${id}`, {
        name, description, price, tags, images,                                                                                                                                                                                                                                                         
      });
      return response.data;                                                                                                                                                                                                                                                                             
    } catch (error) {
      console.error(`요청 실패: ${error.response?.status}`);
      console.error('patchProduct 오류:', error);                                                                                                                                                                                                                                                       
      throw error;
    }                                                                                                                                                                                                                                                                                                   
  }


// ========================================================================================================================
// ★★★★★ deleteProduct 함수 - 상품 삭제하기 ★★★★★
// ========================================================================================================================
  export async function deleteProduct(id) {
    try {                                                                                                                                                                                                                                                                                               
      const response = await axios.delete(`${PRODUCT_API_URL}/${id}`);
      return response.data;                                                                                                                                                                                                                                                                             
    } catch (error) {
      console.error(`요청 실패: ${error.response?.status}`);
      console.error('deleteProduct 오류:', error);                                                                                                                                                                                                                                                      
      throw error;
    }                                                                                                                                                                                                                                                                                                   
  } 
