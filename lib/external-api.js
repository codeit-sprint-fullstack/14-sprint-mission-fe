const DEFAULT_API_BASE_URL = 'https://panda-market-api.vercel.app';

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL
).replace(/\/$/, '');

async function request(path, options = {}) {
  const { allowNotFound = false, ...fetchOptions } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...fetchOptions,
    headers: {
      ...(fetchOptions.body ? { 'Content-Type': 'application/json' } : {}),
      ...fetchOptions.headers,
    },
  });

  if (response.status === 204) return null;
  if (allowNotFound && response.status === 404) return null;

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || `요청 실패 (${response.status})`);
    error.status = response.status;
    error.details = data.details;
    throw error;
  }

  return data;
}

function normalizeArticle(article) {
  if (!article) return null;
  return {
    ...article,
    likeCount: Number(article.likeCount || 0),
  };
}

function normalizeComment(comment) {
  if (!comment) return null;
  return {
    ...comment,
    content: String(comment.content || ''),
  };
}

function normalizeProduct(product) {
  if (!product) return null;
  const images = Array.isArray(product.images) ? product.images : [];
  return {
    ...product,
    image: product.image || images[0] || null,
    images,
    tags: Array.isArray(product.tags) ? product.tags : [],
    price: Number(product.price || 0),
  };
}

export async function getArticleList({
  page = 1,
  pageSize = 5,
  keyword = '',
  orderBy = 'recent',
} = {}) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    orderBy,
  });
  if (keyword) params.set('keyword', keyword);

  const data = await request(`/articles?${params.toString()}`, { cache: 'no-store' });
  return {
    ...data,
    list: Array.isArray(data.list) ? data.list.map(normalizeArticle) : [],
    totalCount: Number(data.totalCount || 0),
  };
}

export async function getArticle(articleId) {
  return normalizeArticle(await request(`/articles/${articleId}`, {
    cache: 'no-store',
    allowNotFound: true,
  }));
}

export async function createArticle(article) {
  return normalizeArticle(await request('/articles', {
    method: 'POST',
    body: JSON.stringify(article),
  }));
}

export async function patchArticle(articleId, article) {
  return normalizeArticle(await request(`/articles/${articleId}`, {
    method: 'PATCH',
    body: JSON.stringify(article),
  }));
}

export function deleteArticle(articleId) {
  return request(`/articles/${articleId}`, { method: 'DELETE' });
}

export async function getArticleComments(articleId, { cursor = '', pageSize = 3 } = {}) {
  const params = new URLSearchParams({ limit: String(pageSize) });
  if (cursor) params.set('cursor', String(cursor));
  const data = await request(`/articles/${articleId}/comments?${params.toString()}`, {
    cache: 'no-store',
  });
  return {
    ...data,
    list: Array.isArray(data.list) ? data.list.map(normalizeComment) : [],
    nextCursor: data.nextCursor || null,
  };
}

export async function createArticleComment(articleId, content) {
  return normalizeComment(await request(`/articles/${articleId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  }));
}

export async function patchComment(commentId, content) {
  return normalizeComment(await request(`/comments/${commentId}`, {
    method: 'PATCH',
    body: JSON.stringify({ content }),
  }));
}

export function deleteComment(commentId) {
  return request(`/comments/${commentId}`, { method: 'DELETE' });
}

export async function getProductList({
  page = 1,
  pageSize = 15,
  keyword = '',
  orderBy = 'recent',
} = {}) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    orderBy,
  });
  if (keyword) params.set('keyword', keyword);

  const data = await request(`/products?${params.toString()}`, { cache: 'no-store' });
  return {
    ...data,
    list: Array.isArray(data.list) ? data.list.map(normalizeProduct) : [],
    totalCount: Number(data.totalCount || 0),
  };
}

export async function getProduct(productId) {
  return normalizeProduct(await request(`/products/${productId}`, {
    cache: 'no-store',
    allowNotFound: true,
  }));
}

export async function createProduct(product) {
  const { image, images, ...fields } = product;
  return normalizeProduct(await request('/products', {
    method: 'POST',
    body: JSON.stringify({
      ...fields,
      price: Number(fields.price),
      images: Array.isArray(images) ? images : image ? [image] : [],
    }),
  }));
}

export async function patchProduct(productId, product) {
  const { image, images, ...fields } = product;
  const payload = { ...fields };
  if (Object.prototype.hasOwnProperty.call(product, 'price')) payload.price = Number(product.price);
  if (images || Object.prototype.hasOwnProperty.call(product, 'image')) {
    payload.images = Array.isArray(images) ? images : image ? [image] : [];
  }

  return normalizeProduct(await request(`/products/${productId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  }));
}

export function deleteProduct(productId) {
  return request(`/products/${productId}`, { method: 'DELETE' });
}
