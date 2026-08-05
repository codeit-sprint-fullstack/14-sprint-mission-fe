import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createArticle, getArticle, patchArticle } from '../../services/ArticleService.js';
import FormGroup from '../components/FormGroup';
import Footer from '../components/Footer';
// formGroup / submitBtn 스타일을 상품 등록 페이지와 공유한다
import '../styles/registration.css';
import '../styles/board.css';

/**
 * 게시글 등록/수정 페이지.
 * URL에 :id가 있으면 수정 모드로 동작한다. (UI는 등록과 동일)
 */
function ArticleForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // 수정 모드일 때 기존 값을 불러와 폼을 채운다
  useEffect(() => {
    if (!isEditMode) return;

    let ignore = false;
    setLoading(true);

    getArticle(id)
      .then((data) => {
        if (ignore) return;
        setTitle(data.title);
        setContent(data.content);
      })
      .catch((err) => {
        if (!ignore) setError(err);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id, isEditMode]);

  // 모든 필드가 채워져야 등록 버튼이 활성화된다
  const isValid = title.trim() !== '' && content.trim() !== '';

  const handleSubmit = async () => {
    if (!isValid || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const article = isEditMode
        ? await patchArticle(id, title, content)
        : await createArticle(title, content);

      navigate(`/board/${article.id}`);
    } catch (err) {
      setError(err);
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="main">
        <div className="inner">
          {loading ? (
            <div className="articleStatus">로딩 중...</div>
          ) : (
            <div className="articleForm">
              <div className="articleFormHeader">
                <h1>{isEditMode ? '게시글 수정' : '게시글 쓰기'}</h1>
                <button className="submitBtn" disabled={!isValid || submitting} onClick={handleSubmit}>
                  {isEditMode ? '수정' : '등록'}
                </button>
              </div>

              <FormGroup label="*제목">
                <input
                  type="text"
                  placeholder="제목을 입력해주세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormGroup>

              <FormGroup label="*내용">
                <textarea
                  className="articleContentInput"
                  placeholder="내용을 입력해주세요"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </FormGroup>

              {error && (
                <p className="articleFormError">
                  {isEditMode ? '수정에 실패했습니다.' : '등록에 실패했습니다.'} 잠시 후 다시 시도해주세요.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ArticleForm;
