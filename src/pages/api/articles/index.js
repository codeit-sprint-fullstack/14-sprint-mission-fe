import prisma from "@/lib/prisma";

// 게시글 목록 조회 처리
const getArticles = async (req, res) => {
  // URL 쿼리에서 커서와 조회 개수 확인
  const { cursor, limit = "10" } = req.query;

  const parsedLimit = Number(limit);
  const parsedCursor = cursor ? Number(cursor) : undefined;

  // 조회 개수가 올바른 양의 정수인지 확인
  if (!Number.isInteger(parsedLimit) || parsedLimit < 1) {
    return res.status(400).json({
      message: "limit은 1 이상의 정수여야 합니다.",
    });
  }

  // 커서가 전달됐다면 올바른 양의 정수인지 확인
  if (
    cursor &&
    (!Number.isInteger(parsedCursor) || parsedCursor < 1)
  ) {
    return res.status(400).json({
      message: "cursor는 1 이상의 정수여야 합니다.",
    });
  }

  try {
    // 다음 페이지 존재 여부 확인을 위해 한 개 더 조회
    const articles = await prisma.article.findMany({
      take: parsedLimit + 1,

      // 커서가 있으면 해당 게시글 다음부터 조회
      ...(parsedCursor && {
        cursor: {
          id: parsedCursor,
        },
        skip: 1,
      }),

      // 최신 게시글부터 정렬
      orderBy: {
        id: "desc",
      },

      // 목록 화면에 필요한 게시글 정보만 조회
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // 요청 개수보다 많이 조회됐는지 확인
    const hasNextPage = articles.length > parsedLimit;

    // 화면에 반환할 개수만 남김
    const list = hasNextPage
      ? articles.slice(0, parsedLimit)
      : articles;

    // 다음 요청에서 사용할 마지막 게시글 ID 설정
    const nextCursor = hasNextPage
      ? list[list.length - 1].id
      : null;

    return res.status(200).json({
      list,
      nextCursor,
    });
  } catch (error) {
    console.error("게시글 목록 조회 실패:", error);

    return res.status(500).json({
      message: "게시글 목록을 불러오지 못했습니다.",
    });
  }
};

// 게시글 등록 처리
const createArticle = async (req, res) => {
  // 요청 본문에서 제목과 내용 확인
  const { title, content } = req.body;

  // 제목이 문자열인지 확인
  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      message: "제목을 입력해 주세요.",
    });
  }

  // 내용이 문자열인지 확인
  if (typeof content !== "string" || !content.trim()) {
    return res.status(400).json({
      message: "내용을 입력해 주세요.",
    });
  }

  try {
    // 입력받은 제목과 내용으로 게시글 생성
    const article = await prisma.article.create({
      data: {
        title: title.trim(),
        content: content.trim(),
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(201).json(article);
  } catch (error) {
    console.error("게시글 등록 실패:", error);

    return res.status(500).json({
      message: "게시글을 등록하지 못했습니다.",
    });
  }
};

// 게시글 목록과 등록 요청 처리
export default async function handler(req, res) {
  // GET 요청을 목록 조회 함수로 전달
  if (req.method === "GET") {
    return getArticles(req, res);
  }

  // POST 요청을 게시글 등록 함수로 전달
  if (req.method === "POST") {
    return createArticle(req, res);
  }

  // GET과 POST 이외의 요청 차단
  res.setHeader("Allow", ["GET", "POST"]);

  return res.status(405).json({
    message: "허용되지 않은 요청 방식입니다.",
  });
}