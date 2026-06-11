export const BASE_URL =
  'https://panda-market-api-crud.vercel.app';

async function getArticleList(
  page = 1,
  pageSize = 10,
  keyword = '',
  orderBy = 'recent') {
  try {
    const query =
      `?page=${page}` +
      `&pageSize=${pageSize}` +
      `&keyword=${keyword}` +
      `&orderBy=${orderBy}`;

    const response = await fetch(`${BASE_URL}/articles${query}`);

    if (!response.ok) {
      console.error(`에러: ${response.status}`);
      throw new Error('게시글 목록 조회 실패');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
  }
}


async function getArticle(articleId) {
  try {
    const response = await fetch(`${BASE_URL}/articles/${articleId}`);

    if (!response.ok) {
      console.error(`에러: ${response.status}`);
      throw new Error('게시글 조회 실패');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
  }
}

async function createArticle(title, content, image) {
  try {
    const response = await fetch(`${BASE_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        image
      }),
    });

    if (!response.ok) {
      console.error(`에러: ${response.status}`);
      throw new Error('게시글 생성 실패');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
  }
}



async function patchArticle(articleId, title, content, image) {
  try {
    const response = await fetch(`${BASE_URL}/articles/${articleId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        image,
      }),
    });

    if (!response.ok) {
      console.error(`에러: ${response.status}`);
      throw new Error('게시글 수정 실패');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
  }
}

async function deleteArticle(articleId) {
  try {
    const response = await fetch(`${BASE_URL}/articles/${articleId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      console.error(`에러: ${response.status}`);
      throw new Error('게시글 삭제 실패');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
  }
}


export {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
};