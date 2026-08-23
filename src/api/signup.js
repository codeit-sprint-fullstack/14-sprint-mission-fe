import api from "./axios";

export async function signup({ email, password, nickname,passwordConfirmation }) {
  const response =  await api.post("/auth/signUp",{
    email,password, nickname, passwordConfirmation,
  })
  return response.data;
}