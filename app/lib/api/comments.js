import axios from "@/app/lib/axios";

export async function getProductComments({ productId, limit, cursor }) {
  const res = await axios.get(`/products/${productId}/comments`, {
    params: {
      limit,
      cursor,
    },
  });
  return res.data;
}

export async function createProductComment({ productId, content }) {
  const res = await axios.post(`/products/${productId}/comments`, { content });
  return res.data;
}

export async function updateComment({ commentId, content }) {
  const res = await axios.patch(`/comments/${commentId}`, { content });
  return res.data;
}

export async function deleteComment({ commentId }) {
  const res = await axios.delete(`/comments/${commentId}`);
  return res.data;
}
