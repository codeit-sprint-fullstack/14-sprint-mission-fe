import * as s from 'superstruct'

const CreateProduct = s.object({
  name: s.size(s.string(), 1, 10),
  description: s.size(s.string(), 10, 100),
  price: s.min(s.number(), 0),
  tags: s.optional(s.array(s.size(s.string(), 1, 5))),
})

const UpdateProduct = s.partial(CreateProduct)

export { CreateProduct, UpdateProduct }
