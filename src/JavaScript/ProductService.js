import errorChecker from "./errorChecker.js";

async function getProduct(link) {
  console.log(`getProduct(이)가 실행됩니다.`);
  // const url = new URL(`https://panda-market-api-crud.vercel.app/products`); 
  return fetch(link)
    .then((res) => {
      errorChecker(res.status);
      return res.json();
    })
    .then((setData) => {
      console.log(setData);
      console.log(`getProduct 실행 완료.`);
      return setData;      
    });
}

async function getProductList(parms = {}) {
  console.log(`getProductList(이)가 실행됩니다.`);
  const url = new URL(`https://panda-market-api-crud.vercel.app/products`);
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
      console.log(`getProductList 실행 완료.`);
      return setData;      
    });
}

async function createProduct(serveyData = {}) {
  console.log(`creatProduct(이)가 실행됩니다.`);
  const url = new URL(`https://panda-market-api-crud.vercel.app/products`);
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
      console.log(`creatProduct 실행 완료.`);
      return setData;      
    });
  return res;   
}

async function patchProduct(id, surveyData = {}) {
  console.log(`patchProduct(이)가 실행됩니다.`);
  const url = `https://panda-market-api-crud.vercel.app/products/${id}`;
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
      console.log(`patchProduct 실행 완료.`);
      return setData;      
    });
}

async function deleteProduct(id) {
  console.log(`deleteProduct(이)가 실행됩니다.`);
  const url = `https://panda-market-api-crud.vercel.app/products/${id}`;
  const res = await fetch(url, {
    method: "DELETE",
  })
  .then((res) => {
      errorChecker(res.status);
      return res.json();
    })
    .then((setData) => {
      console.log(`deleteProduct 실행 완료.`);
      return setData;      
    });
}


export default {getProductList, getProduct, createProduct, patchProduct, deleteProduct};