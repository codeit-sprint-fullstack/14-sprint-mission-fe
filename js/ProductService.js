const API_URL = "https://panda-market-api-crud.vercel.app/products";

export const productService = {
	//목록조회 GET
	getProductList : async (page, pageSize = 5, keyword = '') => {
		fetch(`${API_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`).then(response => {
			if (!response.ok) {
				throw new Error('조회 실패');
			}

			return response.json();
		}).then(data => {
			console.log(data);
			alert('조회 성공');
		}).catch(error => {
			console.log(error);
		});
	},

	//상세조회 GET
	getProduct: async (productId) => {
		fetch(`${API_URL}/${productId}`).then(response => {
			if (!response.ok) {
				throw new Error('조회 실패');
			}

			return response.json();
		}).then(data => {
			console.log(data);
			alert('조회 성공 :' + data.name);
		}).catch(error => {
			console.log(error);
		});
	},

	//생성 POST
	createProduct: async () => {
		const exampleProduct = {
			"images": [
				"https://example.com/..."
			],
			"tags": [
				"전자제품"
			],
			"price": 0,
			"description": "string",
			"name": "상품 이름"
		};

		fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(exampleProduct),
		}).then(response => {
			if (!response.ok) {
				throw new Error('등록 실패');
			}

			return response.json();
		}).then(data => {
			console.log(data);
			alert('등록 성공');
		}).catch(error => {
			console.log(error);
		});

	},

	//수정 PATCH
	patchProduct: (productId) => {
		const exampleProduct = {
			"images": [
				"https://example.com/..."
			],
			"tags": [
				"전자제품"
			],
			"price": 0,
			"description": "string",
			"name": "수정된 상품 이름"
		};

		fetch(`${API_URL}/${productId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(exampleProduct),
		}).then(response => {
			if (!response.ok) {
				throw new Error('수정 실패');
			}

			return response.json();
		}).then(data => {
			console.log(data);
			alert('수정 성공');
		}).catch(error => {
			console.log(error);
		});
	},

	//삭제 DELETE
	deleteProduct: (productId) => {
		fetch(`${API_URL}/${productId}`, {
			method: "DELETE",
		}).then(response => {
			if (!response.ok) {
				throw new Error('삭제 실패');
			}

			return response.json();
		}).then(data => {
			console.log(data);
			alert('삭제 성공');
		}).catch(error => {
			console.log(error);
		});
	}
}