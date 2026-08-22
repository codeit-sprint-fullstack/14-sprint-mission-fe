import { getErrorResponse, readJson } from '@/lib/errors';
import { AppError } from '@/lib/errors';
import { deleteProduct, getProduct, updateProduct } from '@/lib/panda-data';

export async function GET(_request, { params }) {
  try {
    const { productId } = await params;
    const product = await getProduct(productId);
    if (!product) throw new AppError(404, '상품을 찾을 수 없습니다.');
    return Response.json(product);
  } catch (error) {
    return getErrorResponse(error, '상품을 불러오지 못했습니다.');
  }
}

export async function PATCH(request, { params }) {
  try {
    const { productId } = await params;
    const product = await updateProduct(productId, await readJson(request));
    return Response.json(product);
  } catch (error) {
    return getErrorResponse(error, '상품을 수정하지 못했습니다.');
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { productId } = await params;
    await deleteProduct(productId);
    return new Response(null, { status: 204 });
  } catch (error) {
    return getErrorResponse(error, '상품을 삭제하지 못했습니다.');
  }
}
