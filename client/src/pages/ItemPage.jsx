import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductList } from '../api/productApi';
import styles from './ItemsPage.module.css';

// 사진은 디폴트 이미지로 프론트에서 처리 (요구사항)
const DEFAULT_IMAGE = 'https://placehold.co/200x200?text=No+Image';

export default function ItemsPage() {
    const [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState('');

    // keyword가 바뀔 때마다 다시 불러옴 (빈 배열이 아니라 [keyword])
    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProductList({ keyword, sort: 'recent', pageSize: 10 });
                setProducts(data);
            } catch (err) {
                console.error('상품 목록 불러오기 실패:', err);
            }
        }
        fetchProducts();
    }, [keyword]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>판매 중인 상품</h2>
                <Link to="/registration" className={styles.registerButton}>
                    상품 등록하기
                </Link>
            </div>

            <input
                className={styles.search}
                placeholder="검색할 상품을 입력해주세요"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />

            <ul className={styles.list}>
                {products.map((product) => {
                    const productId = product.id || product._id; // id 없으면 _id 사용
                    return (
                        <li key={productId} className={styles.card}>
                            <Link to={`/items/${productId}`}>
                                <img src={DEFAULT_IMAGE} alt={product.name} className={styles.image} />
                                <p className={styles.name}>{product.name}</p>
                                <p className={styles.price}>{product.price.toLocaleString()}원</p>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}