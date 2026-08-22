"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProductDetail } from "../lib/api/products";
import Link from "next/link";
import { getErrorMessage } from "../lib/error";
import Image from "next/image";
import profileIc from "@/public/icon_profile.png";
import Thumbnail from "./Thumbnail";
import KebabMenu from "./KebabMenu";
import styles from "./ItemDetail.module.css";
import Favorite from "./Favorite";
import ProductCommentList from "./ProductCommentList";
import { useRouter } from "next/navigation";
import { getMe } from "../lib/api/auth";

export default function ItemDetail({ id }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["item", id],
    queryFn: () => getProductDetail(id),
  });

  const { data: me } = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => getMe(),
    retry: false,
  });

  const { mutate } = useMutation({
    mutationFn: (productId) => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["item"] });
      router.replace("/items");
    },
  });

  if (isError) {
    const status = error.response?.status;
    if (status === 404)
      return (
        <>
          <p>존재하지 않는 상품입니다.</p>
          <Link href={"/items"}>목록으로 돌아가기</Link>
        </>
      );
    if (status === 401)
      return (
        <>
          <p>로그인이 필요합니다.</p>
          <Link href={"/signin"}>로그인하기</Link>
        </>
      );
    return <p>{getErrorMessage(error)}</p>;
  }
  if (isPending) {
    return null;
  }

  const {
    name,
    description,
    price,
    tags,
    images,
    ownerId,
    favoriteCount,
    createdAt,
    ownerNickname,
    isFavorite,
  } = data;

  return (
    <>
      <section className={styles.productDetailArea}>
        <div className={styles.thumbnail}>
          <Thumbnail imageUrl={images} alt={name} />
        </div>
        <div className={styles.content}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>{name}</h2>
            {ownerId === me?.id && (
              <KebabMenu
                confirmMessage="게시글을 삭제하시겠습니까?"
                onDelete={() => mutate(id)}
                editHref={`/items/${id}/edit`}
              />
            )}
          </div>
          <h2 className={styles.price}>{price.toLocaleString()}원</h2>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>상품 소개</h3>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>상품 태그</h3>
            <div className={styles.tagList}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <footer className={styles.footer}>
            <span className={styles.owner}>
              <Image
                className={styles.profileIc}
                src={profileIc}
                alt=""
                width={40}
                height={40}
              />
              <span className={styles.ownerInfo}>
                <span className={styles.nickname}>{ownerNickname}</span>
                <time className={styles.date} dateTime={createdAt}>
                  {createdAt.slice(0, 10).replaceAll("-", ". ")}
                </time>
              </span>
            </span>
            <Favorite id={id} isFavorite={isFavorite} count={favoriteCount} />
          </footer>
        </div>
      </section>
      <ProductCommentList id={id} />
      <Link href={"/items"}>목록으로 돌아가기</Link>
    </>
  );
}
