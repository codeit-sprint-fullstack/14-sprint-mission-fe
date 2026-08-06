import { getErrorResponse, readJson } from '@/lib/errors';
import { createProduct, listProducts } from '@/lib/panda-data';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const data = await listProducts({
      offset: searchParams.get('offset') || 0,
      limit: searchParams.get('limit') || 10,
      keyword: searchParams.get('keyword') || '',
    });
    return Response.json(data);
  } catch (error) {
    return getErrorResponse(error, '상품 목록을 불러오지 못했습니다.');
  }
}

export async function POST(request) {
  try {
    const product = await createProduct(await readJson(request));
    return Response.json(product, { status: 201 });
  } catch (error) {
    return getErrorResponse(error, '상품을 등록하지 못했습니다.');
  }
}
