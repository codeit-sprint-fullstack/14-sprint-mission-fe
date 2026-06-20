const baseURL =  'https://panda-market-api-crud.vercel.app/docs/#/Article';

export function getArticleList(page, pageSize, keyword) {
  const url = new URL("/articles", baseURL);
  url.searchParams.set("page", page);
  url.searchParams.set("pageSize", pageSize);

  if (keyword) {
    url.searchParams.set("keyword", keyword);
  }
  return url;
}

function parseJson(res) {
  return res.text().then((text) => {
    if(!text) {
      return null;
    }
    
    return JSON.parse(text);
  });
}

function handleArticleRes(res) {
  return parseJson(res).then((data) => {
    if (!res.ok) {
      const message = data?.message || `요청 실패. 에러 코드 : ${res.status}`;
      const error = new Error(message);
      error.isLoggedIn = true;
      console.error(message);
      throw error;
    }
    
    return data;
  });
}

function handleArticleError(error) {
  if (!error.isLoggedIn) {
    console.error(error.message);
  }

  return null;
}

export function getArticleList({ page = 1, pageSize = 10, keyword = "" } = {}) {
  return fetch(buildArticleListUrl({page, pageSize, keyword}), {
    method: "GET",
  })
  .then(handleArticleRes)
  .catch(handleArticleError);
}

export function getArticle(articleId)  {
  return fetch(`${baseURL}/articles/${articleId}`, {
    method: "GET",
  })
  .then(handleArticleRes)
  .catch(handleArticleError);
}

export function createArticle({ title, content, image }) {
  return fetch(`${baseURL}/articles`, {
    mathod: "POST",
    headers: {
      "content_type": "application/json",
    },
    body: JSON.stringify({
      title,
      contnet,
      image,
    }),
  })
  .then(handleArticleRes)
  .catch(handleArticleError);
}

export function patchArticle(articleId, { title, content, image }) {
  return fetch(`${baseURL}/article/${articleId}`, {
    method: "PATCH",
    headers: {
      "content_type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      image,
    }),
  })
  .then(handleArticleRes)
  .catch(handleArticleError);
}

export function deleteArticle(articleId) {
  return fetch(`${baseURL}/articles/${articleId}`, {
    method: "DELETE",
  })
  .then(handleArticleRes)
  .catch(handleArticleError);
}