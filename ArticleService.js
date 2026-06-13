const ARTICLE_API_URL = 'https://panda-market-api-crud.vercel.app/articles';


// ========================================================================================================================
// ★★★★★★ getArticleList 함수 - 게시글 목록 불러오기 ★★★★★★
// ========================================================================================================================
export function getArticleList(page, pageSize, keyword) {
  const get_url = `${ARTICLE_API_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`;

  return fetch(get_url, {
    method: 'GET',
  })
    .then((response) => {
      if (!response.ok) {
        console.error(`요청 실패: ${response.status}`);

        throw new Error(`요청 실패: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('getArticleList 오류:', error);

      throw error;
    });
}


// ========================================================================================================================
// ★★★★★ getArticle 함수 - 특정 게시글 불러오기 ★★★★★★
// ========================================================================================================================
export function getArticle(id) {
    const get_ur2 = `${ARTICLE_API_URL}/${id}`;

    return fetch(get_ur2, {
        method: 'GET',
    })
    .then((response) => {
        if (!response.ok) {
            console.error(`요청 실패: ${response.status}`);
            throw new Error(`요청 실패: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        return data;
    })
    .catch((error) => {
        console.error('getArticle 오류:', error);
        throw error;
    });
}

// ========================================================================================================================
// ★★★★★ createArticle 함수 - 게시글 생성하기 ★★★★★★
// ========================================================================================================================
export function createArticle(title, content, image) {
    return fetch(ARTICLE_API_URL, {
        method: 'POST',
        body: JSON.stringify({ title, content, image }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => {
        if (!response.ok) {
            console.error(`요청 실패: ${response.status}`);
            throw new Error(`요청 실패: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        return data;
    })
    .catch((error) => {
        console.error('createArticle 오류:', error);
        throw error;
    });
}

// ========================================================================================================================
// ★★★★★ patchArticle 함수 - 게시글 수정하기 ★★★★★★
// ========================================================================================================================
export function patchArticle(id, title, content, image) {
    const patch_url = `${ARTICLE_API_URL}/${id}`;
    return fetch(patch_url, {
        method: 'PATCH',
        body: JSON.stringify({ title, content, image }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => {
        if (!response.ok) {
            console.error(`요청 실패: ${response.status}`);
            throw new Error(`요청 실패: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        return data;
    })
    .catch((error) => {
        console.error('patchArticle 오류:', error);
        throw error;
    });
}


// ========================================================================================================================
// ★★★★★ deleteArticle 함수 - 게시글 삭제하기 ★★★★★★
// ========================================================================================================================
export function deleteArticle(id) {
    const delete_url = `${ARTICLE_API_URL}/${id}`;
    return fetch(delete_url, {
        method: 'DELETE',
    })
    .then((response) => {
        if (!response.ok) {
            console.error(`요청 실패: ${response.status}`);
            throw new Error(`요청 실패: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        return data;
    })
    .catch((error) => {
        console.error('deleteArticle 오류:', error);
        throw error;
    });
}