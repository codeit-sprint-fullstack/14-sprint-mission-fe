export function getArticleList(page = 1, pageSize = 10, keyword = '') {
  const url = new URL('https://panda-market-api-crud.vercel.app/articles');
  url.searchParams.append('page', page);
  url.searchParams.append('pageSize', pageSize);
  url.searchParams.append('keyword', keyword);

  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.log("함수 정의부에서 에러 : ", error.message);
      throw error;
    });
};

export function getArticle(id) {
  return fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.log("함수 정의부에서 에러 : ", error.message);
      throw error;
    });
};

export function createArticle(title, content, image) {
  const article = {
    title,
    content,
    image,
  };

  return fetch('https://panda-market-api-crud.vercel.app/articles', {
    method: 'POST',
    body: JSON.stringify(article),
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.log("함수 정의부에서 에러 : ", error.message);
      throw error;
    });
};

export function patchArticle(id, title, content, image) {
  const newArticle = {
    title,
    content,
    image,
  };

  return fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(newArticle),
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.log("함수 정의부에서 에러 : ", error.message);
      throw error;
    });
};

export function deleteArticle(id) {
  return fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`, {
    method: 'DELETE',
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }
      return res.text();
    })
    .catch((error) => {
      console.log("함수 정의부에서 에러 : ", error.message);
      throw error;
    });
};