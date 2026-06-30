import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../api/productApi';
import styles from './RegistrationPage.module.css';

export default function RegistrationPage() {
    const navigate = useNavigate();

    // 입력값 4개를 한 객체로 관리
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [tags, setTags] = useState(''); // 일단 쉼표로 구분해서 입력받음

    async function handleSubmit() {
        try {
            const newProduct = await createProduct({
                name,
                description,
                price: Number(price),
                tags: tags
                    .split(',')
                    .map((t) => t.trim())
                    .filter((t) => t !== ''),
            });

            const newId = newProduct.id || newProduct._id;
            navigate(`/items/${newId}`);
        } catch (err) {
            console.error('상품 등록 실패:', err);
            alert('상품 등록에 실패했어요. 입력값을 확인해주세요.');
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>상품 등록하기</h2>
                <button className={styles.submitButton} onClick={handleSubmit}>
                    등록
                </button>
            </div>

            <div className={styles.field}>
                <label className={styles.label}>상품명</label>
                <input
                    className={styles.input}
                    placeholder="상품명을 입력해주세요"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>상품 소개</label>
                <textarea
                    className={styles.textarea}
                    placeholder="상품 소개를 입력해주세요"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>판매가격</label>
                <input
                    className={styles.input}
                    placeholder="판매 가격을 입력해주세요"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>태그</label>
                <input
                    className={styles.input}
                    placeholder="태그를 입력해주세요 (쉼표로 구분)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
            </div>
        </div>
    );
}