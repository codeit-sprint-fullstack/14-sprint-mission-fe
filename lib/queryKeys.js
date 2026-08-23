export const queryKeys = {
  me: ["users", "me"],
  products: {
    all: ["products"],
    list: (params) => ["products", "list", params],
    detail: (productId) => ["products", "detail", String(productId)],
  },
  comments: {
    all: ["comments"],
    product: (productId) => ["comments", "product", String(productId)],
  },
  articles: {
    all: ["articles"],
    list: (params) => ["articles", "list", params],
    detail: (articleId) => ["articles", "detail", String(articleId)],
    comments: (articleId) => ["articles", "comments", String(articleId)],
  },
};
