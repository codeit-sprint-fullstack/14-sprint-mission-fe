const BASE_URL = 'https://panda-market-api.vercel.app';

function buildListUrl(path, { page = 1, pageSize = 15, keyword = '', orderBy = '' } = {}) {
  const url = new URL(path, BASE_URL);
  url.searchParams.set('page', page);
  url.searchParams.set('pageSize', pageSize);

  if (keyword) {
    url.searchParams.set('keyword', keyword);
  }

  if (orderBy) {
    url.searchParams.set('orderBy', orderBy);
  }

  return url;
}

async function parseJson(response) {
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function request(path, options) {
  const response = await fetch(`${BASE_URL}${path}`, options);
  const data = await parseJson(response);

  if (!response.ok) {
    throw new Error(data?.message || `요청 실패. 에러 코드 : ${response.status}`);
  }

  return data;
}

export function getProductList(params) {
  return fetch(buildListUrl('/products', params)).then(async (response) => {
    const data = await parseJson(response);

    if (!response.ok) {
      throw new Error(data?.message || `요청 실패. 에러 코드 : ${response.status}`);
    }

    return data;
  });
}

export function getProduct(productId) {
  return request(`/products/${productId}`);
}

export function createProduct(product) {
  return request('/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
}

export function patchProduct(productId, product) {
  return request(`/products/${productId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
}

export function deleteProduct(productId) {
  return request(`/products/${productId}`, { method: 'DELETE' });
}

export function getArticleList(params) {
  return fetch(buildListUrl('/articles', params)).then(async (response) => {
    const data = await parseJson(response);

    if (!response.ok) {
      throw new Error(data?.message || `요청 실패. 에러 코드 : ${response.status}`);
    }

    return data;
  });
}

export function getArticle(articleId) {
  return request(`/articles/${articleId}`);
}

export function createArticle(article) {
  return request('/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(article),
  });
}

export function patchArticle(articleId, article) {
  return request(`/articles/${articleId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(article),
  });
}

export function deleteArticle(articleId) {
  return request(`/articles/${articleId}`, { method: 'DELETE' });
}
