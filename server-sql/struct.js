import * as s from 'superstruct';
import isEmail from 'is-email';

export const CreateItem = s.object({
  name: s.size(s.string(), 1, 30),
  description: s.string(),
  price: s.min(s.number(), 0),
  tags: s.optional(s.array(s.string())),
});

export const PatchItem = s.partial(CreateItem);

export const CreateArticle = s.object({
  title: s.size(s.string(), 1, 30),
  content: s.string(),
});

export const PatchArticle = s.partial(CreateArticle);

export const CreateComment = s.object({
  content: s.string(),
});

export const PatchComment = s.partial(CreateComment);
