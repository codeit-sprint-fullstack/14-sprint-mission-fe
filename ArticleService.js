const BASE_URL = "https://panda-market-api-crud.vercel.app";

const createQueryString = (params) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value);
    }
  });

  return searchParams.toString();
};

const parseResponse = (response) => {
  if (response.ok) {
    return response.json();
  }

  console.error(`Article API error: ${response.status}`);
  throw new Error("Article API request failed");
};

const requestArticle = (path, options = {}) => {
  return fetch(`${BASE_URL}${path}`, options)
    .then(parseResponse)
    .catch((error) => {
      console.error(error.message);
      throw error;
    });
};

export const getArticleList = (page = 1, pageSize = 10, keyword = "") => {
  const queryString = createQueryString({ page, pageSize, keyword });

  return requestArticle(`/articles?${queryString}`);
};

export const getArticle = (articleId) => {
  return requestArticle(`/articles/${articleId}`);
};

export const createArticle = ({ title, content, image }) => {
  return requestArticle("/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, image }),
  });
};

export const patchArticle = (articleId, article) => {
  return requestArticle(`/articles/${articleId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });
};

export const deleteArticle = (articleId) => {
  return requestArticle(`/articles/${articleId}`, {
    method: "DELETE",
  });
};
