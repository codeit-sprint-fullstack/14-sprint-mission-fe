import errorChecker from "./errorChecker.js";

async function getArticle() {
  console.log(`getArticle(이)가 실행됩니다.`);
  const url = new URL(`https://panda-market-api-crud.vercel.app/articles`); 
  return fetch(url)
    .then((res) => {
      errorChecker(res.status);
      return res.json();
    })
    .then((setData) => {
      console.log(setData);
      console.log(`getArticle 실행 완료.`);
      return setData;      
    });
}

async function getArticleList(parms = {}) {
  console.log(`getArticleList(이)가 실행됩니다.`);
  const url = new URL(`https://panda-market-api-crud.vercel.app/articles`);
  Object.keys(parms).forEach((key) =>
    url.searchParams.append(key, parms[key])
  );
  return fetch(url)
    .then((res) => {
      errorChecker(res.status);
      return res.json();
    })
    .then((setData) => {
      console.log(setData);
      console.log(`getArticleList 실행 완료.`);
      return setData;      
    });
}

async function createArticle(serveyData = {}) {
  console.log(`creatArticle(이)가 실행됩니다.`);
  const url = new URL(`https://panda-market-api-crud.vercel.app/articles`);
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(serveyData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((res) => {
      errorChecker(res.status);
      return res.json();
    })
    .then((setData) => {
      console.log(setData);
      console.log(`creatArticle 실행 완료.`);
      return setData;      
    });
  return res;
}

async function patchArticle(id, surveyData = {}) {
  console.log(`patchArticle(이)가 실행됩니다.`);
  const url = `https://panda-market-api-crud.vercel.app/articles/${id}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(surveyData),
  })
  .then((res) => {
      errorChecker(res.status);
      return res.json();
    })
    .then((setData) => {
      console.log(setData);
      console.log(`patchArticle 실행 완료.`);
      return setData;      
    });
}

async function deleteArticle(id) {
  console.log(`deleteArticle(이)가 실행됩니다.`);
  const url = `https://panda-market-api-crud.vercel.app/articles/${id}`;
  const res = await fetch(url, {
    method: "DELETE",
  })
  .then((res) => {
      errorChecker(res.status);
      return res.json();
    })
    .then((setData) => {
      console.log(`deleteArticle 실행 완료.`);
      return setData;      
    });
}

export default {getArticleList, getArticle, createArticle, patchArticle, deleteArticle};