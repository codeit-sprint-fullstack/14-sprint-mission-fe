import * as s from 'superstruct'

const CreateArticle = s.object({
  // 요구사항에 명시된 내용이 없어서 타입만 검사
  title: s.string(),
  content: s.string(),
})

const UpdateArticle = s.partial(CreateArticle)

export { CreateArticle, UpdateArticle }
