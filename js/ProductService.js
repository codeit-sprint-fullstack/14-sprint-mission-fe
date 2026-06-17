
import axios from 'axios';

//공통되는 부분 인스턴스 처리
const instance = axios.create({
  baseURL : "https://panda-market-api-crud.vercel.app",
});


//파라미터를 이용해달라는 요구사항 -> 파라미터에 기본값을 세팅하고 안에서 params 객체 형태로 받음
async function getProductList ( page = 1, pageSize = 10, keyword = '' ) {
  try {
    const res = await instance.get('/products', {
      params : {
        page,
        pageSize,
        keyword,
      },
    });
    return res.data;
  } catch (e) {
    console.log(`오류 :`, e.message); 
  }
}

//요청한 아이디 값만 get
async function getProduct ( id ) {
  try {
    const res = await instance.get(`/products/${id}`);
    return res.data;
  } catch (e) {
    console.log(`오류 :`, e.message); 
  } 
}

async function createProduct ( productData ) {
  try {
  const res = await instance.post('/products', productData);
  return res.data;
  } catch (e) {
    console.log(`오류 :`, e.message); 
  } 
}

async function patchProduct ( id, modifiedData ) {
  try {
  const res = await instance.patch(`/products/${id}`,modifiedData);
  return res.data;
  } catch (e) {
    console.log(`오류 :`, e.message); 
  }
}

async function deleteProduct ( id ) {
  try {
  const res = await instance.delete(`/products/${id}`);
  return res.data;
  } catch (e) {
    console.log(`오류 :`, e.message); 
  }
}

const productService = {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
}

export default productService;