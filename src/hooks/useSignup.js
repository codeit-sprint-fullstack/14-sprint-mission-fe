import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signUp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const data = await res.json();
        throw data; // ✅ Error 객체 대신 서버 응답 JSON 던지기
      }
      return res.json();
    },
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem('accessToken', data.accessToken); // ✅ 토큰 저장
      localStorage.setItem('nickname', data.user.nickname); // ✅ 닉네임 저장
      router.push('/notice'); // ✅ 회원가입 성공 시 자동 로그인 상태로 중고마켓 페이지 이동
    },
  });
}
