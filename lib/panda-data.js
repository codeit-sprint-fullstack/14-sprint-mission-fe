import 'server-only';
import { query } from './db';
import { AppError } from './errors';

const parentConfig = {
  article: {
    table: 'articles',
    column: 'article_id',
    notFoundMessage: '게시글을 찾을 수 없습니다.',
  },
  product: {
    table: 'products',
    column: 'product_id',
    notFoundMessage: '상품을 찾을 수 없습니다.',
  },
};

export function parsePositiveInteger(value, fieldName) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AppError(400, `${fieldName} 값이 올바르지 않습니다.`);
  }

  return parsed;
}

export function parseOffset(value = 0) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new AppError(400, 'offset 값이 올바르지 않습니다.');
  }

  return parsed;
}

export function parseLimit(value = 10, max = 100) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0 || parsed > max) {
    throw new AppError(400, `limit은 1 이상 ${max} 이하여야 합니다.`);
  }

  return parsed;
}

function normalizeRequiredText(value, fieldName) {
  const text = String(value ?? '').trim();

  if (!text) {
    throw new AppError(400, `${fieldName} 필드는 필수입니다.`);
  }

  return text;
}

function normalizeOptionalText(value) {
  return value == null ? '' : String(value).trim();
}

function normalizeTags(tags) {
  if (!Array.isArray(tags)) {
    return [];
  }

  return [...new Set(tags.map((tag) => String(tag).trim()).filter(Boolean))];
}

function validateProductPayload(body, { partial = false } = {}) {
  const payload = {};

  if (Object.prototype.hasOwnProperty.call(body, 'name')) {
    const name = normalizeRequiredText(body.name, 'name');
    if (name.length > 10) throw new AppError(400, '상품명은 10자 이내여야 합니다.');
    payload.name = name;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'description')) {
    const description = normalizeRequiredText(body.description, 'description');
    if (description.length < 10 || description.length > 100) {
      throw new AppError(400, '상품 소개는 10자 이상 100자 이내여야 합니다.');
    }
    payload.description = description;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'price')) {
    const price = Number(body.price);
    if (!Number.isInteger(price) || price < 0) {
      throw new AppError(400, '판매 가격은 0 이상의 숫자로 입력해주세요.');
    }
    payload.price = price;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'tags')) {
    const tags = normalizeTags(body.tags);
    if (tags.some((tag) => tag.length > 5)) {
      throw new AppError(400, '태그는 5글자 이내여야 합니다.');
    }
    payload.tags = tags;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'image')) {
    payload.image = normalizeOptionalText(body.image) || null;
  }

  if (!partial) {
    ['name', 'description', 'price'].forEach((field) => {
      if (!Object.prototype.hasOwnProperty.call(payload, field)) {
        throw new AppError(400, `${field} 필드는 필수입니다.`);
      }
    });
  } else if (Object.keys(payload).length === 0) {
    throw new AppError(400, '수정할 필드가 없습니다.');
  }

  return payload;
}

function validateArticlePayload(body, { partial = false } = {}) {
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
        throw new AppError(400, `${field} 필드는 필수입니다.`);
      }
    });
  } else if (Object.keys(payload).length === 0) {
    throw new AppError(400, '수정할 필드가 없습니다.');
  }

  return payload;
}

function serializeProduct(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price,
    tags: row.tags || [],
    image: row.image,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function serializeArticle(row) {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    image: row.image,
    likeCount: Number(row.likeCount || 0),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function serializeComment(row) {
  return {
    id: row.id,
    content: row.content,
    createdAt: row.createdAt,
  };
}

export async function listProducts({ offset = 0, limit = 15, keyword = '' } = {}) {
  const safeOffset = parseOffset(offset);
  const safeLimit = parseLimit(limit);
  const searchKeyword = String(keyword || '').trim();
  const params = [];
  const where = searchKeyword ? 'WHERE name ILIKE $1 OR description ILIKE $1' : '';

  if (searchKeyword) params.push(`%${searchKeyword}%`);

  const totalResult = await query(`SELECT COUNT(*)::int AS count FROM products ${where}`, params);
  const listResult = await query(
    `SELECT id, name, price, image, created_at AS "createdAt"
     FROM products
     ${where}
     ORDER BY created_at DESC, id DESC
     OFFSET $${params.length + 1}
     LIMIT $${params.length + 2}`,
    [...params, safeOffset, safeLimit],
  );

  return {
    list: listResult.rows,
    totalCount: totalResult.rows[0].count,
    offset: safeOffset,
    limit: safeLimit,
  };
}

export async function getProduct(productId) {
  const id = parsePositiveInteger(productId, 'productId');
  const result = await query(
    `SELECT id, name, description, price, tags, image,
      created_at AS "createdAt", updated_at AS "updatedAt"
     FROM products WHERE id = $1`,
    [id],
  );

  return result.rowCount ? serializeProduct(result.rows[0]) : null;
}

export async function createProduct(body) {
  const payload = validateProductPayload(body);
  const result = await query(
    `INSERT INTO products (name, description, price, tags, image)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, description, price, tags, image,
       created_at AS "createdAt", updated_at AS "updatedAt"`,
    [payload.name, payload.description, payload.price, payload.tags || [], payload.image || null],
  );

  return serializeProduct(result.rows[0]);
}

export async function updateProduct(productId, body) {
  const id = parsePositiveInteger(productId, 'productId');
  const payload = validateProductPayload(body, { partial: true });
  const fields = [];
  const values = [];

  Object.entries(payload).forEach(([field, value]) => {
    values.push(value);
    fields.push(`${field} = $${values.length}`);
  });
  values.push(id);

  const result = await query(
    `UPDATE products SET ${fields.join(', ')} WHERE id = $${values.length}
     RETURNING id, name, description, price, tags, image,
       created_at AS "createdAt", updated_at AS "updatedAt"`,
    values,
  );

  if (!result.rowCount) throw new AppError(404, '상품을 찾을 수 없습니다.');
  return serializeProduct(result.rows[0]);
}

export async function deleteProduct(productId) {
  const id = parsePositiveInteger(productId, 'productId');
  const result = await query('DELETE FROM products WHERE id = $1', [id]);
  if (!result.rowCount) throw new AppError(404, '상품을 찾을 수 없습니다.');
}

export async function listArticles({ offset = 0, limit = 5, keyword = '', orderBy = 'recent' } = {}) {
  const safeOffset = parseOffset(offset);
  const safeLimit = parseLimit(limit);
  const searchKeyword = String(keyword || '').trim();
  const safeOrderBy = String(orderBy || 'recent');
  if (!['recent', 'like'].includes(safeOrderBy)) {
    throw new AppError(400, 'orderBy 값이 올바르지 않습니다.');
  }
  const params = [];
  const where = searchKeyword ? 'WHERE title ILIKE $1' : '';
  const sort = safeOrderBy === 'like'
    ? 'likes_count DESC, created_at DESC, id DESC'
    : 'created_at DESC, id DESC';

  if (searchKeyword) params.push(`%${searchKeyword}%`);

  const totalResult = await query(`SELECT COUNT(*)::int AS count FROM articles ${where}`, params);
  const listResult = await query(
    `SELECT id, title, content, image, likes_count AS "likeCount", created_at AS "createdAt"
     FROM articles
     ${where}
     ORDER BY ${sort}
     OFFSET $${params.length + 1}
     LIMIT $${params.length + 2}`,
    [...params, safeOffset, safeLimit],
  );

  return {
    list: listResult.rows.map(serializeArticle),
    totalCount: totalResult.rows[0].count,
    offset: safeOffset,
    limit: safeLimit,
    orderBy: safeOrderBy,
  };
}

export async function getArticle(articleId) {
  const id = parsePositiveInteger(articleId, 'articleId');
  const result = await query(
    `SELECT id, title, content, image, likes_count AS "likeCount",
      created_at AS "createdAt", updated_at AS "updatedAt"
     FROM articles WHERE id = $1`,
    [id],
  );

  return result.rowCount ? serializeArticle(result.rows[0]) : null;
}

export async function createArticle(body) {
  const payload = validateArticlePayload(body);
  const result = await query(
    `INSERT INTO articles (title, content, image)
     VALUES ($1, $2, $3)
     RETURNING id, title, content, image, likes_count AS "likeCount",
       created_at AS "createdAt", updated_at AS "updatedAt"`,
    [payload.title, payload.content, payload.image || null],
  );

  return serializeArticle(result.rows[0]);
}

export async function updateArticle(articleId, body) {
  const id = parsePositiveInteger(articleId, 'articleId');
  const payload = validateArticlePayload(body, { partial: true });
  const fields = [];
  const values = [];

  Object.entries(payload).forEach(([field, value]) => {
    values.push(value);
    fields.push(`${field} = $${values.length}`);
  });
  values.push(id);

  const result = await query(
    `UPDATE articles SET ${fields.join(', ')} WHERE id = $${values.length}
     RETURNING id, title, content, image, likes_count AS "likeCount",
       created_at AS "createdAt", updated_at AS "updatedAt"`,
    values,
  );

  if (!result.rowCount) throw new AppError(404, '게시글을 찾을 수 없습니다.');
  return serializeArticle(result.rows[0]);
}

export async function deleteArticle(articleId) {
  const id = parsePositiveInteger(articleId, 'articleId');
  const result = await query('DELETE FROM articles WHERE id = $1', [id]);
  if (!result.rowCount) throw new AppError(404, '게시글을 찾을 수 없습니다.');
}

async function assertParentExists(type, id) {
  const config = parentConfig[type];
  const result = await query(`SELECT id FROM ${config.table} WHERE id = $1`, [id]);
  if (!result.rowCount) throw new AppError(404, config.notFoundMessage);
}

export async function listComments(type, parentId, { cursor = '', limit = 10 } = {}) {
  const config = parentConfig[type];
  if (!config) throw new AppError(400, '댓글 대상이 올바르지 않습니다.');

  const id = parsePositiveInteger(parentId, `${type}Id`);
  const safeLimit = parseLimit(limit);
  const parsedCursor = cursor ? parsePositiveInteger(cursor, 'cursor') : null;
  await assertParentExists(type, id);

  const params = [id];
  let cursorClause = '';
  if (parsedCursor) {
    params.push(parsedCursor);
    cursorClause = `AND id < $${params.length}`;
  }
  params.push(safeLimit + 1);

  const result = await query(
    `SELECT id, content, created_at AS "createdAt"
     FROM comments
     WHERE ${config.column} = $1 ${cursorClause}
     ORDER BY id DESC
     LIMIT $${params.length}`,
    params,
  );

  const rows = result.rows.slice(0, safeLimit);
  return {
    list: rows.map(serializeComment),
    nextCursor: result.rows.length > safeLimit ? rows.at(-1).id : null,
  };
}

export async function createComment(type, parentId, body) {
  const config = parentConfig[type];
  if (!config) throw new AppError(400, '댓글 대상이 올바르지 않습니다.');

  const id = parsePositiveInteger(parentId, `${type}Id`);
  const content = normalizeRequiredText(body.content, 'content');
  await assertParentExists(type, id);

  const result = await query(
    `INSERT INTO comments (${config.column}, content)
     VALUES ($1, $2)
     RETURNING id, content, created_at AS "createdAt"`,
    [id, content],
  );

  return serializeComment(result.rows[0]);
}

export async function updateComment(commentId, body) {
  const id = parsePositiveInteger(commentId, 'commentId');
  const content = normalizeRequiredText(body.content, 'content');
  const result = await query(
    `UPDATE comments SET content = $1 WHERE id = $2
     RETURNING id, content, created_at AS "createdAt"`,
    [content, id],
  );

  if (!result.rowCount) throw new AppError(404, '댓글을 찾을 수 없습니다.');
  return serializeComment(result.rows[0]);
}

export async function deleteComment(commentId) {
  const id = parsePositiveInteger(commentId, 'commentId');
  const result = await query('DELETE FROM comments WHERE id = $1', [id]);
  if (!result.rowCount) throw new AppError(404, '댓글을 찾을 수 없습니다.');
}
