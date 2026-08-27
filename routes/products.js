import express from "express";
import prisma from "../src/lib/prisma.js";
import { authenticate, softAuthenticate } from "../src/middlewares/authenticate.js";
import { writerSelect, serializeComment } from "../src/lib/comment.js";

const router = express.Router();

// owner 관계를 항상 함께 조회
const withOwner = { owner: { select: { id: true, nickname: true, image: true } } };

// 로그인 유저의 좋아요 여부를 함께 조회 (userId 없으면 조회 안 함)
const favoriteInclude = (userId) =>
  userId ? { favorites: { where: { userId }, select: { id: true } } } : {};

// 응답 형태: owner 를 펼쳐 ownerId / ownerNickname 도 제공 (프론트/기존 API 호환)
// isFavorite: 명시값이 있으면 그대로, 없으면 include 된 favorites 로 판단
function serialize(product, { isFavorite } = {}) {
  const { owner, favorites, ...rest } = product;
  const liked = isFavorite ?? (Array.isArray(favorites) ? favorites.length > 0 : false);
  return {
    ...rest,
    ownerNickname: owner?.nickname ?? null,
    owner,
    isFavorite: liked, // 프론트/panda-market-api 호환
    isLiked: liked,    // 요구사항 명세 필드명
  };
}

const MAX_IMAGES = 3;
const normalizeImages = (images) =>
  Array.isArray(images)
    ? images.filter((u) => typeof u === "string" && u.trim()).slice(0, MAX_IMAGES)
    : [];

// /products 유효성 검사
function validateProduct(req, res, next) {
  const { name, description, price } = req.body;

  if (Array.isArray(req.body.images) && req.body.images.length > MAX_IMAGES) {
    return next({ status: 400, message: `이미지는 최대 ${MAX_IMAGES}개까지 등록할 수 있습니다.` });
  }

  if (!name || !description || price === undefined || price === null || price === "") {
    return next({ status: 400, message: "상품명, 설명, 가격은 필수입니다." });
  }

  const priceNum = Number(price);
  if (Number.isNaN(priceNum) || priceNum <= 0) {
    return next({ status: 400, message: "가격은 0보다 큰 숫자여야 합니다." });
  }

  next();
}

// 상품 등록 (로그인 필요)
router.post("/", authenticate, validateProduct, async (req, res, next) => {
  try {
    const { images, tags, price, description, name } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        tags: Array.isArray(tags) ? tags : [],
        images: normalizeImages(images),
        ownerId: req.userId,
      },
      include: withOwner,
    });

    res.status(201).json(serialize(product));
  } catch (err) {
    next(err);
  }
});

// 전체 상품 조회
router.get("/", softAuthenticate, async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const pageSize = Math.max(parseInt(req.query.pageSize) || 10, 1);
    const orderBy = req.query.orderBy || "recent";
    const keyword = req.query.keyword || "";

    const where = keyword
      ? {
          OR: [
            { name: { contains: keyword, mode: "insensitive" } },
            { description: { contains: keyword, mode: "insensitive" } },
          ],
        }
      : {};

    const orderByClause =
      orderBy === "favorite"
        ? [{ favoriteCount: "desc" }, { id: "desc" }]
        : [{ createdAt: "desc" }, { id: "desc" }];

    const [list, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: orderByClause,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: { ...withOwner, ...favoriteInclude(req.userId) },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({ list: list.map((p) => serialize(p)), totalCount });
  } catch (err) {
    next(err);
  }
});

// 특정 상품 조회
router.get("/:id", softAuthenticate, async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    if (Number.isNaN(productId)) {
      return next({ status: 400, message: "유효하지 않은 상품 ID 입니다." });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { ...withOwner, ...favoriteInclude(req.userId) },
    });
    if (!product) {
      return next({ status: 404, message: "상품을 찾을 수 없습니다." });
    }

    res.json(serialize(product));
  } catch (err) {
    next(err);
  }
});

// 상품 수정 (등록한 사용자만)
router.patch("/:id", authenticate, async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    if (Number.isNaN(productId)) {
      return next({ status: 400, message: "유효하지 않은 상품 ID 입니다." });
    }

    const existing = await prisma.product.findUnique({ where: { id: productId } });
    if (!existing) {
      return next({ status: 404, message: "상품을 찾을 수 없습니다." });
    }
    if (existing.ownerId !== req.userId) {
      return next({ status: 403, message: "이 상품을 수정할 권한이 없습니다." });
    }

    const { images, tags, price, description, name } = req.body;

    const data = {};
    if (name !== undefined) data.name = name;
    if (description !== undefined) data.description = description;
    if (price !== undefined) data.price = Number(price);
    if (tags !== undefined) data.tags = Array.isArray(tags) ? tags : [];
    if (images !== undefined) {
      if (Array.isArray(images) && images.length > MAX_IMAGES) {
        return next({ status: 400, message: `이미지는 최대 ${MAX_IMAGES}개까지 등록할 수 있습니다.` });
      }
      data.images = normalizeImages(images);
    }

    const product = await prisma.product.update({
      where: { id: productId },
      data,
      include: withOwner,
    });

    res.json(serialize(product));
  } catch (err) {
    next(err);
  }
});

// 상품 삭제 (등록한 사용자만)
router.delete("/:id", authenticate, async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    if (Number.isNaN(productId)) {
      return next({ status: 400, message: "유효하지 않은 상품 ID 입니다." });
    }

    const existing = await prisma.product.findUnique({ where: { id: productId } });
    if (!existing) {
      return next({ status: 404, message: "상품을 찾을 수 없습니다." });
    }
    if (existing.ownerId !== req.userId) {
      return next({ status: 403, message: "이 상품을 삭제할 권한이 없습니다." });
    }

    await prisma.product.delete({ where: { id: productId } });

    res.json({ message: `삭제가 완료되었습니다. ${productId}` });
  } catch (err) {
    next(err);
  }
});

// 좋아요 추가 (로그인 필요)
router.post("/:id/favorite", authenticate, async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    if (Number.isNaN(productId)) {
      return next({ status: 400, message: "유효하지 않은 상품 ID 입니다." });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return next({ status: 404, message: "상품을 찾을 수 없습니다." });
    }

    const already = await prisma.favorite.findUnique({
      where: { userId_productId: { userId: req.userId, productId } },
    });

    // Favorite 생성 + favoriteCount 증가를 하나의 트랜잭션으로
    if (!already) {
      await prisma.$transaction([
        prisma.favorite.create({ data: { userId: req.userId, productId } }),
        prisma.product.update({
          where: { id: productId },
          data: { favoriteCount: { increment: 1 } },
        }),
      ]);
    }

    const updated = await prisma.product.findUnique({ where: { id: productId }, include: withOwner });
    res.json(serialize(updated, { isFavorite: true }));
  } catch (err) {
    next(err);
  }
});

// 좋아요 취소 (로그인 필요)
router.delete("/:id/favorite", authenticate, async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    if (Number.isNaN(productId)) {
      return next({ status: 400, message: "유효하지 않은 상품 ID 입니다." });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return next({ status: 404, message: "상품을 찾을 수 없습니다." });
    }

    const already = await prisma.favorite.findUnique({
      where: { userId_productId: { userId: req.userId, productId } },
    });

    // Favorite 삭제 + favoriteCount 감소를 하나의 트랜잭션으로
    if (already) {
      await prisma.$transaction([
        prisma.favorite.delete({
          where: { userId_productId: { userId: req.userId, productId } },
        }),
        prisma.product.update({
          where: { id: productId },
          data: { favoriteCount: { decrement: 1 } },
        }),
      ]);
    }

    const updated = await prisma.product.findUnique({ where: { id: productId }, include: withOwner });
    res.json(serialize(updated, { isFavorite: false }));
  } catch (err) {
    next(err);
  }
});

// ===== 상품 댓글 =====

// 댓글 목록 조회 (cursor 페이지네이션)
router.get("/:id/comments", async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    if (Number.isNaN(productId)) {
      return next({ status: 400, message: "유효하지 않은 상품 ID 입니다." });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return next({ status: 404, message: "상품을 찾을 수 없습니다." });
    }

    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
    const cursor = parseInt(req.query.cursor);

    const rows = await prisma.comment.findMany({
      where: { productId },
      orderBy: { id: "desc" },
      take: limit + 1,
      ...(Number.isNaN(cursor) ? {} : { cursor: { id: cursor }, skip: 1 }),
      include: writerSelect,
    });

    const hasMore = rows.length > limit;
    const list = hasMore ? rows.slice(0, limit) : rows;
    const nextCursor = hasMore ? list[list.length - 1].id : null;

    res.json({ list: list.map(serializeComment), nextCursor });
  } catch (err) {
    next(err);
  }
});

// 댓글 등록 (로그인 필요)
router.post("/:id/comments", authenticate, async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    if (Number.isNaN(productId)) {
      return next({ status: 400, message: "유효하지 않은 상품 ID 입니다." });
    }

    const { content } = req.body;
    if (!content || !content.trim()) {
      return next({ status: 400, message: "댓글 내용을 입력해주세요." });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return next({ status: 404, message: "상품을 찾을 수 없습니다." });
    }

    const comment = await prisma.comment.create({
      data: { content: content.trim(), productId, writerId: req.userId },
      include: writerSelect,
    });

    res.status(201).json(serializeComment(comment));
  } catch (err) {
    next(err);
  }
});

export default router;
