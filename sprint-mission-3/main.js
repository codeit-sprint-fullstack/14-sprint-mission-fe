import * as articleService from "./ArticleService.js";
import * as productService from "./ProductService.js";

articleService.getArticleList(5, 10, '')
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error.message);
  });

articleService.getArticle(6632)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error.message);
  });

articleService.createArticle(
  '테스트 글입니다!',
  '냉무 냉무 냉무!',
  'https://i.pinimg.com/236x/3b/4e/de/3b4edefc495b713f26fcf0c59599a038.jpg',
)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error.message);
  });

articleService.patchArticle(
  6661,
  '수정 시도 중!',
  '수정!',
  'https://png.pngtree.com/png-vector/20250920/ourmid/pngtree-cool-doge-with-sunglasses-high-quality-meme-image-smiling-shiba-inu-png-image_17511621.webp'
)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error.message);
  });

articleService.deleteArticle(6661)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error.message);
  });


try {
  const product = await productService.getProductList();
  console.log(product);
} catch (e) {
  console.log('오류 발생!:');
  console.log(e.message);
}

try {
  const product = await productService.getProductList(4, 10, '');
  console.log(product);
} catch (e) {
  console.log('오류 발생!:');
  console.log(e.message);
};

try {
  const product = await productService.getProduct(3035);
  console.log(product);
} catch (e) {
  console.log('오류 발생!:');
  console.log(e.message);
};

try {
  const product = await productService.createProduct(
    '민트초코버거',
    '민트초코로 만든 버거',
    3000,
    ['식품'],
    ['https://naver.com/...']
  )
  console.log(product);
} catch (e) {
  console.log('오류 발생!:');
  console.log(e.message);
};

try {
  const product = await productService.patchProduct(
    4024,
    '간장게장피자',
    '간장게장으로 만든 피자',
    5000,
    ['식품'],
    ['https://naver.com/...']
  )
  console.log(product);
} catch (e) {
  console.log('오류 발생!:');
  console.log(e.message);
};

try {
  const product = await productService.deleteProduct(4016);
  console.log(product);
} catch (e) {
  console.log('오류 발생!:');
  console.log(e.message);
};