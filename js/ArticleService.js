const baseUrl = 'https://panda-market-api-crud.vercel.app/articles';

// article



// 아티클 리스트 조회
async function getArticleList(page, pageSize, keyword) {
    let url = baseUrl;

    url += '?';
    url += 'page=' + page;
    url += '&pageSize=' + pageSize;
    url += '&keyword=' + encodeURIComponent(keyword);

    // url.searchParames.append('page', page);
    // url.searchParames.append('pageSize', pageSize);
    // url.searchParames.append('keyword', keyword);

    const response = await fetch(url);

    if (!response.ok) {
        switch (response.status) {
            case 404:
                throw new Error("존재하지 않는 데이터입니다.");
            case 403:
                throw new Error("데이터를 조회할 권한이 없습니다.");
            default:
                throw new Error("요청하신 데이터를 찾을 수 없습니다.");
        }
    }

    const data = await response.json();

    const arrData = data.list;

    return arrData;
}



// 아티클 리스트 상세
async function getArticle(id) {
    let url = baseUrl + '/' + id;
    
    const response = await fetch(url);

    if (!response.ok) {
        switch (response.status) {
            case 404:
                throw new Error("존재하지 않는 데이터입니다.");
            case 403:
                throw new Error("데이터를 조회할 권한이 없습니다.");
            default:
                throw new Error("요청하신 데이터를 찾을 수 없습니다.");
        }
    }
    
    const data = await response.json();
    
    return data;
}



// 아티클 신규 생성
async function createArticle(title, content, image) {
    let url = baseUrl;

    const bodyContent = {
        title,
        content,
        image
    }

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(bodyContent),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        throw new Error("데이터를 생성하는데 실패했습니다..");
    }


    const data = await response.json();

    return data;
}


// 아티클 내용 수정
async function patchArticle(id, title = null, content = null, image = null) {
    let url = baseUrl + '/' + id;

    const bodyContent = {}

    if (title !== null) {
        bodyContent.title = title;
    }
    if (content !== null) {
        bodyContent.content = content;
    }
    if (image !== null) {
        bodyContent.image = image;
    }

    const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(bodyContent),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        switch (response.status) {
            case 404:
                throw new Error("존재하지 않는 데이터입니다.");
            default:
                throw new Error("요청하신 데이터를 찾을 수 없습니다.");
        }
    }

    const data = await response.json();

    return data;
}

async function deleteArticle(id) {
    let url = baseUrl + '/' + id;

    const response = await fetch(url, {
        method: 'DELETE',
    })

    if (!response.ok) {
        switch (response.status) {
            case 404:
                throw new Error("존재하지 않는 데이터입니다.");
            case 403:
                throw new Error("데이터를 조회할 권한이 없습니다.");
            default:
                throw new Error("요청하신 데이터를 찾을 수 없습니다.");
        }
    }

    const data = await response.json();

    return data;
}

export {
    getArticleList,
    getArticle,
    createArticle,
    patchArticle,
    deleteArticle
};