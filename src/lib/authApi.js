import apiClient from "./apiClient";

export async function signIn(email, password) {
  const response = await apiClient.post("/auth/signIn", {
    email,
    password,
  });

  return response.data;
}

export async function signUp(email, nickname, password, passwordConfirmation) {
  const response = await apiClient.post("/auth/signUp", {
    email,
    nickname,
    password,
    passwordConfirmation,
  });

  return response.data;
}
