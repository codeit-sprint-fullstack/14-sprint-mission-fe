"use client";

import { getProduct, getProductComments } from "@/lib/api/products";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);

  const productQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });

  const commentsQuery = useQuery({
    queryKey: ["productComments", productId],
    queryFn: () => getProductComments({ productId, limit: 10 }),
  });

  if (productQuery.isPending) {
    return <p>상품 정보를 불러오는 중입니다.</p>;
  }

  if (productQuery.isError) {
    return <p>{productQuery.error.message}</p>;
  }

  const product = productQuery.data;
  const comments = commentsQuery.data?.list ?? [];

  const imageUrl = product.images?.[0];

  return (
    <main className={styles.container}>
      <div className={styles.productLayout}>
        <div className={styles.imageArea}>
          <Image
            src={imageUrl}
            alt="제품 이미지"
            fill
            sizes="486px"
            className={styles.productImage}
          />
        </div>

        <section className={styles.productInfo}>
          <h1>{product.name}</h1>
          <strong>{product.price.toLocaleString()}원</strong>

          <div className={styles.infoDivider} />

          <div>
            <h2>상품 소개</h2>
            <p>{product.description}</p>
          </div>

          <div>
            <h2>상품 태그</h2>

            <div>
              {product.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2>문의하기</h2>

          {commentsQuery.isPending && <p>댓글을 불러오는 중입니다.</p>}

          {commentsQuery.isError && <p>{commentsQuery.error.message}</p>}

          {comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.content}</p>
              <span>{comment.writer.nickname}</span>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
