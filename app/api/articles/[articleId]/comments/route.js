import { getErrorResponse, readJson } from '@/lib/errors';
import { createComment, listComments } from '@/lib/panda-data';

export async function GET(request, { params }) {
  try {
    const { articleId } = await params;
    const { searchParams } = new URL(request.url);
    const comments = await listComments('article', articleId, {
      cursor: searchParams.get('cursor') || '',
      limit: searchParams.get('limit') || 3,
    });
    return Response.json(comments);
  } catch (error) {
    return getErrorResponse(error, '댓글을 불러오지 못했습니다.');
  }
}

export async function POST(request, { params }) {
  try {
    const { articleId } = await params;
    const comment = await createComment('article', articleId, await readJson(request));
    return Response.json(comment, { status: 201 });
  } catch (error) {
    return getErrorResponse(error, '댓글을 등록하지 못했습니다.');
  }
}
