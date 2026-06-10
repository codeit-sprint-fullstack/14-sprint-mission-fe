function getArticleList({ page = 1, pageSize = 10, keyword = ''}) {
  const url = new URL('https://panda-market-api-crud.vercel.app/articles');
  url.searchParams.append('page', String(page));
  url.searchParams.append('pageSize', String(pageSize));
  url.searchParams.append('keyword', keyword);

  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`오류 발생: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error('getArticleList 오류:', error.message);
    });
}

function getArticle(articleId) {
  const url = `https://panda-market-api-crud.vercel.app/articles/${articleId}`;
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`오류 발생: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error('getArticle 오류:', error.message);
    });
}

function createArticle({ title, content, image }) {
  return fetch('https://panda-market-api-crud.vercel.app/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      content,
      image,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`오류 발생: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error('createArticle 오류:', error.message);
    });
}

function patchArticle(articleId, updateData) {
  return fetch(`https://panda-market-api-crud.vercel.app/articles/${articleId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`오류 발생: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error('patchArticle 오류:', error.message);
    });
}

function deleteArticle(articleId) {
  return fetch(`https://panda-market-api-crud.vercel.app/articles/${articleId}`, {
    method: 'DELETE',
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`오류 발생: ${res.status}`);
      }
      return true;
    })
    .catch((error) => {
      console.error('deleteArticle 오류:', error.message);
    });
  }


export { getArticleList, getArticle, createArticle, patchArticle, deleteArticle };