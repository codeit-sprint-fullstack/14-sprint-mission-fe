const ARTICLE_API_URL ='https://panda-market-api-crud.vercel.app/articles';


// ========================================================================================================================
// ★★★★★ getArticleList 함수 - 게시글 목록 불러오기 ★★★★★
// ========================================================================================================================
export function getArticleList(page = 1, pageSize = 10, keyword = '') {
    const query = new URLSearchParams({ page, pageSize, keyword });

    const url1 = `${ARTICLE_API_URL}?${query.toString()}`;

    return fetch(url1, {
        method: 'GET',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`요청 실패: ${response.status}`);
            }

            return response.json();
        })
        .catch((error) => {
            console.error('getArticleList 오류:', error);
            throw error;
        });
}


// ========================================================================================================================
// ★★★★★ getArticle 함수 - 특정 게시글 불러오기 ★★★★★
// ========================================================================================================================
export function getArticle(id) {
    const url2 = `${ARTICLE_API_URL}/${id}`;

    return fetch(url2, {
        method: 'GET',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`요청 실패: ${response.status}`);
            }

            return response.json();
        })
        .catch((error) => {
            console.error('getArticle 오류:', error);
            throw error;
        });
}


// ========================================================================================================================
// ★★★★★ createArticle 함수 - 게시글 생성하기 ★★★★★
// ========================================================================================================================
export function createArticle(title, content, image) {
    return fetch(ARTICLE_API_URL, {
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
        .then((response) => {
            if (!response.ok) {
                throw new Error(`요청 실패: ${response.status}`);
            }

            return response.json();
        })
        .catch((error) => {
            console.error('createArticle 오류:', error);
            throw error;
        });
}


// ========================================================================================================================
// ★★★★★ patchArticle 함수 - 게시글 수정하기 ★★★★★
// ========================================================================================================================
export function patchArticle(id, title, content, image) {
    const url3 = `${ARTICLE_API_URL}/${id}`;

    return fetch(url3, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            content,
            image,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`요청 실패: ${response.status}`);
            }

            return response.json();
        })
        .catch((error) => {
            console.error('patchArticle 오류:', error);
            throw error;
        });
}


// ========================================================================================================================
// ★★★★★ deleteArticle 함수 - 게시글 삭제하기 ★★★★★
// ========================================================================================================================
export function deleteArticle(id) {
    const ur4 = `${ARTICLE_API_URL}/${id}`;

    return fetch(ur4, {
        method: 'DELETE',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`요청 실패: ${response.status}`);
            }

            return response.json();
        })
        .catch((error) => {
            console.error('deleteArticle 오류:', error);
            throw error;
        });
}