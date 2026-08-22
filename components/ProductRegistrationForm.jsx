'use client';

import { useActionState, useMemo, useState } from 'react';
import SubmitButton from './SubmitButton';
import { createProductAction } from '@/app/(site)/registration/actions';

const initialValues = { name: '', description: '', price: '' };
const initialActionState = { error: '' };
const MAX_PRODUCT_IMAGE_SIZE = 2 * 1024 * 1024;

const rules = {
  name: {
    isValid: (value) => value.trim().length >= 1 && value.trim().length <= 10,
    message: '10자 이내로 입력해주세요',
  },
  description: {
    isValid: (value) => value.trim().length >= 10 && value.trim().length <= 100,
    message: '10자 이상 100자 이내로 입력해주세요',
  },
  price: {
    isValid: (value) => value.trim().length >= 1 && /^\d+$/.test(value.trim()),
    message: '숫자로 입력해주세요',
  },
  tag: {
    isValid: (value) => value.trim().length >= 1 && value.trim().length <= 5,
    message: '5글자 이내로 입력해주세요',
  },
};

function readImageAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result));
    reader.addEventListener('error', () => reject(new Error('이미지를 읽지 못했습니다.')));
    reader.readAsDataURL(file);
  });
}

export default function ProductRegistrationForm() {
  const [actionState, formAction] = useActionState(createProductAction, initialActionState);
  const [values, setValues] = useState(initialValues);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [imageName, setImageName] = useState('');
  const [imageError, setImageError] = useState('');
  const [touched, setTouched] = useState({});

  const validation = useMemo(() => {
    const errors = {
      name: values.name.trim() && !rules.name.isValid(values.name) ? rules.name.message : '',
      description: values.description.trim() && !rules.description.isValid(values.description)
        ? rules.description.message
        : '',
      price: values.price.trim() && !rules.price.isValid(values.price) ? rules.price.message : '',
      tagInput: tagInput.trim() && !rules.tag.isValid(tagInput) ? rules.tag.message : '',
      tags: tags.length ? '' : '태그를 1개 이상 입력해주세요',
    };
    const requiredFieldsFilled = Boolean(
      values.name.trim() && values.description.trim() && values.price.trim() && tags.length,
    );
    const isValid = requiredFieldsFilled
      && rules.name.isValid(values.name)
      && rules.description.isValid(values.description)
      && rules.price.isValid(values.price)
      && !errors.tagInput;

    return { errors, requiredFieldsFilled, isValid };
  }, [tagInput, tags.length, values]);

  const visibleErrors = {
    name: touched.name ? validation.errors.name : '',
    description: touched.description ? validation.errors.description : '',
    price: touched.price ? validation.errors.price : '',
    tagInput: touched.tagInput ? validation.errors.tagInput : '',
    tags: touched.tags ? validation.errors.tags : '',
  };
  const isSubmitDisabled = !validation.requiredFieldsFilled || !validation.isValid;

  const updateField = (name) => (event) => {
    setValues((current) => ({ ...current, [name]: event.target.value }));
  };
  const touchField = (name) => () => {
    setTouched((current) => ({ ...current, [name]: true }));
  };

  async function updateImage(event) {
    const file = event.target.files?.[0];
    setImageError('');

    if (!file) {
      setImageDataUrl('');
      setImageName('');
      return;
    }
    if (!file.type.startsWith('image/')) {
      setImageError('이미지 파일만 등록할 수 있습니다.');
      event.target.value = '';
      return;
    }
    if (file.size > MAX_PRODUCT_IMAGE_SIZE) {
      setImageError('이미지는 2MB 이하로 등록해주세요.');
      event.target.value = '';
      return;
    }

    try {
      setImageDataUrl(await readImageAsDataUrl(file));
      setImageName(file.name);
    } catch (error) {
      setImageDataUrl('');
      setImageName('');
      setImageError(error.message);
    }
  }

  function addTag() {
    const nextTag = tagInput.trim();
    setTouched((current) => ({ ...current, tagInput: true, tags: true }));
    if (!rules.tag.isValid(nextTag) || tags.includes(nextTag)) return;
    setTags((current) => [...current, nextTag]);
    setTagInput('');
    setTouched((current) => ({ ...current, tagInput: false, tags: true }));
  }

  function handleTagKeyDown(event) {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    addTag();
  }

  return (
    <form className="registration-form" action={formAction} noValidate>
      <div className="registration-title-row">
        <h1>상품 등록하기</h1>
        <SubmitButton className="registration-submit-button" disabled={isSubmitDisabled}>등록</SubmitButton>
      </div>

      <input type="hidden" name="image" value={imageDataUrl} />
      {tags.map((tag) => <input key={tag} type="hidden" name="tags" value={tag} />)}

      <div className="registration-field">
        <span className="registration-label">상품 이미지</span>
        <div className="registration-image-row">
          <label className={`registration-image-upload ${imageDataUrl ? 'has-image' : ''}`}>
            {imageDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageDataUrl} alt="등록할 상품 이미지 미리보기" />
            ) : (
              <><span className="registration-image-upload__plus" aria-hidden="true">+</span><span>이미지 등록</span></>
            )}
            <input type="file" accept="image/*" onChange={updateImage} />
          </label>
          {imageDataUrl ? (
            <button
              className="registration-image-remove"
              type="button"
              onClick={() => {
                setImageDataUrl('');
                setImageName('');
                setImageError('');
              }}
            >이미지 삭제</button>
          ) : null}
        </div>
        {imageName ? <span className="registration-image-name">{imageName}</span> : null}
        {imageError ? <span className="registration-error">{imageError}</span> : null}
      </div>

      <label className="registration-field">
        <span className="registration-label">상품명</span>
        <input
          className={`registration-input ${visibleErrors.name ? 'is-error' : ''}`}
          name="name"
          type="text"
          value={values.name}
          onChange={updateField('name')}
          onBlur={touchField('name')}
          placeholder="상품명을 입력해주세요"
          maxLength={10}
        />
        {visibleErrors.name ? <span className="registration-error">{visibleErrors.name}</span> : null}
      </label>

      <label className="registration-field">
        <span className="registration-label">상품 소개</span>
        <textarea
          className={`registration-textarea ${visibleErrors.description ? 'is-error' : ''}`}
          name="description"
          value={values.description}
          onChange={updateField('description')}
          onBlur={touchField('description')}
          placeholder="상품 소개를 입력해주세요"
          maxLength={100}
        />
        {visibleErrors.description ? <span className="registration-error">{visibleErrors.description}</span> : null}
      </label>

      <label className="registration-field">
        <span className="registration-label">판매가격</span>
        <input
          className={`registration-input ${visibleErrors.price ? 'is-error' : ''}`}
          name="price"
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
          placeholder="태그를 입력하고 Enter를 눌러주세요"
        />
        {visibleErrors.tagInput ? <span className="registration-error">{visibleErrors.tagInput}</span> : null}
        {!visibleErrors.tagInput && visibleErrors.tags
          ? <span className="registration-error">{visibleErrors.tags}</span>
          : null}
        <div className="registration-tags" aria-label="입력된 태그">
          {tags.map((tag) => (
            <span className="registration-tag" key={tag}>
              #{tag}
              <button
                type="button"
                onClick={() => {
                  setTags((current) => current.filter((item) => item !== tag));
                  setTouched((current) => ({ ...current, tags: true }));
                }}
                aria-label={`${tag} 태그 삭제`}
              >×</button>
            </span>
          ))}
        </div>
      </div>

      {actionState.error ? <p className="registration-submit-error">{actionState.error}</p> : null}
    </form>
  );
}
