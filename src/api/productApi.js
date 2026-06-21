import axios from 'axios';

const PRODUCT_API_URL = 'https://panda-market-api.vercel.app/products';

async function getProducts({ orderBy, pageSize, keyword, page }) {
  const response = await axios.get(PRODUCT_API_URL, {
    params: {
      orderBy,
      pageSize,
      keyword,
      page,
    },
  });

  return response.data;
}

async function getBestProducts({ pageSize }) {
  const response = await axios.get(PRODUCT_API_URL, {
    params: {
      orderBy: 'favorite',
      pageSize,
    },
  });

  return response.data;
}

export { getProducts, getBestProducts };