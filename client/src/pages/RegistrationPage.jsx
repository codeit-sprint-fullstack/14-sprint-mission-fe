import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../api/productApi';
import useProductValidation from '../hooks/useProductValidation';
import styles from './RegistrationPage.module.css';

export default function RegistrationPage() {
    const navigate = useNavigate();
    const { errors, validateField } = useProductValidation();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const [tagInput, setTagInput] = useState(''); // 입력 중인 태그 한 줄
    const [tags, setTags] = useState([]);          // 칩으로 쌓인 태그 배열

    // ① 빈 값이 하나라도 있으면 true → 버튼 비활성화
    const isEmpty =
        name.trim() === '' ||
        description.trim() === '' ||
        price.trim() === '' ||
        tags.length === 0;

    // 입력 + 즉시 검증을 함께 처리하는 헬퍼
    function handleChange(field, value, setter) {
        setter(value);
        validateField(field, value);
    }

    // ② 엔터 → 태그 칩 추가
    function handleTagKeyDown(e) {
        if (e.key !== 'Enter') return;
        e.preventDefault(); // 엔터로 폼 동작하는 것 방지

        const value = tagInput.trim();
        const message = validateField('tag', value); // 5글자 검증
        if (value === '' || message) return;          // 빈값이거나 에러면 추가 안 함
        if (tags.includes(value)) {                   // 중복 방지
            setTagInput('');
            return;
        }

        setTags((prev) => [...prev, value]);
        setTagInput(''); // 입력칸 비우기
    }

    function removeTag(target) {
        setTags((prev) => prev.filter((t) => t !== target));
    }

    async function handleSubmit() {
        e.preventDefault()
        try {
            const newProduct = await createProduct({
                name,
                description,
                price: Number(price),
                tags, // 이미 배열
            });
            const newId = newProduct.id || newProduct._id;
            navigate(`/items/${newId}`);
        } catch (err) {
            console.error('상품 등록 실패:', err);
            alert('상품 등록에 실패했어요. 입력값을 확인해주세요.');
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <div className={styles.header}>
                <h2>상품 등록하기</h2>
                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isEmpty} // ① 빈값 있으면 비활성화
                >
                    등록
                </button>
            </div>

            {/* 상품명 */}
            <div className={styles.field}>
                <label className={styles.label}>상품명</label>
                <input
                    className={`${styles.input} ${errors.name ? styles.invalid : ''}`}
                    placeholder="상품명을 입력해주세요"
                    value={name}
                    onChange={(e) => handleChange('name', e.target.value, setName)}
                />
                {errors.name && <p className={styles.errorText}>{errors.name}</p>}
            </div>

            {/* 상품 소개 */}
            <div className={styles.field}>
                <label className={styles.label}>상품 소개</label>
                <textarea
                    className={`${styles.textarea} ${errors.description ? styles.invalid : ''}`}
                    placeholder="상품 소개를 입력해주세요"
                    value={description}
                    onChange={(e) => handleChange('description', e.target.value, setDescription)}
                />
                {errors.description && <p className={styles.errorText}>{errors.description}</p>}
            </div>

            {/* 판매가격 */}
            <div className={styles.field}>
                <label className={styles.label}>판매가격</label>
                <input
                    className={`${styles.input} ${errors.price ? styles.invalid : ''}`}
                    placeholder="판매 가격을 입력해주세요"
                    value={price}
                    onChange={(e) => handleChange('price', e.target.value, setPrice)}
                />
                {errors.price && <p className={styles.errorText}>{errors.price}</p>}
            </div>

            {/* 태그 */}
            <div className={styles.field}>
                <label className={styles.label}>태그</label>
                <input
                    className={`${styles.input} ${errors.tag ? styles.invalid : ''}`}
                    placeholder="태그를 입력 후 엔터를 눌러주세요"
                    value={tagInput}
                    onChange={(e) => handleChange('tag', e.target.value, setTagInput)}
                    onKeyDown={handleTagKeyDown}
                />
                {errors.tag && <p className={styles.errorText}>{errors.tag}</p>}

                {/* 쌓인 칩들 */}
                <div className={styles.chipList}>
                    {tags.map((tag) => (
                        <span key={tag} className={styles.chip}>
                            #{tag}
                            <button className={styles.chipDelete} onClick={() => removeTag(tag)}>
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            </div>
        </form>
    );
}