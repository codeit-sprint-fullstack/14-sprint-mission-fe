import { AppError, getErrorResponse, readJson } from '@/lib/errors';
import { deleteArticle, getArticle, updateArticle } from '@/lib/panda-data';

export async function GET(_request, { params }) {
  try {
    const { articleId } = await params;
    const article = await getArticle(articleId);
    if (!article) throw new AppError(404, '게시글을 찾을 수 없습니다.');
    return Response.json(article);
  } catch (error) {
    return getErrorResponse(error, '게시글을 불러오지 못했습니다.');
  }
}

export async function PATCH(request, { params }) {
  try {
    const { articleId } = await params;
    const article = await updateArticle(articleId, await readJson(request));
    return Response.json(article);
  } catch (error) {
    return getErrorResponse(error, '게시글을 수정하지 못했습니다.');
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { articleId } = await params;
    await deleteArticle(articleId);
    return new Response(null, { status: 204 });
  } catch (error) {
    return getErrorResponse(error, '게시글을 삭제하지 못했습니다.');
  }
}
