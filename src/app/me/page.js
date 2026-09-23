// 요구사항에는 로그아웃과 관련된 부분은 없지만 테스트를 위해 임시로 만든 페이지

"use client";

import Button from "@/components/Button/Button";
import useCurrentUser from "@/hooks/useCurrentUser";
import { getApiErrorMessage } from "@/lib/apiError";
import { removeAccessToken } from "@/lib/authToken";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const {
    data: currentUser,
    isCheckingAuth,
    hasAuthError,
    error: authError,
  } = useCurrentUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    removeAccessToken();
    queryClient.setQueryData(["currentUser"], null);
    router.replace("/signin");
  };

  if (isCheckingAuth) {
    return null;
  }

  if (hasAuthError) {
    const authErrorMessage = getApiErrorMessage(
      authError,
      "로그인 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
    );

    return <p>{authErrorMessage}</p>;
  }

  if (!currentUser) {
    return <p>로그인이 필요합니다.</p>;
  }

  return (
    <main>
      <h1>내 정보</h1>
      <p>{currentUser.nickname}</p>

      <Button type="button" onClick={handleLogout}>
        로그아웃
      </Button>
    </main>
  );
}
