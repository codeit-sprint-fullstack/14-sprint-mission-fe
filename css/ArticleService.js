function getArticleList(page, pageSize, keyword){
  return fetch(`https://panda-market-api-crud.vercel.app/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`).then((response)=>{
    if(!response.ok){
      console.error('getArticleList 에러:', response.status)
      throw new Error('리스트 불러오기 실패');
    }
    return response.json();
  })
}

function getArticle(articleId) {
  return fetch (`https://panda-market-api-crud.vercel.app/articles/${articleId}`).then((response)=> {
    if(!response.ok){
      console.error('getArticle 에러:', response.status)
      throw new Error('게시물 조회 실패');
    }
    return response.json()
  })
}

function createArticle(articleData) {
  return fetch('https://panda-market-api-crud.vercel.app/articles', {
    method: 'POST',
    body: JSON.stringify(articleData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.error('createArticle 에러:', response.status);
        throw new Error('게시물 작성 실패');
      }
      return response.json();
    });
}

function patchArticle(articleId, articleData){
  return fetch(`https://panda-market-api-crud.vercel.app/articles/${articleId}`,{
    method: 'PATCH', 
    body: JSON.stringify(articleData), 
    headers: {
    'Content-Type': 'application/json'
    },
  })
  .then((response) => {
    if (!response.ok) {
      console.error('patchArticle 에러:', response.status);
      throw new Error('게시물 수정 실패');
    }
    return response.json();
  });
}

function deleteArticle(articleId){
  return fetch(`https://panda-market-api-crud.vercel.app/articles/${articleId}`,{
    method: 'DELETE'
  })
  .then((response)=> {
    if(!response.ok){
      console.error('deleteArticle 에러:', response.status);
      throw new Error('게시물 삭제 실패');
    }
    return response.json();
  })
}

export default {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle
}
