import * as s from 'superstruct';

const createArticle = s.object({
  title: s.size(s.string(), 1, 50),
  content: s.size(s.string(), 1, Infinity),
  image: s.optional(s.string()),
});

const updateArticle = s.partial(createArticle);

export default {
  createArticle,
  updateArticle,
}