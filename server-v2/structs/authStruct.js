import * as s from 'superstruct';
import isEmail from 'is-email';

const Email = s.define('email', (value) => isEmail(value));

// 회원가입 입력 값 유효성 검사
const createUser = s.object({
  email: Email,
  nickname: s.size(s.string(), 1, 20),
  password: s.size(s.string(), 8, 30),
  passwordConfirmation: s.size(s.string(), 8, 30),
})

// 로그인 입력 값 유효성 검사
const getUser = s.object({
  email: Email,
  password: s.size(s.string(), 8, 30),
})

export default {
  createUser,
  getUser,
}