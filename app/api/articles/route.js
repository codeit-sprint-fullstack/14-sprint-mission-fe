import { getErrorResponse, readJson } from '@/lib/errors';
import { createArticle, listArticles } from '@/lib/panda-data';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const data = await listArticles({
      offset: searchParams.get('offset') || 0,
      limit: searchParams.get('limit') || 10,
      keyword: searchParams.get('keyword') || '',
      orderBy: searchParams.get('orderBy') || 'recent',
    });
    return Response.json(data);
  } catch (error) {
    return getErrorResponse(error, '게시글 목록을 불러오지 못했습니다.');
  }
}

export async function POST(request) {
  try {
    const article = await createArticle(await readJson(request));
    return Response.json(article, { status: 201 });
  } catch (error) {
    return getErrorResponse(error, '게시글을 등록하지 못했습니다.');
  }
}
