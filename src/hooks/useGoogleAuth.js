import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

// 구글에서 받은 토큰(access token 또는 credential)을 백엔드로 보내 우리 JWT 를 받는다.
export function useGoogleAuth() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload) => {
      const body = typeof payload === "string" ? { accessToken: payload } : payload;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "구글 로그인에 실패했습니다.");
      return result;
    },
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("nickname", data.user.nickname);
      router.push("/notice");
    },
  });
}
