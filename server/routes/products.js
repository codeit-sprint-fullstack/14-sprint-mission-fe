import { Router } from 'express';
import { query } from '../config/db.js';
import {
  createProductComment,
  listProductComments,
} from '../controllers/commentController.js';
import {
  createHttpError,
  normalizeRequiredText,
  parseLimit,
  parseOffset,
  parsePositiveInteger,
} from '../utils/http.js';

const router = Router();

function normalizeTags(tags) {
  if (!Array.isArray(tags)) {
    return [];
  }

  return [...new Set(tags.map((tag) => String(tag).trim()).filter(Boolean))];
}

function validateTags(tags) {
  const invalidTag = tags.find((tag) => tag.length > 5);

  if (invalidTag) {
    throw createHttpError(400, '태그는 5글자 이내여야 합니다.');
  }
}

function serializeProduct(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price,
    tags: row.tags || [],
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function pickProductPayload(body, { partial = false } = {}) {
  const payload = {};

  if (Object.prototype.hasOwnProperty.call(body, 'name')) {
    const name = normalizeRequiredText(body.name, 'name');

    if (name.length > 10) {
      throw createHttpError(400, '상품명은 10자 이내여야 합니다.');
    }

    payload.name = name;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'description')) {
    const description = normalizeRequiredText(body.description, 'description');

    if (description.length < 10 || description.length > 100) {
      throw createHttpError(400, '상품 소개는 10자 이상 100자 이내여야 합니다.');
    }

    payload.description = description;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'price')) {
    const price = Number(body.price);

    if (!Number.isInteger(price) || price < 0) {
      throw createHttpError(400, '판매 가격은 0 이상의 숫자로 입력해주세요.');
    }

    payload.price = price;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'tags')) {
    const tags = normalizeTags(body.tags);
    validateTags(tags);
    payload.tags = tags;
  }

  if (!partial) {
    ['name', 'description', 'price'].forEach((field) => {
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
    const where = keyword ? 'WHERE name ILIKE $1 OR description ILIKE $1' : '';

    if (keyword) {
      params.push(`%${keyword}%`);
    }

    const sort = orderBy === 'recent' ? 'created_at DESC, id DESC' : 'created_at DESC, id DESC';
    const totalResult = await query(`SELECT COUNT(*)::int AS count FROM products ${where}`, params);
    const listResult = await query(
      `SELECT id, name, price, created_at AS "createdAt"
       FROM products
       ${where}
       ORDER BY ${sort}
       OFFSET $${params.length + 1}
       LIMIT $${params.length + 2}`,
      [...params, offset, limit],
    );

    res.status(200).json({
      list: listResult.rows,
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
    const payload = pickProductPayload(req.body);
    const result = await query(
      `INSERT INTO products (name, description, price, tags)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, description, price, tags,
         created_at AS "createdAt",
         updated_at AS "updatedAt"`,
      [payload.name, payload.description, payload.price, payload.tags || []],
    );

    res.status(201).json(serializeProduct(result.rows[0]));
  } catch (error) {
    next(error);
  }
});

router.get('/:productId', async (req, res, next) => {
  try {
    const productId = parsePositiveInteger(req.params.productId, 'productId');
    const result = await query(
      `SELECT id, name, description, price, tags,
        created_at AS "createdAt"
       FROM products
       WHERE id = $1`,
      [productId],
    );

    if (result.rowCount === 0) {
      throw createHttpError(404, '상품을 찾을 수 없습니다.');
    }

    res.status(200).json({
      id: result.rows[0].id,
      name: result.rows[0].name,
      description: result.rows[0].description,
      price: result.rows[0].price,
      tags: result.rows[0].tags || [],
      createdAt: result.rows[0].createdAt,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:productId', async (req, res, next) => {
  try {
    const productId = parsePositiveInteger(req.params.productId, 'productId');
    const payload = pickProductPayload(req.body, { partial: true });
    const fields = [];
    const values = [];

    Object.entries(payload).forEach(([field, value]) => {
      values.push(value);
      fields.push(`${field} = $${values.length}`);
    });

    values.push(productId);

    const result = await query(
      `UPDATE products
       SET ${fields.join(', ')}
       WHERE id = $${values.length}
       RETURNING id, name, description, price, tags,
         created_at AS "createdAt",
         updated_at AS "updatedAt"`,
      values,
    );

    if (result.rowCount === 0) {
      throw createHttpError(404, '상품을 찾을 수 없습니다.');
    }

    res.status(200).json(serializeProduct(result.rows[0]));
  } catch (error) {
    next(error);
  }
});

router.delete('/:productId', async (req, res, next) => {
  try {
    const productId = parsePositiveInteger(req.params.productId, 'productId');
    const result = await query('DELETE FROM products WHERE id = $1', [productId]);

    if (result.rowCount === 0) {
      throw createHttpError(404, '상품을 찾을 수 없습니다.');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.get('/:productId/comments', listProductComments);
router.post('/:productId/comments', createProductComment);

export default router;
