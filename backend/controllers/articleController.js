import * as articleService from '../services/articleService.js';

export const getArticles = async (req, res) => {
    const result = await articleService.getArticles();

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