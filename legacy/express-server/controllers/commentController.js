import { query } from '../config/db.js';
import {
  createHttpError,
  normalizeRequiredText,
  parseLimit,
  parsePositiveInteger,
} from '../utils/http.js';

function serializeComment(row) {
  return {
    id: row.id,
    content: row.content,
    createdAt: row.createdAt,
  };
}

async function assertParentExists(table, id, message) {
  const result = await query(`SELECT id FROM ${table} WHERE id = $1`, [id]);

  if (result.rowCount === 0) {
    throw createHttpError(404, message);
  }
}

function parseCursor(value) {
  if (value == null || value === '') {
    return null;
  }

  return parsePositiveInteger(value, 'cursor');
}

async function listComments({ parentColumn, parentId, cursor, limit }) {
  const params = [parentId];
  let cursorClause = '';

  if (cursor) {
    params.push(cursor);
    cursorClause = `AND id < $${params.length}`;
  }

  params.push(limit + 1);

  const result = await query(
    `SELECT id, content, created_at AS "createdAt"
     FROM comments
     WHERE ${parentColumn} = $1 ${cursorClause}
     ORDER BY id DESC
     LIMIT $${params.length}`,
    params,
  );

  const rows = result.rows.slice(0, limit);
  const hasMore = result.rows.length > limit;

  return {
    list: rows.map(serializeComment),
    nextCursor: hasMore ? rows[rows.length - 1].id : null,
  };
}

async function createComment({ parentColumn, parentId, content }) {
  const result = await query(
    `INSERT INTO comments (${parentColumn}, content)
     VALUES ($1, $2)
     RETURNING id, content, created_at AS "createdAt"`,
    [parentId, content],
  );

  return serializeComment(result.rows[0]);
}

export async function listProductComments(req, res, next) {
  try {
    const productId = parsePositiveInteger(req.params.productId, 'productId');
    const limit = parseLimit(req.query.limit || 10);
    const cursor = parseCursor(req.query.cursor);

    await assertParentExists('products', productId, '상품을 찾을 수 없습니다.');

    const comments = await listComments({
      parentColumn: 'product_id',
      parentId: productId,
      cursor,
      limit,
    });

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}

export async function createProductComment(req, res, next) {
  try {
    const productId = parsePositiveInteger(req.params.productId, 'productId');
    const content = normalizeRequiredText(req.body.content, 'content');

    await assertParentExists('products', productId, '상품을 찾을 수 없습니다.');

    const comment = await createComment({
      parentColumn: 'product_id',
      parentId: productId,
      content,
    });

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
}

export async function listArticleComments(req, res, next) {
  try {
    const articleId = parsePositiveInteger(req.params.articleId, 'articleId');
    const limit = parseLimit(req.query.limit || 10);
    const cursor = parseCursor(req.query.cursor);

    await assertParentExists('articles', articleId, '게시글을 찾을 수 없습니다.');

    const comments = await listComments({
      parentColumn: 'article_id',
      parentId: articleId,
      cursor,
      limit,
    });

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}

export async function createArticleComment(req, res, next) {
  try {
    const articleId = parsePositiveInteger(req.params.articleId, 'articleId');
    const content = normalizeRequiredText(req.body.content, 'content');

    await assertParentExists('articles', articleId, '게시글을 찾을 수 없습니다.');

    const comment = await createComment({
      parentColumn: 'article_id',
      parentId: articleId,
      content,
    });

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
}

export async function patchComment(req, res, next) {
  try {
    const commentId = parsePositiveInteger(req.params.commentId, 'commentId');
    const content = normalizeRequiredText(req.body.content, 'content');
    const result = await query(
      `UPDATE comments
       SET content = $1
       WHERE id = $2
       RETURNING id, content, created_at AS "createdAt"`,
      [content, commentId],
    );

    if (result.rowCount === 0) {
      throw createHttpError(404, '댓글을 찾을 수 없습니다.');
    }

    res.status(200).json(serializeComment(result.rows[0]));
  } catch (error) {
    next(error);
  }
}

export async function deleteComment(req, res, next) {
  try {
    const commentId = parsePositiveInteger(req.params.commentId, 'commentId');
    const result = await query('DELETE FROM comments WHERE id = $1', [commentId]);

    if (result.rowCount === 0) {
      throw createHttpError(404, '댓글을 찾을 수 없습니다.');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
