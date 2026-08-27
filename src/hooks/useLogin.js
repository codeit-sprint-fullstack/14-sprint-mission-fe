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

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || '로그인에 실패했습니다.');
      }

      return result;
    },
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('nickname', data.user.nickname);
      router.push('/notice');
    },
  });
}

