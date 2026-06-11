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
const sampleImageUrl = "https://example.com/sample-image.png";
function logResult(label, data) {
  console.log(label, data);
}
function runArticleExamples() {
  let createdArticleId;

  return getArticleList({ page: 1, pageSize: 5, keyword: "mission" })
    .then((articleList) => {
      logResult("Article list:", articleList);
      return createArticle({
        title: "Sprint Mission Article",
        content: "Article API test content.",
        image: sampleImageUrl,
      });
    })
    .then((createdArticle) => {
      logResult("Created article:", createdArticle);
      createdArticleId = createdArticle?.id;
      if (!createdArticleId) {
        return null;
      }
      return getArticle(createdArticleId);
    })
    .then((article) => {
      logResult("Article detail:", article);

      if (!createdArticleId) {
        return null;
      }
      return patchArticle(createdArticleId, {
        title: "Updated Sprint Mission Article",
        content: "Updated article API test content.",
        image: sampleImageUrl,
      });
    })
    .then((updatedArticle) => {
      logResult("Updated article:", updatedArticle);

      if (!createdArticleId) {
        return null;
      }
      return deleteArticle(createdArticleId);
    })
    .then((deletedArticle) => {
      logResult("Deleted article:", deletedArticle);
    })
    .catch((error) => {
      console.error(error.message);
    });
}
async function runProductExamples() {
  let createdProductId;

  try {
    const productList = await getProductList({ page: 1, pageSize: 5, keyword: "mission" });
    logResult("Product list:", productList);
    const createdProduct = await createProduct({
      name: "Sprint Mission Product",
      description: "Product API test description.",
      price: 10000,
      tags: ["mission", "test"],
      images: [sampleImageUrl],
    });
    logResult("Created product:", createdProduct);
    createdProductId = createdProduct?.id;
    if (!createdProductId) {
      return;
    }
    const product = await getProduct(createdProductId);
    logResult("Product detail:", product);
    const updatedProduct = await patchProduct(createdProductId, {
      name: "Updated Sprint Mission Product",
      description: "Updated product API test description.",
      price: 15000,
      tags: ["mission", "updated"],
      images: [sampleImageUrl],
    });
    logResult("Updated product:", updatedProduct);
    const deletedProduct = await deleteProduct(createdProductId);
    logResult("Deleted product:", deletedProduct);
  } catch (error) {
    console.error(error.message);
  }
}
runArticleExamples()
  .then(runProductExamples)
  .catch((error) => {
    console.error(error.message);
  });
