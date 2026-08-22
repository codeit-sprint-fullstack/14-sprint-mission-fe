'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createArticle, getArticle, patchArticle } from '@/lib/client-api';

export default function ArticleRegistrationForm({ mode = 'create', articleId = '' }) {
  const router = useRouter();
  const isEdit = mode === 'edit';
  const [values, setValues] = useState({ title: '', content: '' });
  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit || !articleId) return undefined;

    let ignore = false;
    getArticle(articleId)
      .then((article) => {
        if (!ignore) setValues({ title: article.title || '', content: article.content || '' });
      })
      .catch((requestError) => {
        if (!ignore) setError(requestError.message || '게시글을 불러오지 못했습니다.');
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => { ignore = true; };
  }, [articleId, isEdit]);

  const isSubmitDisabled = useMemo(
    () => !values.title.trim() || !values.content.trim() || isLoading || isSubmitting,
    [isLoading, isSubmitting, values.content, values.title],
  );

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function submitArticle(event) {
    event.preventDefault();
    if (isSubmitDisabled) return;

    setError('');
    setIsSubmitting(true);
    try {
      const payload = {
        title: values.title.trim(),
        content: values.content.trim(),
      };
      const article = isEdit
        ? await patchArticle(articleId, payload)
        : await createArticle(payload);
      router.push(`/free-board/${article.id}`);
      router.refresh();
    } catch (requestError) {
      setError(requestError.message || `게시글 ${isEdit ? '수정' : '등록'}에 실패했습니다.`);
      setIsSubmitting(false);
    }
  }

  return (
    <form className="article-form" onSubmit={submitArticle}>
      <div className="article-form-title-row">
        <h1>{isEdit ? '게시글 수정' : '게시글 쓰기'}</h1>
        <button className="article-submit-button" type="submit" disabled={isSubmitDisabled}>
          {isSubmitting ? '처리 중' : isEdit ? '수정 완료' : '등록'}
        </button>
      </div>

      <label className="article-form-field">
        <span>*제목</span>
        <input
          name="title"
          type="text"
          value={values.title}
          onChange={updateField}
          placeholder="제목을 입력해주세요"
          maxLength={100}
        />
      </label>

      <label className="article-form-field">
        <span>*내용</span>
        <textarea
          name="content"
          value={values.content}
          onChange={updateField}
          placeholder="내용을 입력해주세요"
        />
      </label>

      {error ? <p className="article-submit-error" role="alert">{error}</p> : null}
    </form>
  );
}
