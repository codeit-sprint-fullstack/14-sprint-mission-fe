import axios from "@/app/lib/axios.js";

export async function getProducts({ orderBy, pageSize, page, keyword }) {
  const res = await axios.get("/products", {
    params: {
      orderBy,
      pageSize,
      page,
      keyword,
    },
  });
  return res.data;
}

export async function getProductDetail(id) {
  const res = await axios.get(`/products/${id}`);
  return res.data;
}

export async function patchProductDetail({ id, ...productData }) {
  const res = await axios.patch(`/products/${id}`, productData);
  return res.data;
}

export async function deleteProduct(id) {
  const res = await axios.delete(`/products/${id}`);
  return res.data;
}

export async function postProductFavorite(id) {
  const res = await axios.post(`/products/${id}/favorite`);
  return res.data;
}

export async function deleteProductFavorite(id) {
  const res = await axios.delete(`/products/${id}/favorite`);
  return res.data;
}
