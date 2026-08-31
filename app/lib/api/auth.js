import axios from "@/app/lib/axios";

export async function signIn(credentials) {
  const res = await axios.post("/auth/signIn", credentials);
  return res.data;
}

export async function signUp(newUser) {
  const res = await axios.post("/auth/signUp", newUser);
  return res.data;
}

//유저 인가를 확인하고 정보를 가져오는 함수
export async function getMe() {
  try {
    const res = await axios.get("/users/me");
    return res.data;
  } catch (error) {
    if (error.response?.status === 401) {
      return null;
    } else {
      throw error;
    }
  }
}
