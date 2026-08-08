import * as productService from '../service/product.service.js';
// 컨트롤러: 브라우저와 소통
// 서비스: 데이터베이스와 소통

// 전체 조회
export async function getProductList(req, res, next) {
  try {
    console.log('1) getProductList 들어옴');
    const sort = req.query.sort;
    const count = Number(req.query.count) || 0;
    const keyword = req.query.keyword;
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;

    //서비스에게 넘기고 값을 받아온다.
    const products = await productService.getProductList(sort, keyword, page, pageSize);
    console.log('2) 콘트롤러가 서비스로 요청 보냄');
    console.log(products);

    //값을 받으면 응답 값으로 보낸다.
    res.status(200).json(products);
    console.log('3) 응답 받음');
  } catch (err) {
    next(err);
  }
}

// 상세 조회
export async function getProduct(req, res, next) {
  //프리즈마에서 id를 int로 정의했으니 넘버로 바꿔준다
  const id = Number(req.params.id);
  try {
    console.log('1) getProduct 들어옴');

    const product = await productService.getProduct(id);
    if (!product) {
      return res.status(404).json({ message: 'Cannot find given id.' });
    }
    console.log('2) 콘트롤러가 서비스로 요청 보냄');
    res.status(200).json(product);
    console.log('3) 응답 받음');
  } catch (err) {
    next(err);
  }
}

export async function createProduct(req, res, next) {
  try {
    console.log('1)createProduct 들어옴');

    const newProduct = await productService.createProduct(req.body);
    console.log('2) 콘트롤러가 서비스로 요청 보냄');

    res.status(201).json(newProduct);
    console.log('3) 만들어짐');
  } catch (err) {
    next(err);
  }
}

export async function patchProduct(req, res, next) {
  try {
    console.log('1)patchProduct 들어옴');
    //프리즈마에서 id를 int로 정의했으니 넘버로 바꿔준다
    const id = Number(req.params.id);
    const updatedProduct = await productService.patchProduct(id, req.body);
    console.log('2) 콘트롤러가 서비스로 요청 보냄');

    res.status(200).json(updatedProduct);
    console.log('3) 수정됨');
  } catch (err) {
    next(err);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    console.log('1)deleteProduct 들어옴');
    //프리즈마에서 id를 int로 정의했으니 넘버로 바꿔준다
    const id = Number(req.params.id);
    const deleted = await productService.deleteProduct(id);
    if (!deleted) {  // deleteProduct의 경우 지울 게 없으면 null을 반환한다.
      return res.status(404).json({ message: 'Cannot find given id.' });
    }
    console.log('2) 콘트롤러가 서비스로 요청 보냄');

    res.status(204).send();
    console.log('3) 지워짐');
  } catch (err) {
    next(err);
  }
}