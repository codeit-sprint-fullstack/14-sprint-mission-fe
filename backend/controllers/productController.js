import * as productService from '../services/productService.js';

export const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const orderBy =
      req.query.orderBy === 'recent'
        ? { createdAt: 'desc' }
        : { favoriteCount: 'desc' };
    const keyword = req.query.keyword || '';

    const where = keyword
      ? {
          OR: [
            {
              name: {
                contains: keyword,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: keyword,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    const products = await productService.getProducts({
      page,
      pageSize,
      orderBy,
      keyword,
      where,
    });

    res.send(products);
  } catch (error) {
    res.status(500).json({
      message: '상품 목록 조회에 실패했습니다.',
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productService.getProductById(id);

    res.send(product);
  } catch (error) {
    res.status(404).json({
      message: '상품을 찾을 수 없습니다.',
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const result = await productService.createProduct(req.body);

    res.status(201).send(result);
  } catch (error) {
    res.status(400).json({
      message: '상품 등록에 실패했습니다.',
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productService.updateProduct(id, req.body);

    res.send(product);
  } catch (error) {
    res.status(404).json({
      message: '상품 수정에 실패했습니다.',
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await productService.deleteProduct(id);

    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({
      message: '상품을 찾을 수 없습니다.',
    });
  }
};