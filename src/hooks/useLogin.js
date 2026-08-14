import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signIn`, {
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
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('nickname', data.user.nickname);
      router.push('/notice');
    },
  });
}
