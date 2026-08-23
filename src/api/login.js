import api from "./axios";

export async function login ({email, password}){
  const response = await api.post("/auth/signIn",{email, password})
  return response.data;
  
}