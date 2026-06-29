import * as productService from '../service/product.service.js';
// 컨트롤러: 브라우저와 소통
// 서비스: 데이터베이스와 소통

//get
export async function getProduct(req, res) {
  console.log('1) 컨트롤러 들어옴');
  const sort = req.query.sort;
  const count = Number(req.query.count) || 0;

  //서비스에게 넘기고 값을 받아온다.
  const products = await productService.getProduct(sort, count);
  console.log('2) 콘트롤러가 서비스로 요청 보냄');
  console.log(products);

  //값을 받으면 응답 값으로 보낸다.
  res.status(200).json(products);
  console.log('3) 응답 받음');
}