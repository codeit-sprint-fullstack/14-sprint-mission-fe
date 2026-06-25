import Axios from 'axios';

const axios = Axios.create({
  // baseURL: 'https://panda-market-api.vercel.app/products',
  baseURL: 'http://localhost:3000/items',
});

export default axios;