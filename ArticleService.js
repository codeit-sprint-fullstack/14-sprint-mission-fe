import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://panda-market-api-crud.vercel.app'
});

export function getArticleList(page, pageSize, keyword) {
 
  return instance.get(`/articles`, {
    params: {
      page: page,
      pageSize: pageSize,
      keyword: keyword
    }
  })
  .then(response => {
    return response.data;
  })
  .catch((error) => {
    console.error(error.message);
  })
}

export  function getArticle(articleId) {
  
  return instance.get(`/articles/${articleId}`)
  
  .then(response => {
    return response.data;
  })
  .catch((error) => {
  console.error(error.message);
  })
}

export function createArticle({ title, content, image }) {
  
  return instance.post(`/articles`, {
      title: title,
      content: content,
      image: image
    })
  .then(response => {
    return response.data;
  })
  .catch((error) => {
  console.error(error.message);
  })
}

export function patchArticle( articleId, updateData ) {
  return instance.patch(`/articles/${articleId}`, updateData)
  .then(response => {
    return response.data;
  })
  .catch((error) => {
    console.error(error.message);
  });
}


export function deleteArticle(articleId){
  
  return instance.delete(`/articles/${articleId}`)
  .then(response => {
    return response.data;
  })
  .catch((error) => {
    console.error(error.message);
  })
}
