import axios from "axios";

const BASE_URL = "http://localhost:3000/products";

export async function getProducts({ offset, limit, sort, keyword }) {
  const params = new URLSearchParams({
    offset: String(offset),
    limit: String(limit),
    sort,
  });

  if (keyword) {
    params.set("keyword", keyword);
  }

  const response = await axios.get(`${BASE_URL}?${params.toString()}`);

  return response.data;
}
