const BASE_URL = "https://panda-market-api.vercel.app";

export async function signIn({ email, password }) {
  const res = await fetch(`${BASE_URL}/auth/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "로그인에 실패했습니다.");
  }

  return data;
}

export async function signUp({
  email,
  nickname,
  password,
  passwordConfirmation,
}) {
  const res = await fetch(`${BASE_URL}/auth/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      nickname,
      password,
      passwordConfirmation,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "회원가입에 실패했습니다.");
  }

  return data;
}
