import Axios from "axios";

const axios = Axios.create({
  baseURL: 'http://localhost:3003',
});

export default axios;