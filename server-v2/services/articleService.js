import articleRepository from '../repositories/articleRepository.js';

// 응답 형식 포맷 함수
function formatArticle(article) {
  return {
    id: article.id,
    title: article.title,
    content: article.content,
    writer: {
      id: article.user.id,
      nickname: article.user.nickname,
    },
    likeCount: article._count.likes,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
  };
}

// 응답 형식 포맷 (isLiked 추가)
function formatArticleDetail(article, isLiked) {
  return {
    ...formatArticle(article),
    isLiked,
  };
}

// 게시글 생성하기
async function createArticle(data, userId) {
  const article = await articleRepository.save(data, userId);
  return formatArticle(article);
}

// 게시글 목록 가져오기
async function getArticles(query = {}) {
  const { page = 1, pageSize = 10, orderBy = 'recent', keyword = ''} = query;
  const pageNumber = Number(page);
  const pageSizeNumber = Number(pageSize);
  const offset = (pageNumber - 1) * pageSizeNumber;

  const { totalCount, articles } = await articleRepository.findMany({
    offset, 
    limit: pageSizeNumber, 
    orderBy, 
    keyword
  });

  return {
    totalCount,
    list: articles.map(formatArticle),
  };
}

// 게시글 가져오기
async function getArticle(articleId, userId) {
  // 1. 가져오려는 게시글 있는지 확인
  const existingArticle = await articleRepository.findUnique(articleId);
  if (!existingArticle) {
    const error = new Error('Article not found');
    error.code = 404;
    throw error;
  }

  // 2. 유저가 게시글에 좋아요 눌렀는지 확인
  const existingLike = await articleRepository.findLike(articleId, userId);

  return formatArticleDetail(existingArticle, Boolean(existingLike));
}

// 게시글 수정하기
async function updateArticle(articleId, data, userId) {
  // 1. 수정하려는 게시글 있는지 확인
  const existingArticle = await articleRepository.findUnique(articleId);
  if (!existingArticle) {
    const error = new Error('Article not found');
    error.code = 404;
    throw error;
  }

  // 2. 유저가 수정하려는 게시글의 작성자인지 확인
  if (existingArticle.user.id !== userId) {
    const error = new Error('Forbidden');
    error.code = 403;
    throw error;
  }

  // 3. 통과하면 게시글 수정
  const updatedArticle = await articleRepository.update(articleId, data);

  // 4. 유저가 게시글에 좋아요 눌렀는지 확인
  const existingLike = await articleRepository.findLike(articleId, userId);

  return formatArticleDetail(updatedArticle, Boolean(existingLike));
}

// 게시글 삭제하기
async function deleteArticle(articleId, userId) {
  // 1. 삭제하려는 게시글 있는지 확인
  const existingArticle = await articleRepository.findUnique(articleId);
  if (!existingArticle) {
    const error = new Error('Article not found');
    error.code = 404;
    throw error;
  }

  // 2. 유저가 삭제하려는 게시글의 작성자인지 확인
  if (existingArticle.user.id !== userId) {
    const error = new Error('Forbidden');
    error.code = 403;
    throw error;
  }

  // 3. 통과하면 게시글 삭제
  return await articleRepository.remove(articleId);
}

// 게시글 좋아요 생성하기
async function createLike(articleId, userId) {
  // 1. 좋아요 누를 게시글 있는지 확인
  const existingArticle = await articleRepository.findUnique(articleId);
  if (!existingArticle) {
    const error = new Error('Article not found');
    error.code = 404;
    throw error;
  }

  // 2. 유저가 게시글에 좋아요 눌렀는지 확인
  const existingLike = await articleRepository.findLike(articleId, userId);
  if (!existingLike) { // 좋아요 없으면 관계 형성
    await articleRepository.saveLike(articleId, userId);
  }

  // 3. 좋아요 반영된 최신 게시글 조회
  const updatedArticle = await articleRepository.findUnique(articleId);

  return formatArticleDetail(updatedArticle, true);
}

// 게시글 좋아요 삭제하기
async function deleteLike(articleId, userId) {
  // 1. 좋아요 삭제할 게시글이 있는지 확인
  const existingArticle = await articleRepository.findUnique(articleId);
  if (!existingArticle) {
    const error = new Error('Article not found');
    error.code = 404;
    throw error;
  }

  // 2. 유저가 게시글에 좋아요 눌렀는지 확인
  const existingLike = await articleRepository.findLike(articleId, userId);
  if (existingLike) { // 좋아요 있으면 관계 삭제
    await articleRepository.removeLike(articleId, userId);
  }

  // 3. 좋아요 반영된 최신 게시글 조회
  const updatedArticle = await articleRepository.findUnique(articleId);

  return formatArticleDetail(updatedArticle, false);
}

export default {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
  createLike,
  deleteLike,
}