'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '../../../services/ProductService.js';
import FormGroup from '../../components/FormGroup';
import TagInput from '../../components/TagInput';

export default function RegistrationPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState([]);

  const handleTagAdd = (tag) => setTags([...tags, tag]);

  const handleTagRemove = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    await createProduct(name, description, Number(price), [], tags, []);
    router.push('/items');
  };

  return (
    <div className="registrationPage">
      <div className="inner">
        <div className="registrationHeader">
          <h1>상품 등록하기</h1>
          <button className="submitBtn" onClick={handleSubmit}>등록</button>
        </div>

        <FormGroup label="상품명">
          <input
            type="text"
            placeholder="상품명을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup label="상품 소개">
          <textarea
            placeholder="상품 소개를 입력해주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>

        <FormGroup label="판매가격">
          <input
            type="number"
            placeholder="판매 가격을 입력해주세요"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormGroup>

        <FormGroup label="태그">
          <TagInput tags={tags} onAdd={handleTagAdd} onRemove={handleTagRemove} />
        </FormGroup>
      </div>
    </div>
  );
}
