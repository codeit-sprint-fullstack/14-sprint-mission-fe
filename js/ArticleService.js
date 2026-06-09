const ARTICLE_URL = 'https://panda-market-api-crud.vercel.app/Articles';

// 게시글 목록 조회
export function getArticleList( page = 1, pageSize = 10, keyword = "" ) {
    return fetch (`${ARTICLE_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)
    .then((response) => {
        if (!response.ok) {
        throw new Error("게시글 목록 조회 실패");
      }

      return response.json();
    })
    .catch((error) => {
        console.error(error);
    });
}

// 게시글 조회
export function getArticle(articleId) {
    return fetch (`${ARTICLE_URL}/${articleId}`)
    .then((response) => {
        if (!response.ok) {
        throw new Error("게시글 목록 조회 실패");
      }

      return response.json();
    })
    .catch((error) => {
        console.error(error);
    });
}

// 게시글 생성
export function createArticle(name, description, price, tags, images) {
    return fetch (`${ARTICLE_URL}`, {
        method: "POST",
        body: JSON.stringify(name, description, price, tags, images),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        if (!response.ok) {
        throw new Error("게시글 생성 실패");
      }

      return response.json();
    })
    .catch((error) => {
        console.error(error);
    });
}

// 게시글 수정
export function patchArticle(articleId,data) {
    return fetch (`${ARTICLE_URL}/${articleId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        if (!response.ok) {
        throw new Error("게시글 수정 실패");
      }

      return response.json();
    })
    .catch((error) => {
        console.error(error);
    });
}

// 게시물 삭제
export function deleteArticle(articleId) {
    return fetch (`${ARTICLE_URL}/${articleId}`, {
        method: "DELETE",
    })
    .then((response) => {
        if (!response.ok) {
        throw new Error("게시글 삭제 실패");
      }

      return response.json();
    })
    .catch((error) => {
        console.error(error);
    });
}