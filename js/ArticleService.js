import axios from 'axios';

//공통되는 부분 인스턴스 처리
const instance = axios.create({
  baseURL : "https://panda-market-api-crud.vercel.app",
});

function getArticleList ( page = 1, pageSize = 5, keyword = '' ) {
  return instance.get('/articles', {
    params: {
      page,
      pageSize,
      keyword,
    }
  }).then(response => response.data)
  .catch(e => console.log(`오류 :`, e.message))
  .finally(() => console.log('요청 완료'));
}

//요청한 아이디 값만 get
function getArticle ( id ) {
  return instance.get(`/articles/${id}`)
  .then(response => response.data)
  .catch(e => console.log(`오류 :`, e.message))
  .finally(() => console.log('요청 완료'));
}


function createArticle ( title, content, image ) {
  return instance.post('/articles', {
    title,
    content,
    image,
  }).then(response => response.data)
  .catch(e => console.log(`오류 :`, e.message))
  .finally(() => console.log('요청 완료'));
}

//수정할 데이터를 객체 형태로 data에 보낸다
function patchArticle ( id, data ) {
  return instance.patch(`/articles/${id}`, data)
  .then(response => response.data)
  .catch(e => console.log(`오류 :`, e.message))
  .finally(() => console.log('요청 완료'));
}


function deleteArticle ( id ) {
  return instance.delete(`/articles/${id}`)
  .then(response => response.data)
  .catch(e => console.log(`오류 :`, e.message))
  .finally(() => console.log('요청 완료'));
}

const articleService = {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle
};

export default articleService;
