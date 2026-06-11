import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://panda-market-api-crud.vercel.app/articles'})

export function getArticleList(
  page = 1,
  pageSize = 10,
  keyword = ''
) {
  return instance.get('/',
    { params: {
      page,
      pageSize,
      keyword,
    }}
  )

  .then ((res) => res.data)
  .catch((e) => {
    console.error(e.message)
  })
}

export function getArticle(articleId) {
  return instance.get(`/${articleId}`)

  .then ((res) => res.data)
  .catch((e) => {
    console.error(e.message)
  })
}


export function createArticle(
  title,
  content,
  image,
){
  return instance.post('/',
    {
      title,
      content,
      image,
    }
  )
  .then((res) => res.data)
  .catch((e) => {
    console.error(e.message)
  })
}

export function patchArticle(
  articleId,
  title,
  content,
  image,
){
  return instance.patch(`/${articleId}`,
    {
      title,
      content,
      image,
    }
  )
  .then((res) => res.data)
  .catch((e) => {
    console.error(e.message)
  })
}


export function deleteArticle(articleId) {
  return instance.delete(`/${articleId}`)

  .then((res) => res.data)
  .catch((e) => {
    console.error(e.message)
  })
}