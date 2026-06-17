import {
  createArticle,
  deleteArticle,
  getArticle,
  getArticleList,
  patchArticle,
} from "./ArticleService.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductList,
  patchProduct,
} from "./ProductService.js";

const newArticle = {
  title: "테스트 게시글",
  content: "게시글 API 동작확인.",
  image: "https://picsum.photos/id/237/200/300",
};

const newProduct = {
  name: "신선한 바다코끼리",
  description: "살아있는 바다코끼리 입니다",
  price: 120000000,
  tags: ["동물"],
  images: ["https://fastly.picsum.photos/id/1084/536/354.jpg?grayscale&hmac=Ux7nzg19e1q35mlUVZjhCLxqkR30cC-CarVg-nlIf60"],
};

const testArticleApi = () => {
  let createdArticleId;

  getArticleList(1, 10, "테스트")
    .then((articleList) => {
      console.log("게시글 목록:", articleList);

      return createArticle(newArticle);
    })
    .then((createdArticle) => {
      console.log("등록한 게시글:", createdArticle);
      createdArticleId = createdArticle.id;

      return getArticle(createdArticleId);
    })
    .then((article) => {
      console.log("게시글 상세:", article);

      return patchArticle(createdArticleId, {
        title: "수정한 테스트 게시글",
        content: "게시글 내용을 한 번 수정했습니다.",
        image: "https://picsum.photos/seed/picsum/200/300",
      });
    })
    .then((updatedArticle) => {
      console.log("수정한 게시글:", updatedArticle);

      return deleteArticle(createdArticleId);
    })
    .then((deletedArticle) => {
      console.log("삭제한 게시글:", deletedArticle);
    })
    .catch((error) => {
      console.error("게시글 API 테스트 실패:", error.message);
    });
};

const testProductApi = async () => {
  let createdProductId;

  try {
    const productList = await getProductList(1, 10, "테스트");
    console.log("상품 목록:", productList);

    const createdProduct = await createProduct(newProduct);
    console.log("등록한 상품:", createdProduct);
    createdProductId = createdProduct.id;

    const product = await getProduct(createdProductId);
    console.log("상품 상세:", product);

    const updatedProduct = await patchProduct(createdProductId, {
      name: "수정한 상품",
      description: "상품 설명과 가격을 수정했습니다.",
      price: 15000,
      tags: ["랜덤박스"],
      images: ["https://picsum.photos/501/400"],
    });
    console.log("수정한 상품:", updatedProduct);

    const deletedProduct = await deleteProduct(createdProductId);
    console.log("삭제한 상품:", deletedProduct);
  } catch (error) {
    console.error("상품 API 테스트 실패:", error.message);
  }
};

testArticleApi();
testProductApi();
