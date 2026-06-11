const baseUrl = 'https://panda-market-api-crud.vercel.app/articles';

// article



// 아티클 리스트 조회
function getArticleList(page, pageSize, keyword) {
    let url = baseUrl;

    url += '?';
    url += 'page=' + page;
    url += '&pageSize=' + pageSize;
    url += '&keyword=' + encodeURIComponent(keyword);

    // url.searchParames.append('page', page);
    // url.searchParames.append('pageSize', pageSize);
    // url.searchParames.append('keyword', keyword);

    const response = fetch(url);

    const data = response.then((response) => {
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

        return response.json();

    }).then((data) => {

        const arrData = data.list;

        return arrData;
    })

    return data;
}



// 아티클 리스트 상세
function getArticle(id) {
    
    // 필수값 확인 후 없으면 리젝시키기
    if (id === undefined || id === null) {
        return Promise.reject(new Error("조회할 아티클 id가 없습니다."));
    }

    let url = baseUrl + '/' + id;
    
    const response = fetch(url);

    const data = response.then((response) => {

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
        
        return response.json();
    })
       
    return data;
}



// 아티클 신규 생성
function createArticle(title, content, image) {

    if (title === undefined || title === null) {
        return Promise.reject(new Error("타이틀이 없어 아티클을 생성할 수 없습니다."));
    }
    if (content === undefined || content === null) {
        return Promise.reject(new Error("콘텐트가 없어 아티클을 생성할 수 없습니다."));
    }
    if (image === undefined || image === null) {
        return Promise.reject(new Error("이미지가 없어 아티클을 생성할 수 없습니다."));
    }

    let url = baseUrl;

    const bodyContent = {
        title,
        content,
        image
    }

    const response = fetch(url, {
        method: 'POST',
        body: JSON.stringify(bodyContent),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const data = response.then((response) => {

        if (!response.ok) {
            throw new Error("데이터를 생성하는데 실패했습니다..");
        }
        
        return response.json();
    })
       
    return data;
    
}


// 아티클 내용 수정
function patchArticle(id, title = null, content = null, image = null) {
    
    // 필수값 확인 후 없으면 리젝시키기
    if (id === undefined || id === null) {
        return Promise.reject(new Error("수정할 아티클 id가 없습니다."));
    }

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

    const response = fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(bodyContent),
        headers: {
            'Content-Type': 'application/json',
        },
    })


    const data = response.then((response) => {

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
        
        return response.json();
    })

    return data;
}

function deleteArticle(id) {

    // 필수값 확인 후 없으면 리젝시키기
    if (id === undefined || id === null) {
        return Promise.reject(new Error("삭제할 아티클 id가 없습니다."));
    }

    let url = baseUrl + '/' + id;

    const response = fetch(url, {
        method: 'DELETE',
    })

    const data = response.then((response) => {

        if (!response.ok) {
            switch (response.status) {
                case 400:
                    throw new Error("400");
                case 404:
                    throw new Error("존재하지 않는 데이터입니다.");
                case 403:
                    throw new Error("데이터를 조회할 권한이 없습니다.");
                default:
                    throw new Error("요청하신 데이터를 찾을 수 없습니다.");
            }
        }
        
        return response.json();
    })

    return data;
}

export {
    getArticleList,
    getArticle,
    createArticle,
    patchArticle,
    deleteArticle
};