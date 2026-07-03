import * as productService from '../services/productService.js';

export const getProducts = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const orderBy = req.query.orderBy === 'recent'? { createdAt: 'desc' } : { favoriteCount: 'desc' };
    const keyword = req.query.keyword || '';

    const where = keyword ? {
        OR: [
            {
                name: {
                    contains: keyword,
                    mode: "insensitive",
                },
            },
            {
                description: {
                    contains: keyword,
                    mode: "insensitive",
                },
            },
        ],
        }
    : {};

    const product = await productService.getProducts({page, pageSize, orderBy, keyword, where});

    res.send(product);
}

export const getProductById = async (req, res) => {
    const {id} = req.params;
    const product = await productService.getProductById(id);

    res.send(product);
}

export const createProduct = async (req, res) => {
    const result = await productService.createProduct(req.body);

    res.status(201).send(result);
}

export const updateProduct = async (req, res) => {

}

export const deleteProduct = async (req, res) => {

}