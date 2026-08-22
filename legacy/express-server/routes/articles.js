import { Router } from 'express';
import { query } from '../config/db.js';
import {
  createArticleComment,
  listArticleComments,
} from '../controllers/commentController.js';
import {
  createHttpError,
  normalizeOptionalText,
  normalizeRequiredText,
  parseLimit,
  parseOffset,
  parsePositiveInteger,
} from '../utils/http.js';

const router = Router();

function serializeArticle(row) {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    image: row.image,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function pickArticlePayload(body, { partial = false } = {}) {
  const payload = {};

  if (Object.prototype.hasOwnProperty.call(body, 'title')) {
    payload.title = normalizeRequiredText(body.title, 'title');
  }

  if (Object.prototype.hasOwnProperty.call(body, 'content')) {
    payload.content = normalizeRequiredText(body.content, 'content');
  }

  if (Object.prototype.hasOwnProperty.call(body, 'image')) {
    payload.image = normalizeOptionalText(body.image) || null;
  }

  if (!partial) {
    ['title', 'content'].forEach((field) => {
      if (!Object.prototype.hasOwnProperty.call(payload, field)) {
        throw createHttpError(400, `${field} 필드는 필수입니다.`);
      }
    });
  }

  if (partial && Object.keys(payload).length === 0) {
    throw createHttpError(400, '수정할 필드가 없습니다.');
  }

  return payload;
}

router.get('/', async (req, res, next) => {
  try {
    const offset = parseOffset(req.query.offset || 0);
    const limit = parseLimit(req.query.limit || 10);
    const keyword = String(req.query.keyword || '').trim();
    const orderBy = req.query.orderBy || 'recent';
    const params = [];
    const where = keyword ? 'WHERE title ILIKE $1 OR content ILIKE $1' : '';

    if (keyword) {
      params.push(`%${keyword}%`);
    }

    const sort = orderBy === 'recent' ? 'created_at DESC, id DESC' : 'created_at DESC, id DESC';
    const totalResult = await query(`SELECT COUNT(*)::int AS count FROM articles ${where}`, params);
    const listResult = await query(
      `SELECT id, title, content, image, created_at AS "createdAt"
       FROM articles
       ${where}
       ORDER BY ${sort}
       OFFSET $${params.length + 1}
       LIMIT $${params.length + 2}`,
      [...params, offset, limit],
    );

    res.status(200).json({
      list: listResult.rows.map((row) => ({
        id: row.id,
        title: row.title,
        content: row.content,
        image: row.image,
        createdAt: row.createdAt,
      })),
      totalCount: totalResult.rows[0].count,
      offset,
      limit,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const payload = pickArticlePayload(req.body);
    const result = await query(
      `INSERT INTO articles (title, content, image)
       VALUES ($1, $2, $3)
       RETURNING id, title, content, image,
         created_at AS "createdAt",
         updated_at AS "updatedAt"`,
      [payload.title, payload.content, payload.image || null],
    );

    res.status(201).json(serializeArticle(result.rows[0]));
  } catch (error) {
    next(error);
  }
});

router.get('/:articleId', async (req, res, next) => {
  try {
    const articleId = parsePositiveInteger(req.params.articleId, 'articleId');
    const result = await query(
      `SELECT id, title, content, image, created_at AS "createdAt"
       FROM articles
       WHERE id = $1`,
      [articleId],
    );

    if (result.rowCount === 0) {
      throw createHttpError(404, '게시글을 찾을 수 없습니다.');
    }

    res.status(200).json({
      id: result.rows[0].id,
      title: result.rows[0].title,
      content: result.rows[0].content,
      image: result.rows[0].image,
      createdAt: result.rows[0].createdAt,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:articleId', async (req, res, next) => {
  try {
    const articleId = parsePositiveInteger(req.params.articleId, 'articleId');
    const payload = pickArticlePayload(req.body, { partial: true });
    const fields = [];
    const values = [];

    Object.entries(payload).forEach(([field, value]) => {
      values.push(value);
      fields.push(`${field} = $${values.length}`);
    });

    values.push(articleId);

    const result = await query(
      `UPDATE articles
       SET ${fields.join(', ')}
       WHERE id = $${values.length}
       RETURNING id, title, content, image,
         created_at AS "createdAt",
         updated_at AS "updatedAt"`,
      values,
    );

    if (result.rowCount === 0) {
      throw createHttpError(404, '게시글을 찾을 수 없습니다.');
    }

    res.status(200).json(serializeArticle(result.rows[0]));
  } catch (error) {
    next(error);
  }
});

router.delete('/:articleId', async (req, res, next) => {
  try {
    const articleId = parsePositiveInteger(req.params.articleId, 'articleId');
    const result = await query('DELETE FROM articles WHERE id = $1', [articleId]);

    if (result.rowCount === 0) {
      throw createHttpError(404, '게시글을 찾을 수 없습니다.');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.get('/:articleId/comments', listArticleComments);
router.post('/:articleId/comments', createArticleComment);

export default router;
