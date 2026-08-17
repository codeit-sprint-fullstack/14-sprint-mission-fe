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
