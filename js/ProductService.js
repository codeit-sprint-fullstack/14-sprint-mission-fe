const API_URL = "https://panda-market-api-crud.vercel.app/products";

export const productService = {
	// 목록조회 GET
	getProductList: async (page, pageSize = 5, keyword = '') => {
		try {
			const response = await fetch(
				`${API_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
			);

			if (!response.ok) {
				throw new Error('조회 실패');
			}

			const data = await response.json();

			console.log(data);
			alert('조회 성공');

			return data;

		} catch (error) {
			console.log(error);
		}
	},

	// 상세조회 GET
	getProduct: async (productId) => {
		try {
			const response = await fetch(`${API_URL}/${productId}`);

			if (!response.ok) {
				throw new Error('조회 실패');
			}

			const data = await response.json();

			console.log(data);
			alert('조회 성공 : ' + data.name);

			return data;

		} catch (error) {
			console.log(error);
		}
	},

	// 생성 POST
	createProduct: async (image, tags, price, description, name) => {
		try {
			const newProduct = {
				images: image,
				tags: tags,
				price: price,
				description: description,
				name: name,
			};

			const response = await fetch(API_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newProduct),
			});

			if (!response.ok) {
				throw new Error('등록 실패');
			}

			const data = await response.json();

			console.log(data);
			alert('등록 성공');

			return data;

		} catch (error) {
			console.log(error);
		}
	},

	// 수정 PATCH
	patchProduct: async (productId, image, tags, price, description, name) => {
		try {
			const updateProduct = {
				images: image,
				tags: tags,
				price: price,
				description: description,
				name: name,
			};

			const response = await fetch(`${API_URL}/${productId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updateProduct),
			});

			if (!response.ok) {
				throw new Error('수정 실패');
			}

			const data = await response.json();

			console.log(data);
			alert('수정 성공');

			return data;

		} catch (error) {
			console.log(error);
		}
	},

	// 삭제 DELETE
	deleteProduct: async (productId) => {
		try {
			const response = await fetch(`${API_URL}/${productId}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error('삭제 실패');
			}

			const data = await response.json();

			console.log(data);
			alert('삭제 성공');

			return data;

		} catch (error) {
			console.log(error);
		}
	},
};