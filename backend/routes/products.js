import express from "express";
import prisma from "../lib/prisma.js";
import { authenticate } from "../middleware/auth.js";
import { validateProduct } from "../middleware/validateProduct.js";

const router = express.Router();

router.post("/", authenticate, validateProduct, async (req, res) => {
  const { name, description, price } = req.body;
  const ownerId = req.userId;
  const product = await prisma.product.create({
    data: {
      name,
      price,
      description,
      ownerId
    }
  })
  res.status(201).send(product)
})

// 상품 목록 조회
router.get("/", async (req, res) => {
  // URL query에서 정렬, 검색어, 페이지 정보 가져오기
  const {
    orderBy = "recent",
    keyword,
    page = "1",
    pageSize = "8"
  } = req.query;

  // 페이지 값을 숫자로 변환
  const currentPage = Number(page);
  const size = Number(pageSize);

  // 앞에서 몇 개를 건너뛸지 계산
  const skip = (currentPage - 1) * size;

  // 검색어가 있을 때만 검색 조건 생성
  const where = keyword
    ? {
        OR: [
          { name: { contains: keyword } },
          { description: { contains: keyword } }
        ]
      }
    : {};

  // 검색 조건에 맞는 전체 상품 개수
  const totalCount = await prisma.product.count({
    where
  });

  // 상품 목록 조회
  const products = await prisma.product.findMany({
    where,

    // 좋아요순 또는 최신순 정렬
    orderBy:
      orderBy === "like"
        ? { likeCount: "desc" }
        : { createdAt: "desc" },

    // 페이지네이션
    skip,
    take: size
  });

  // 상품 목록 + 전체 개수 응답
  res.status(200).send({
    products,
    totalCount
  });
});
router.get("/best", async (req, res) => {
  // 좋아요 높은 순으로 4개 조회
  const bestProducts = await prisma.product.findMany({
    orderBy: {
      likeCount: "desc"
    },
    take: 4
  });
  res.status(200).send(bestProducts);
})

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: {
      id
    }
  });
  if (!product) {
    return res.status(404).send({
      message: "상품을 찾을 수 없습니다."
    })
  }
  res.status(200).send(product);
})

router.patch("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: {
      id
    }
  })
  if (!product) {
    return res.status(404).send({
      message: "상품을 찾을 수 없습니다."
    })
  }
  if (req.userId !== product.ownerId) {
    return res.status(403).send({
      message: "상품을 수정할 권한이 없습니다."
    });
  }
  const { name, description, price } = req.body;
  const updatedProduct = await prisma.product.update({
    where: {
      id
    },
    data: {
      name,
      description,
      price
    }
  })
  res.status(200).send(updatedProduct)
});

router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    return res.status(404).send({
      message: "상품을 찾을 수 없습니다.",
    });
  }

  if (req.userId !== product.ownerId) {
    return res.status(403).send({
      message: "상품을 삭제할 권한이 없습니다.",
    });
  }

  await prisma.product.delete({
    where: {
      id,
    },
  });

  res.status(200).send({
    message: "상품이 삭제되었습니다.",
  });
});

router.post("/:id/likes", authenticate, async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  // 해당 상품이 실제로 존재하는 지 확인
  const product = await prisma.product.findUnique({
    where: {
      id
    }
  })
  //상품 없을 때
  if (!product) {
    return res.status(404).send({
      message: "상품을 찾을 수 없습니다."
    })
  }
  // 현재 사용자가 이 상품에 이미 좋아요를 눌렀는지 확인
  const existingLike = await prisma.productLike.findUnique({
    where: {
      userId_productId: {
        userId,
        productId: id
      }
    }
  });
  if (existingLike) {
    return res.status(409).send({
      message: "이미 이 상품에 좋아요를 눌렀습니다."
    })
  }
  // 좋아요 기록 생성 
  await prisma.$transaction([
    prisma.productLike.create({
      data: {
        userId,
        productId: id
      }
    }),

    //likeCount 증가
    prisma.product.update({
      where: {
        id
      },
      data: {
        likeCount: {
          increment: 1
        }
      }
    })
  ]);
  res.status(201).send({
    message: "좋아요가 추가되었습니다."
  });
})

// 상품 좋아요 취소
router.delete("/:id/likes", authenticate, async (req, res) => {
  // 로그인한 사용자 ID
  const userId = req.userId;

  // URL에서 상품 ID 가져오기
  const { id } = req.params;

  // 현재 사용자가 이 상품에 누른 좋아요 찾기
  const existingLike = await prisma.productLike.findUnique({
    where: {
      // userId + productId 복합키
      userId_productId: {
        userId,
        productId: id
      }
    }
  });

  // 좋아요를 누른 적이 없다면 취소 불가
  if (!existingLike) {
    return res.status(409).send({
      message: "취소할 좋아요가 없습니다."
    });
  }

  // 좋아요 삭제 + likeCount 감소를 한 번에 처리
  await prisma.$transaction([
    // ProductLike에서 좋아요 기록 삭제
    prisma.productLike.delete({
      where: {
        userId_productId: {
          userId,
          productId: id
        }
      }
    }),

    // Product의 좋아요 개수 -1
    prisma.product.update({
      where: {
        id
      },
      data: {
        likeCount: {
          decrement: 1
        }
      }
    })
  ]);

  // 좋아요 취소 성공
  res.status(200).send({
    message: "좋아요가 취소되었습니다."
  });
});

// ========================================
// 상품 댓글 목록 조회
// GET /api/products/:id/comments
// ========================================
router.get("/:id/comments", async (req, res) => {
  // URL에서 상품 ID 가져오기
  const { id: productId } = req.params;

  // 해당 상품의 댓글 조회
  const comments = await prisma.productComment.findMany({
    where: {
      productId
    },
    // 최신 댓글부터 조회
    orderBy: {
      createdAt: "desc"
    }
  });

  // 댓글 목록 응답
  res.status(200).send(comments);
});


// ========================================
// 상품 댓글 수정
// PATCH /api/products/:productId/comments/:commentId
// ========================================
router.patch(
  "/:productId/comments/:commentId",
  authenticate,
  async (req, res) => {
    // URL에서 상품 ID와 댓글 ID 가져오기
    const { productId, commentId } = req.params;

    // body에서 수정할 댓글 내용 가져오기
    const { content } = req.body;

    // 로그인한 사용자 ID
    const userId = req.userId;

    // 댓글 찾기
    const comment = await prisma.productComment.findUnique({
      where: {
        id: commentId
      }
    });

    // 댓글이 존재하지 않는 경우
    if (!comment || comment.productId !== productId) {
      return res.status(404).send({
        message: "댓글을 찾을 수 없습니다."
      });
    }

    // 내가 작성한 댓글인지 확인
    if (comment.ownerId !== userId) {
      return res.status(403).send({
        message: "댓글을 수정할 권한이 없습니다."
      });
    }

    // 댓글 내용 검사
    if (!content || !content.trim()) {
      return res.status(400).send({
        message: "댓글 내용을 입력해주세요."
      });
    }

    // 댓글 수정
    const updatedComment = await prisma.productComment.update({
      where: {
        id: commentId
      },
      data: {
        content
      }
    });

    // 수정된 댓글 응답
    res.status(200).send(updatedComment);
  }
);


// ========================================
// 상품 댓글 삭제
// DELETE /api/products/:productId/comments/:commentId
// ========================================
router.delete(
  "/:productId/comments/:commentId",
  authenticate,
  async (req, res) => {
    // URL에서 상품 ID와 댓글 ID 가져오기
    const { productId, commentId } = req.params;

    // 로그인한 사용자 ID
    const userId = req.userId;

    // 삭제할 댓글 찾기
    const comment = await prisma.productComment.findUnique({
      where: {
        id: commentId
      }
    });

    // 댓글이 존재하지 않는 경우
    if (!comment || comment.productId !== productId) {
      return res.status(404).send({
        message: "댓글을 찾을 수 없습니다."
      });
    }

    // 내가 작성한 댓글인지 확인
    if (comment.ownerId !== userId) {
      return res.status(403).send({
        message: "댓글을 삭제할 권한이 없습니다."
      });
    }

    // 댓글 삭제
    await prisma.productComment.delete({
      where: {
        id: commentId
      }
    });

    // 삭제 성공 응답
    res.status(200).send({
      message: "댓글이 삭제되었습니다."
    });
  }
);

export default router;
