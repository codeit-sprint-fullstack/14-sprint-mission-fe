import * as articleService from '../services/articleService.js';

export const getArticles = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const orderBy =
      req.query.orderBy === 'recent' ? { createdAt: 'desc' } : {};
    const keyword = req.query.keyword || '';

    const where = keyword
      ? {
          OR: [
            {
              title: {
                contains: keyword,
                mode: 'insensitive',
              },
            },
            {
              content: {
                contains: keyword,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    const result = await articleService.getArticles({
      page,
      pageSize,
      orderBy,
      keyword,
      where,
    });

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: '게시글 목록 조회에 실패했습니다.' });
  }
};

export const getArticleByid = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await articleService.getArticleByid(id);

    if (!result) {
      return res.status(404).send({ message: '게시글을 찾을 수 없습니다.' });
    }

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: '게시글 조회에 실패했습니다.' });
  }
};

export const createArticle = async (req, res) => {
  try {
    const result = await articleService.createArticle(req.body);

    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: '게시글 등록에 실패했습니다.' });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await articleService.updateArticle(id, req.body);

    if (!result) {
      return res.status(404).send({ message: '게시글을 찾을 수 없습니다.' });
    }

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: '게시글 수정에 실패했습니다.' });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    await articleService.deleteArticle(id);

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: '게시글 삭제에 실패했습니다.' });
  }
};