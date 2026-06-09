const API_URL = "https://panda-market-api-crud.vercel.app/articles";

export const articleService = {
	//목록조회 GET
	getArticleList : async (page, pageSize = 5, keyword = '') => {
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
	getArticle: async (articleId) => {
		fetch(`${API_URL}/${articleId}`).then(response => {
			if (!response.ok) {
				throw new Error('조회 실패');
			}

			return response.json();
		}).then(data => {
			console.log(data);
			alert('조회 성공 :' + data.content);
		}).catch(error => {
			console.log(error);
		});
	},

	//생성 POST
	createArticle: async () => {
		const exampleArticle = {
			"image": "https://example.com/...",
			"content": "게시글 내용입니다.",
			"title": "게시글 제목입니다."
		};

		fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(exampleArticle),
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
	patchArticle: (articleId) => {
		const exampleArticle = {
			"image": "https://example.com/...",
			"content": "게시글 내용 수정입니다.",
			"title": "게시글 제목 수정입니다."
		};

		fetch(`${API_URL}/${articleId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(exampleArticle),
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
	deleteArticle: (articleId) => {
		fetch(`${API_URL}/${articleId}`, {
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