// 이건 실 서버 구축하면 쓸 수 있음 라이브서버로는 경로 설정 불가능해서 임시 주석처리
// import axios from 'axios';

const baseUrl = 'https://panda-market-api-crud.vercel.app/products';

// Product



// 상품 리스트 조회
async function getProductList(page, pageSize, keyword) {

    try {
        const response = await axios.get(baseUrl, {
            params: {
                page,
                pageSize,
                keyword: encodeURIComponent(keyword)
            }
        });
    
        const arrData = response.data.list;

        return arrData;

    } catch (error) {
        console.log('error');
        
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data.message);
        } else {
            console.log(error.message);
        }
    }



}


// 상품 리스트 상세
async function getProduct(id) {

    // 필수값 확인 후 없으면 리젝시키기
    try {
        if (id === undefined || id === null) {
            throw new Error("조회할 상품 id가 없습니다.");
        }
    
        const response = await axios.get(`${baseUrl}/${id}`)

        const data = response.data;

        return data;

    } catch (error) {
        console.log('error');

        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data.message);
        } else {
            console.log(error.message);
        }
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

        const response = await axios.post(baseUrl, bodyContent);

        const data = response.data;

        return data;

    } catch (error) {
        console.log('error');
        
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data.message);
        } else {
            console.log(error.message);
        }
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

    


        const response = await axios.patch(`${baseUrl}/${id}`, bodyContent);

        const data = response.data;
    

        return data;

    } catch (error) {
        console.log('error');
        
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data.message);
        } else {
            console.log(error.message);
        }
    }
}

async function deleteProduct(id) {

    // 필수값 확인 후 없으면 리젝시키기
    try {
        if (id === undefined || id === null) {
            throw new Error("삭제할 상품 id가 없습니다.");
        }


        const response = await axios.delete(`${baseUrl}/${id}`);
        
    
        const data = response.data;
    
        return data;

    } catch (error) {
        console.log('error');
        
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data.message);
        } else {
            console.log(error.message);
        }
    }
}

export {
    getProductList,
    getProduct,
    createProduct,
    patchProduct,
    deleteProduct
};