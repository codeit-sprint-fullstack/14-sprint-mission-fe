import * as s from 'superstruct'

export const CreateProduct = s.object({
  name: s.size(s.string(), 1, 10),
  description: s.size(s.string(), 1, 100),
  price: s.size(s.number(), 1, Infinity),
  tags: s.array(s.size(s.string(), 1, 5))
})

export const PatchProduct = s.partial(CreateProduct)

export const CreateArticle = s.object({
  title: s.size(s.string(), 1, 50),
  content: s.size(s.string(), 1, Infinity)
})

export const PatchArticle = s.partial(CreateArticle)

export const CreateComment = s.object({
  content: s.size(s.string(), 1, 100)
})

export const PatchComment = CreateComment