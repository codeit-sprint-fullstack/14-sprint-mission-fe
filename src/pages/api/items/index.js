import prisma from "@/lib/prisma";

// 상품 입력값 검사
const validateProductInput = ({
  name,
  description,
  price,
  tags,
}) => {
  const errors = [];

  // 상품명 길이 확인
  if (
    typeof name !== "string" ||
    name.trim().length < 1 ||
    name.trim().length > 10
  ) {
    errors.push(
      "상품명은 1자 이상 10자 이내로 입력해주세요.",
    );
  }

  // 상품 소개 길이 확인
  if (
    typeof description !== "string" ||
    description.trim().length < 10 ||
    description.trim().length > 100
  ) {
    errors.push(
      "상품 소개는 10자 이상 100자 이내로 입력해주세요.",
    );
  }

  // 가격 확인
  if (
    typeof price !== "number" ||
    Number.isNaN(price) ||
    price < 1
  ) {
    errors.push(
      "가격은 1 이상의 숫자여야 합니다.",
    );
  }

  // 태그 확인
  if (
    !Array.isArray(tags) ||
    tags.length === 0 ||
    tags.some((tag) => {
      return (
        typeof tag !== "string" ||
        tag.trim().length === 0 ||
        tag.trim().length > 5
      );
    })
  ) {
    errors.push(
      "태그는 최소 1개 이상이며, 각 태그는 5글자 이내여야 합니다.",
    );
  }

  return errors;
};

// 상품 목록 조회 처리
const getProducts = async (req, res) => {
  const {
    offset = "0",
    limit = "10",
    orderBy = "recent",
    keyword = "",
  } = req.query;

  const parsedOffset = Number(offset);
  const parsedLimit = Number(limit);

  // 페이지 조회 값 확인
  if (
    !Number.isInteger(parsedOffset) ||
    parsedOffset < 0 ||
    !Number.isInteger(parsedLimit) ||
    parsedLimit < 1
  ) {
    return res.status(400).json({
      message:
        "offset과 limit은 올바른 숫자여야 합니다.",
    });
  }

  // 검색어가 있으면 상품명과 소개에서 검색
  const where = keyword
    ? {
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

  // 최신순 정렬
  const orderByOption =
    orderBy === "recent"
      ? {
          createdAt: "desc",
        }
      : {
          createdAt: "desc",
        };

  try {
    // 상품 목록과 전체 개수를 함께 조회
    const [products, totalCount] =
      await Promise.all([
        prisma.product.findMany({
          where,
          select: {
            id: true,
            name: true,
            price: true,
            createdAt: true,
          },
          orderBy: orderByOption,
          skip: parsedOffset,
          take: parsedLimit,
        }),

        prisma.product.count({
          where,
        }),
      ]);

    return res.status(200).json({
      list: products,
      totalCount,
    });
  } catch (error) {
    console.error("상품 목록 조회 실패:", error);

    return res.status(500).json({
      message: "상품 목록 조회에 실패했습니다.",
    });
  }
};

// 상품 등록 처리
const createProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    tags,
  } = req.body;

  const productData = {
    name,
    description,
    price: Number(price),
    tags,
  };

  // 입력값 검사
  const errors =
    validateProductInput(productData);

  if (errors.length > 0) {
    return res.status(400).json({
      message:
        "상품 등록 데이터가 올바르지 않습니다.",
      errors,
    });
  }

  try {
    // 상품 생성
    const product =
      await prisma.product.create({
        data: {
          name: productData.name.trim(),
          description:
            productData.description.trim(),
          price: productData.price,
          tags: productData.tags.map((tag) =>
            tag.trim(),
          ),
        },
      });

    return res.status(201).json(product);
  } catch (error) {
    console.error("상품 등록 실패:", error);

    return res.status(500).json({
      message: "상품 등록에 실패했습니다.",
    });
  }
};

// 상품 목록과 등록 요청 처리
export default async function handler(req, res) {
  // GET 요청 처리
  if (req.method === "GET") {
    return getProducts(req, res);
  }

  // POST 요청 처리
  if (req.method === "POST") {
    return createProduct(req, res);
  }

  // GET과 POST 이외의 요청 차단
  res.setHeader("Allow", ["GET", "POST"]);

  return res.status(405).json({
    message: "허용되지 않은 요청 방식입니다.",
  });
}