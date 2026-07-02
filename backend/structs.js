// structs.js
import * as s from 'superstruct';
import isEmail from 'is-email';

export const CreateUser = s.object({
  email: s.define('Email', isEmail),
  firstName: s.size(s.string(), 1, 30),
  lastName: s.size(s.string(), 1, 30),
  address: s.string()
});

export const CreateArticle = s.object({
  title: s.string(),
  content: s.string(),
  authorId: s.string()
});

export const PatchUser = s.partial(CreateUser);

export const CreateProduct = s.object({
  name: s.size(s.string(), 1, 60),
  description: s.string(),
  price: s.min(s.number(), 0),
  tags: s.array(s.string()),
  images: s.array(s.string()),
  ownerId: s.string(),
  favoriteCount: s.number()
});

export const PatchProduct = s.partial(CreateProduct);

export const CreateComment = s.object({
  content: s.string(),
  articleId: s.string(),
  authorId: s.string()
});