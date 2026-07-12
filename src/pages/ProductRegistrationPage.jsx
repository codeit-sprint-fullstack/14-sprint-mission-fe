import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import useProductRegistrationValidation from '../hooks/useProductRegistrationValidation.js';
import { createProduct } from '../services/pandaApi.js';

const initialValues = {
  name: '',
  description: '',
  price: '',
};

const MAX_PRODUCT_IMAGE_SIZE = 2 * 1024 * 1024;

function readImageAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => resolve(reader.result));
    reader.addEventListener('error', () => reject(new Error('이미지를 읽지 못했습니다.')));
    reader.readAsDataURL(file);
  });
}

function ProductRegistrationPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [imageName, setImageName] = useState('');
  const [imageError, setImageError] = useState('');
  const [touched, setTouched] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validation = useProductRegistrationValidation({ values, tags, tagInput });
  const isSubmitDisabled = !validation.requiredFieldsFilled || !validation.isValid || isSubmitting;

  const visibleErrors = useMemo(() => ({
    name: touched.name ? validation.errors.name : '',
    description: touched.description ? validation.errors.description : '',
    price: touched.price ? validation.errors.price : '',
    tagInput: touched.tagInput ? validation.errors.tagInput : '',
    tags: touched.tags ? validation.errors.tags : '',
  }), [touched, validation.errors]);

  const updateField = (name) => (event) => {
    setValues((current) => ({ ...current, [name]: event.target.value }));
  };

  const touchField = (name) => () => {
    setTouched((current) => ({ ...current, [name]: true }));
  };

  const updateImage = async (event) => {
    const file = event.target.files?.[0];
    setImageError('');

    if (!file) {
      setImageDataUrl('');
      setImageName('');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setImageDataUrl('');
      setImageName('');
      setImageError('이미지 파일만 등록할 수 있습니다.');
      event.target.value = '';
      return;
    }

    if (file.size > MAX_PRODUCT_IMAGE_SIZE) {
      setImageDataUrl('');
      setImageName('');
      setImageError('이미지는 2MB 이하로 등록해주세요.');
      event.target.value = '';
      return;
    }

    try {
      const dataUrl = await readImageAsDataUrl(file);
      setImageDataUrl(dataUrl);
      setImageName(file.name);
    } catch (error) {
      setImageDataUrl('');
      setImageName('');
      setImageError(error.message);
    }
  };

  const removeImage = () => {
    setImageDataUrl('');
    setImageName('');
    setImageError('');
  };

  const addTag = () => {
    const nextTag = tagInput.trim();
    const tagValidation = validation.validateTag(nextTag);

    setTouched((current) => ({ ...current, tagInput: true, tags: true }));

    if (!tagValidation.isValid || tags.includes(nextTag)) {
      return;
    }

    setTags((current) => [...current, nextTag]);
    setTagInput('');
    setTouched((current) => ({ ...current, tagInput: false, tags: true }));
  };

  const handleTagKeyDown = (event) => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    addTag();
  };

  const removeTag = (targetTag) => {
    setTags((current) => current.filter((tag) => tag !== targetTag));
    setTouched((current) => ({ ...current, tags: true }));
  };

  const submitProduct = async (event) => {
    event.preventDefault();
    setTouched({
      name: true,
      description: true,
      price: true,
      tagInput: Boolean(tagInput.trim()),
      tags: true,
    });
    setSubmitError('');

    if (!validation.isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const product = await createProduct({
        name: values.name.trim(),
        description: values.description.trim(),
        price: Number(values.price),
        tags,
        image: imageDataUrl || null,
      });

      navigate(`/items/${product.id}`);
    } catch (error) {
      setSubmitError(error.message || '상품 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-page">
      <Header logoMode="market" />
      <main className="registration-main">
        <form className="registration-form" onSubmit={submitProduct} noValidate>
          <div className="registration-title-row">
            <h1>상품 등록하기</h1>
            <button className="registration-submit-button" type="submit" disabled={isSubmitDisabled}>
              {isSubmitting ? '등록 중' : '등록'}
            </button>
          </div>

          <div className="registration-field">
            <span className="registration-label">상품 이미지</span>
            <div className="registration-image-row">
              <label className={`registration-image-upload ${imageDataUrl ? 'has-image' : ''}`}>
                {imageDataUrl ? (
                  <img src={imageDataUrl} alt="등록할 상품 이미지 미리보기" />
                ) : (
                  <>
                    <span className="registration-image-upload__plus" aria-hidden="true">+</span>
                    <span>이미지 등록</span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={updateImage} />
              </label>
              {imageDataUrl ? (
                <button className="registration-image-remove" type="button" onClick={removeImage}>
                  이미지 삭제
                </button>
              ) : null}
            </div>
            {imageName ? <span className="registration-image-name">{imageName}</span> : null}
            {imageError ? <span className="registration-error">{imageError}</span> : null}
          </div>

          <label className="registration-field">
            <span className="registration-label">상품명</span>
            <input
              className={`registration-input ${visibleErrors.name ? 'is-error' : ''}`}
              type="text"
              value={values.name}
              onChange={updateField('name')}
              onBlur={touchField('name')}
              placeholder="상품명을 입력해주세요"
              maxLength={30}
            />
            {visibleErrors.name ? <span className="registration-error">{visibleErrors.name}</span> : null}
          </label>

          <label className="registration-field">
            <span className="registration-label">상품 소개</span>
            <textarea
              className={`registration-textarea ${visibleErrors.description ? 'is-error' : ''}`}
              value={values.description}
              onChange={updateField('description')}
              onBlur={touchField('description')}
              placeholder="상품 소개를 입력해주세요"
              maxLength={150}
            />
            {visibleErrors.description ? <span className="registration-error">{visibleErrors.description}</span> : null}
          </label>

          <label className="registration-field">
            <span className="registration-label">판매가격</span>
            <input
              className={`registration-input ${visibleErrors.price ? 'is-error' : ''}`}
              type="text"
              inputMode="numeric"
              value={values.price}
              onChange={updateField('price')}
              onBlur={touchField('price')}
              placeholder="판매 가격을 입력해주세요"
            />
            {visibleErrors.price ? <span className="registration-error">{visibleErrors.price}</span> : null}
          </label>

          <div className="registration-field">
            <label className="registration-label" htmlFor="product-tag">태그</label>
            <input
              id="product-tag"
              className={`registration-input ${(visibleErrors.tagInput || visibleErrors.tags) ? 'is-error' : ''}`}
              type="text"
              value={tagInput}
              onChange={(event) => setTagInput(event.target.value)}
              onBlur={touchField('tagInput')}
              onKeyDown={handleTagKeyDown}
              placeholder="태그를 입력해주세요"
            />
            {visibleErrors.tagInput ? <span className="registration-error">{visibleErrors.tagInput}</span> : null}
            {!visibleErrors.tagInput && visibleErrors.tags ? (
              <span className="registration-error">{visibleErrors.tags}</span>
            ) : null}
            <div className="registration-tags" aria-label="입력된 태그">
              {tags.map((tag) => (
                <span className="registration-tag" key={tag}>
                  #{tag}
                  <button type="button" onClick={() => removeTag(tag)} aria-label={`${tag} 태그 삭제`}>
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {submitError ? <p className="registration-submit-error">{submitError}</p> : null}
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default ProductRegistrationPage;
