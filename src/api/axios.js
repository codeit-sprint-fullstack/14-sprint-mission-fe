import axios from "axios";

const api = axios.create({
 baseURL: "https://panda-market-api.vercel.app"
})

export default api