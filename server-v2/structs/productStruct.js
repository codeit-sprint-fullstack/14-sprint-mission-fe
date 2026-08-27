import * as s from 'superstruct';

const createProduct = s.object({
  name: s.size(s.string(), 1, 10),
  description: s.size(s.string(), 1, 100),
  price: s.size(s.number(), 1, Infinity),
  tags: s.array(s.size(s.string(), 1, 5)),
  images: s.array(s.string()),
});

const updateProduct = s.partial(createProduct);

export default {
  createProduct,
  updateProduct,
}