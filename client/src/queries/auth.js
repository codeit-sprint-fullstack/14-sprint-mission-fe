// API 요청을 React Query로 감싸고 캐시, 로딩, 에러 상태 관리
// useQuery는 기본 3번 재요청 -> 조회
// useMutation은 재요청 없음 -> 생성, 수정, 삭제

import * as api from '@/api';
import { useMutation, useQuery } from '@tanstack/react-query';

// 로그인 사용자 조회 및 캐싱
export function useUser() {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => api.getMe()
  })
}

// 회원가입 요청 상태 관리
export function useRegister() {
  return useMutation({
    mutationFn: api.register
  })
}

// 로그인 요청 상태 관리
export function useLogin() {
  return useMutation({
    mutationFn: api.login
  })
}