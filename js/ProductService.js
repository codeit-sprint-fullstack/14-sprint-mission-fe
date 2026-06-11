const PRODUCT_URL = 'https://panda-market-api-crud.vercel.app/Products';

// 상품 목록 조회
export async function getProductList( page = 1, pageSize = 10, keyword = "" ) {
    try {
        const response = await fetch (
            `${PRODUCT_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
        )
        if (!response.ok) {
            throw new Error("상품 목록 조회 실패");
        }
        return await response.json();
    } catch (error) {
        console.error (error);
    }
};

// 상품 조회
export async function getProduct(productId) {
    try {
        const response = await fetch (
            `${PRODUCT_URL}/${productId}`
        )
        if (!response.ok) {
            throw new Error("상품 조회 실패");
        }
        return await response.json();
    } catch(error) {
        console.error (error);
    }
};

// 상품 생성
export async function createProduct( name, description, price, tags, images ) {
    try {
        const response = await fetch (
            `${PRODUCT_URL}`, {
                method: "POST",
                body: JSON.stringify( name, description, price, tags, images ),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        if (!response.ok) {
            throw new Error("상품 생성 실패");
        }
        return await response.json();
    } catch(error) {
        console.error (error);
    }
};

// 상품 수정
export async function patchProduct(productId, data) {
    try {
        const response = await fetch (
            `${PRODUCT_URL}/${productId}`, {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        if (!response.ok) {
            throw new Error("상품 수정 실패");
        }
        return await response.json();
    } catch(error) {
        console.error (error);
    }
};

// 상품 삭제
export async function deleteProduct(productId) {
    try {
        const response = await fetch (
            `${PRODUCT_URL}/${productId}`, {
                method: "DELETE",
            }
        )
        if (!response.ok) {
            throw new Error("상품 삭제 실패");
        }
        return await response.json();
    } catch(error) {
        console.error (error);
    }
};