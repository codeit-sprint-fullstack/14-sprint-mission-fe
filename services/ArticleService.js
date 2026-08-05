import axios from 'axios';

import { API_HOST } from '../constant/constant.js';

/**
 * 게시글 목록 조회
 *
 * @param page 페이지 번호
 * @param pageSize 페이지 당 불러올 게시글 개수
 * @param keyword 검색 키워드 (제목/내용에 포함된 단어)
 */
export async function getArticleList(page, pageSize, keyword) {
  try {
    const response = await axios.get(`${API_HOST}/articles`, {
      params: { page, pageSize, keyword },
    });

    return response.data;
  } catch (error) {
    throw toServiceError(error);
  }
}

/**
 * 게시글 조회
 *
 * @param articleId 게시글 아이디
 */
export async function getArticle(articleId) {
  try {
    const response = await axios.get(`${API_HOST}/articles/${articleId}`);

    return response.data;
  } catch (error) {
    throw toServiceError(error);
  }
}

/**
 * 게시글 생성
 *
 * @param title 제목
 * @param content 내용
 */
export async function createArticle(title, content) {
  try {
    const response = await axios.post(`${API_HOST}/articles`, { title, content });

    return response.data;
  } catch (error) {
    throw toServiceError(error);
  }
}

/**
 * 게시글 수정
 *
 * @param articleId 수정할 게시글 아이디
 * @param title 제목
 * @param content 내용
 */
export async function patchArticle(articleId, title, content) {
  try {
    const response = await axios.patch(`${API_HOST}/articles/${articleId}`, { title, content });

    return response.data;
  } catch (error) {
    throw toServiceError(error);
  }
}

/**
 * 게시글 삭제
 *
 * @param articleId 삭제할 게시글 아이디
 */
export async function deleteArticle(articleId) {
  try {
    const response = await axios.delete(`${API_HOST}/articles/${articleId}`);

    return response.data;
  } catch (error) {
    throw toServiceError(error);
  }
}

/**
 * 서버가 상태코드와 함께 응답한 경우에는 사유가 담긴 에러로 변환하고,
 * 그 외(네트워크 오류 등)에는 원본 에러를 그대로 전달합니다.
 */
function toServiceError(error) {
  if (error.response) {
    const errorMessage = `[StatusCode ${error.response.status}] ${error.response.data.message}`;
    console.error(errorMessage);

    return new Error(errorMessage);
  }

  return error;
}
