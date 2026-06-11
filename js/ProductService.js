const baseUrl = 'https://panda-market-api-crud.vercel.app/products';

// Product



// 상품 리스트 조회
async function getProductList(page, pageSize, keyword) {
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


// 상품 리스트 상세
async function getProduct(id) {


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



// 상품 신규 생성
async function createProduct(name, description, price, tags, images) {
    let url = baseUrl;

    const bodyContent = {
        name,
        description,
        price,
        tags,
        images, 
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


// 상품 내용 수정
async function patchProduct(id, name=null, description=null, price=null, tags=null, images=null) {
    let url = baseUrl + '/' + id;

    const bodyContent = {}

    if (name !== null) {
        bodyContent.name = name;
    }
    if (description !== null) {
        bodyContent.description = description;
    }
    if (price !== null) {
        bodyContent.price = price;
    }
    if (tags !== null) {
        bodyContent.tags = tags;
    }
    if (images !== null) {
        bodyContent.images = images;
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

async function deleteProduct(id) {
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
    getProductList,
    getProduct,
    createProduct,
    patchProduct,
    deleteProduct
};