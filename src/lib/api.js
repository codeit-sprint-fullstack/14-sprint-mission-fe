import axios from "axios";

// Panda Market 외부 API 요청에 사용할 axios 인스턴스
const pandaMarketApi = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
});

export default pandaMarketApi;