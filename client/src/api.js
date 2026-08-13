// 실제 API 요청 및 응답 반환

import axios from './lib/axios';

export async function getMe() {
  const accessToken = localStorage.getItem('accessToken');
  const res = await axios.get('/users/me', {
    headers: { 'Authorization': `Bearer ${accessToken}` },
  });
  return res.data;
}

export async function register(data) {
  const res = await axios.post('/auth/signUp', data);
  return res.data;
}

export async function login(data) {
  const res = await axios.post('/auth/signIn', data);
  return res.data;
}