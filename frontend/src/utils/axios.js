import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://panda-market-api.vercel.app/products',
});

export default axios;