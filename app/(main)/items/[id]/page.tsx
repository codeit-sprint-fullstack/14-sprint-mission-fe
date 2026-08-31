"use client";

import Link from "next/link";
import Image from "next/image";
import { FavoriteButton } from "@/app/components/favoriteButton";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/app/components/authProvider";
import ProductCommentSection from "@/app/components/ProductCommentSection";
import { useRouter } from "next/navigation";

export const ProductList = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const { accessToken } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(
        `https://panda-market-api.vercel.app/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const data = await res.json();
      console.log("뭐가문제야", data);
      if (!res.ok) {
        alert("로그인이 만료됐습니다. 다시 로그인해주세요.");
        router.push("/login");
        return;
      }
      setProduct(data);
    };
    if (accessToken) {
      fetchProduct();
    }
  }, [id, accessToken]);

  if (!accessToken) {
    return (
      <div>
        로그인이 필요한 페이지입니다.
        <Link href={"/login"}>로그인하러 가기</Link>
      </div>
    );
  }

  if (!product) return <div> 로딩중...</div>;
  return (
    <div>
      <h1>{product.name}</h1>
      <h1>{product.price}</h1>
      <h2>상품소개</h2>
      <p>{product.description}</p>
      <p>{product.ownerNickname}</p>
      <FavoriteButton
        productId={product.id}
        initialIsFavorite={product.isFavorite}
        initialFavoriteCount={product.favoriteCount}
      />
      <h2>상품태그</h2>
      <h2>
        {product.tags.map((tag: string) => (
          <span key={tag}>#{tag}</span>
        ))}
      </h2>
      <ProductCommentSection productId={product.id} />
      <Image
        src={product.images[0]}
        alt={product.name}
        width={120}
        height={120}
        style={{ width: "auto", height: "auto" }}
        unoptimized
      />

      <Link href={"/items"}>돌아가기</Link>
    </div>
  );
};

export default ProductList;
