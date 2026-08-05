import axios from 'axios';

import { API_HOST } from '../constant/constant.js';

/**
 * 게시글 댓글 목록 조회 (cursor 페이지네이션)
 *
 * @param articleId 게시글 아이디
 * @param cursor 마지막으로 받은 댓글 아이디 (첫 페이지는 생략)
 * @param limit 한 번에 불러올 댓글 개수
 */
export async function getArticleComments(articleId, cursor, limit = 10) {
  try {
    const response = await axios.get(`${API_HOST}/articles/${articleId}/comments`, {
      params: { cursor, limit },
    });

    return response.data;
  } catch (error) {
    throw toServiceError(error);
  }
}

/**
 * 게시글 댓글 등록
 *
 * @param articleId 게시글 아이디
 * @param content 댓글 내용
 */
export async function createArticleComment(articleId, content) {
  try {
    const response = await axios.post(`${API_HOST}/articles/${articleId}/comments`, { content });

    return response.data;
  } catch (error) {
    throw toServiceError(error);
  }
}

/**
 * 댓글 수정
 *
 * @param commentId 댓글 아이디
 * @param content 수정할 내용
 */
export async function patchComment(commentId, content) {
  try {
    const response = await axios.patch(`${API_HOST}/comments/${commentId}`, { content });

    return response.data;
  } catch (error) {
    throw toServiceError(error);
  }
}

/**
 * 댓글 삭제
 *
 * @param commentId 댓글 아이디
 */
export async function deleteComment(commentId) {
  try {
    const response = await axios.delete(`${API_HOST}/comments/${commentId}`);

    return response.data;
  } catch (error) {
    throw toServiceError(error);
  }
}

function toServiceError(error) {
  if (error.response) {
    const errorMessage = `[StatusCode ${error.response.status}] ${error.response.data.message}`;
    console.error(errorMessage);

    return new Error(errorMessage);
  }

  return error;
}
