import * as s from 'superstruct';

const createComment = s.object({
  content: s.size(s.string(), 1, 100)
})

const updateComment = createComment;

export default {
  createComment,
  updateComment,
}