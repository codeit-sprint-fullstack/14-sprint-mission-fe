import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import { createArticle } from '../services/pandaApi.js';

function ArticleRegistrationPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ title: '', content: '' });
  const [imagePreview, setImagePreview] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSubmitDisabled = useMemo(
    () => !values.title.trim() || !values.content.trim() || isSubmitting,
    [isSubmitting, values.content, values.title],
  );

  const updateField = (name) => (event) => {
    setValues((current) => ({ ...current, [name]: event.target.value }));
  };

  const updateImage = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setImagePreview('');
      return;
    }

    setImagePreview(URL.createObjectURL(file));
  };

  const submitArticle = async (event) => {
    event.preventDefault();
    setSubmitError('');

    if (isSubmitDisabled) {
      return;
    }

    setIsSubmitting(true);

    try {
      const article = await createArticle({
        title: values.title.trim(),
        content: values.content.trim(),
        image: imagePreview,
      });

      navigate(`/free-board/${article.id}`);
    } catch (error) {
      setSubmitError(error.message || '게시글 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="article-registration-page">
      <Header logoMode="market" />
      <main className="article-form-main">
        <form className="article-form" onSubmit={submitArticle}>
          <div className="article-form-title-row">
            <h1>게시글 쓰기</h1>
            <button className="article-submit-button" type="submit" disabled={isSubmitDisabled}>
              {isSubmitting ? '등록 중' : '등록'}
            </button>
          </div>

          <label className="article-form-field">
            <span>*제목</span>
            <input
              type="text"
              value={values.title}
              onChange={updateField('title')}
              placeholder="제목을 입력해주세요"
            />
          </label>

          <label className="article-form-field">
            <span>*내용</span>
            <textarea
              value={values.content}
              onChange={updateField('content')}
              placeholder="내용을 입력해주세요"
            />
          </label>

          <div className="article-form-field">
            <span>이미지</span>
            <label className="article-image-upload">
              {imagePreview ? (
                <img src={imagePreview} alt="등록할 이미지 미리보기" />
              ) : (
                <>
                  <span className="article-image-upload__plus" aria-hidden="true">+</span>
                  <span>이미지 등록</span>
                </>
              )}
              <input type="file" accept="image/*" onChange={updateImage} />
            </label>
          </div>

          {submitError ? <p className="article-submit-error">{submitError}</p> : null}
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default ArticleRegistrationPage;
