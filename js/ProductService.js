const baseUrl = 'https://panda-market-api-crud.vercel.app/products';

// Product



// 상품 리스트 조회
async function getProductList(page, pageSize, keyword) {
    let url = baseUrl;

    url += '?';
    url += 'page=' + page;
    url += '&pageSize=' + pageSize;
    url += '&keyword=' + encodeURIComponent(keyword);

    try {
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

    } catch (error) {
        console.log('error');
        console.log(error.message);
    }



}


// 상품 리스트 상세
async function getProduct(id) {

    // 필수값 확인 후 없으면 리젝시키기
    try {
        if (id === undefined || id === null) {
            throw new Error("조회할 상품 id가 없습니다.");
        }


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

    } catch (error) {
        console.log('error');
        console.log(error.message);
    }
}



// 상품 신규 생성
async function createProduct(name, description, price, tags, images) {
    let url = baseUrl;
    
    try {
        if (!Array.isArray(tags)) {
            throw new Error("tags는 배열이어야 합니다.");
        }

        if (!Array.isArray(images)) {
            throw new Error("images는 배열이어야 합니다.");
        }

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

    } catch (error) {
        console.log('error');
        console.log(error.message);
    }

}


// 상품 내용 수정
async function patchProduct(id, name=null, description=null, price=null, tags=null, images=null) {

    // 필수값 확인 후 없으면 리젝시키기
    try {
        if (id === undefined || id === null) {
            throw new Error("수정할 상품 id가 없습니다.");
        }

        let url = baseUrl + '/' + id;

        const bodyContent = {}

        if (name !== null) {
            bodyContent.name = name;
        }
        if (description !== null) {
            bodyContent.description = description;
        }
        // 배열이나 객체로 들어올때 분기 필요
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
                case 403:
                    throw new Error("데이터를 조회할 권한이 없습니다.");
                default:
                    throw new Error("요청하신 데이터를 찾을 수 없습니다.");
            }
        }
        const data = await response.json();

        return data;

    } catch (error) {
        console.log('error');
        console.log(error.message);
    }
}

async function deleteProduct(id) {

    // 필수값 확인 후 없으면 리젝시키기
    try {
        if (id === undefined || id === null) {
            throw new Error("삭제할 상품 id가 없습니다.");
        }

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
        console.log(data);

    } catch (error) {
        console.log('error');
        console.log(error.message);
    }
}

export {
    getProductList,
    getProduct,
    createProduct,
    patchProduct,
    deleteProduct
};