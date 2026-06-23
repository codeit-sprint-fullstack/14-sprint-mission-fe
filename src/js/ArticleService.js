// getArticleList() -> 게시글 목록 조회

export function getArticleList(page, pageSize, orderBy, keyword) {
    return fetch(
        `https://panda-market-api-crud.vercel.app/articles?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`
    )
    .then((response) => {
        if(!response.ok) {
            console.error("게시글 목록 조회 실패");
            return;
        }
        return response.json();
    })
    .catch((error) => {
        console.error(error);
    })
}


// getArticle() -> 게시글 상세 조회

export function getArticle(articleId) {
    return fetch (
        `https://panda-market-api-crud.vercel.app/articles/${articleId}`,
    )
    .then((response) => {
        if(!response.ok) {
            console.error("게시물 상세 조회 실패");
            return;
        }
        return response.json();
    })
    .catch((error) => {
        console.error(error);
    })
}


// createArticle() -> 게시글 등록

export function createArticle(article) {
    return fetch (
        `https://panda-market-api-crud.vercel.app/articles`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(article),
        }
    )
    .then((response) => {
        if(!response.ok) {
            console.error("게시글 등록 실패");
            return;
        }
        return response.json();
    })
    .catch((error) => {
        console.error(error);
    })
}


// patchArticle() -> 게시글 수정

export function patchArticle(articleId, article) {
    return fetch (
        `https://panda-market-api-crud.vercel.app/articles/${articleId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(article),
        }
    )
    .then((response) => {
        if(!response.ok) {
            console.error("게시글 수정 실패");
            return;
        }
        return response.json();
    })
    .catch((error) => {
        console.error(error);
    });
}


// deleteArticle() -> 게시글 삭제

export function deleteArticle(articleId) {
    return fetch (
        `https://panda-market-api-crud.vercel.app/articles/${articleId}`,
        {
            method: "DELETE",
        }
    )
    .then((response) => {
        if(!response.ok) {
            console.error("게시글 삭제 실패");
            return;
        }
        return response.json();
    })
    .catch((error) => {
        console.error(error);
    });
}