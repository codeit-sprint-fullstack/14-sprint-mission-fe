import axios from "@/app/lib/axios";

export async function signIn(credentials) {
  const res = await axios.post("/auth/signIn", credentials);
  return res.data;
}

export async function signUp(newUser) {
  const res = await axios.post("/auth/signUp", newUser);
  return res.data;
}
