import Axios from "axios";

const axios = Axios.create({
  baseURL: 'https://pandamarket-psql.onrender.com'
})

export default axios