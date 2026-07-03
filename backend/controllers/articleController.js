import * as articleService from '../services/articleService.js';

export const getArticles = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const orderBy = req.query.orderBy === 'recent'? { createdAt: 'desc' } : {};
    const keyword = req.query.keyword || '';

    const where = keyword ? {
        OR: [
            {
                title: {
                    contains: keyword,
                    mode: "insensitive",
                },
            },
            {
                content: {
                    contains: keyword,
                    mode: "insensitive",
                },
            },
        ],
        }
    : {};
    
    const result = await articleService.getArticles({page, pageSize, orderBy, keyword, where});

    res.send(result);
};

export const getArticleByid = async (req, res) => {
    const {id} = req.params;
    const result = await articleService.getArticleByid(id);

    res.send(result);
};

export const createArticle = async (req, res) => {
    const result = await articleService.createArticle(req.body);

    res.status(201).send(result);
};

export const updateArticle = async (req, res) => {
    const {id} = req.params;
    const result = await articleService.updateArticle(id, req.body);

    res.status(201).send(result);
}

export const deleteArticle = async (req, res) => {
    const {id} = req.params;
    await articleService.deleteArticle(id);

    res.sendStatus(204);
}