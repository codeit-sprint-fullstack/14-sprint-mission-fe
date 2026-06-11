const BASE_URL = "https://panda-market-api-crud.vercel.app";

export function getArticleList(page, pageSize, keyword) {
  return fetch(`${BASE_URL}/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)
    .then(response => {
      if (!response.ok) {
        console.error("에러 발생:", response.status);
        return;
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => console.error(error));
}

export function patchArticle(id, title, content, image) {
  return fetch(`${BASE_URL}/articles/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, image })
  })
    .then(response => {
      if (!response.ok) {
        console.error("에러 발생:", response.status);
        return;
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => console.error(error));
}

export function createArticle(title, content, image) {
  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, image })
  })
    .then(response => {
      if (!response.ok) {
        console.error("에러 발생:", response.status);
        return;
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => console.error(error));
}

export function deleteArticle(id) {
  return fetch(`${BASE_URL}/articles/${id}`, {
    method: "DELETE"
  })
    .then(response => {
      if (!response.ok) {
        console.error("에러 발생:", response.status);
        return;
      }
      console.log("삭제 완료");
    })
    .catch(error => console.error(error));
}

export function getArticle(id) {
  return fetch(`${BASE_URL}/articles/${id}`)
    .then(response => {
      if (!response.ok) {
        console.error("에러 발생:", response.status);
        return;
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => console.error(error));
}