import * as s from 'superstruct';

const updateImage = s.object({
  image: s.string(),
});

const updatePassword = s.object({
  passwordConfirmation: s.size(s.string(), 8, 30),
  password: s.size(s.string(), 8, 30),
  currentPassword: s.size(s.string(), 8, 30),
});

export default {
  updateImage,
  updatePassword,
}