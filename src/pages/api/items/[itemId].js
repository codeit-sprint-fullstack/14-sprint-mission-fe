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

// 상품 ID에 해당하는 상세 정보를 처리하는 API
export default async function handler(req, res) {
  // GET, PATCH, DELETE 요청만 허용
  if (!["GET", "PATCH", "DELETE"].includes(req.method)) {
    res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);

    return res.status(405).json({
      message: "허용되지 않은 요청 방식입니다.",
    });
  }

  // 주소에서 상품 ID 추출
  const { itemId } = req.query;
  const parsedItemId = Number(itemId);

  // 상품 ID가 올바른 숫자인지 확인
  if (!Number.isInteger(parsedItemId) || parsedItemId <= 0) {
    return res.status(400).json({
      message: "올바른 상품 ID가 필요합니다.",
    });
  }

  try {
    // ID가 일치하는 상품 한 개 조회
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: parsedItemId,
      },
    });

    // 해당 상품이 없는 경우 처리
    if (!existingProduct) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    // 상품 상세 조회 처리
    if (req.method === "GET") {
      return res.status(200).json(existingProduct);
    }

    // 상품 삭제 처리
    if (req.method === "DELETE") {
      await prisma.product.delete({
        where: {
          id: parsedItemId,
        },
      });

      return res.status(204).end();
    }

    const {
      name,
      description,
      price,
      tags,
    } = req.body ?? {};

    // 전달받은 값과 기존 상품 정보를 합침
    const productData = {
      name:
        name !== undefined
          ? name
          : existingProduct.name,
      description:
        description !== undefined
          ? description
          : existingProduct.description,
      price:
        price !== undefined
          ? Number(price)
          : existingProduct.price,
      tags:
        tags !== undefined
          ? tags
          : existingProduct.tags,
    };

    // 수정할 상품 정보 검사
    const errors =
      validateProductInput(productData);

    if (errors.length > 0) {
      return res.status(400).json({
        message:
          "상품 수정 데이터가 올바르지 않습니다.",
        errors,
      });
    }

    // 상품 정보 수정
    const updatedProduct =
      await prisma.product.update({
        where: {
          id: parsedItemId,
        },
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

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("상품 상세 처리 오류:", error);

    return res.status(500).json({
      message:
        req.method === "PATCH"
          ? "상품을 수정하지 못했습니다."
          : req.method === "DELETE"
            ? "상품을 삭제하지 못했습니다."
            : "상품을 불러오지 못했습니다.",
    });
  }
}