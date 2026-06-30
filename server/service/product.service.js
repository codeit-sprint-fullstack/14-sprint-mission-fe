import Product from "../models/product.model.js";

//get, 정렬 / 페이지네이션 기능 구현
export async function getProductList(sort, keyword, page, pageSize) {

  //빈 배열
  const searchKeyword = {};

  //키워드가 파라미터로 들어요면 세팅, 아니면 그냥 빈 조건
  if (keyword) {
    searchKeyword.$or = [
      { name: new RegExp(keyword) },
      { description: new RegExp(keyword) },
    ];
  }

  const offset = (page - 1) * pageSize;

  // 최신순 정렬, 검색기능 구현
  const sortOption = { createdAt: sort === 'oldest' ? 'asc' : 'desc' };
  return await Product.find(searchKeyword)
    .sort(sortOption)
    .skip(offset)
    .limit(pageSize);
}

export async function getProduct(id) {
  return await Product.findById(id);
}

//post, 상품 등록 기능 구현
export async function createProduct(data) {
  return await Product.create(data);
}

//patch, 상품 수정 기능 구현
export async function patchProduct(id, data) {
  return await Product.findByIdAndUpdate(id, data, { new: true });
}

// findByIdAndUpdate를 사용하지 않고 만드는 방법 (차용 시 컨트롤러 단에서도 수정해야 함)

// export async function patchProduct(id, data) {
//   const product = await Product.findById(id);
//   if (product) {
//     Object.keys(data).forEach((key) => {
//       product[key] = data[key];
//     });
//     return await product.save();
//   } else {
//     return null;
//   }
// }

//delete, 상품 삭제 기능 구현
export async function deleteProduct(id) {
  return await Product.findByIdAndDelete(id);
}