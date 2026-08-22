import { getErrorResponse, readJson } from '@/lib/errors';
import { deleteComment, updateComment } from '@/lib/panda-data';

export async function PATCH(request, { params }) {
  try {
    const { commentId } = await params;
    const comment = await updateComment(commentId, await readJson(request));
    return Response.json(comment);
  } catch (error) {
    return getErrorResponse(error, '댓글을 수정하지 못했습니다.');
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { commentId } = await params;
    await deleteComment(commentId);
    return new Response(null, { status: 204 });
  } catch (error) {
    return getErrorResponse(error, '댓글을 삭제하지 못했습니다.');
  }
}
