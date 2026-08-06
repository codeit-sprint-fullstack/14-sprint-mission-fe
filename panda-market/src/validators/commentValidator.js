import * as s from 'superstruct'

const CreateComment = s.object({
  // 요구사항에 명시된 내용이 없어서 타입만 검사
  content: s.string(),
})

const UpdateComment = s.partial(CreateComment)

export { CreateComment, UpdateComment }
