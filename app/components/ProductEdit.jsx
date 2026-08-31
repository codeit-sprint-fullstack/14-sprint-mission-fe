"use client";

import { useQuery } from "@tanstack/react-query";
import ProductForm from "./ProductForm";
import { getProductDetail } from "../lib/api/products";
import { getErrorMessage } from "../lib/error";
import { productKeys } from "../lib/queryKeys";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductEdit({ id }) {
  const router = useRouter();
  const { user, isPending: isUserPending } = useAuth();

  useEffect(() => {
    if (!isUserPending && !user) {
      router.replace("/signin");
    }
  }, [user, isUserPending, router]);

  const {
    data,
    isPending: isProductPending,
    isError,
    error,
  } = useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductDetail(id),
  });

  const isUserMatched = data && data.ownerId !== user?.id;
  useEffect(() => {
    if (isUserMatched) {
      router.replace("/items");
    }
  }, [isError, data, user?.id, router]);

  if (isUserPending || isProductPending || !user) {
    return <p>로딩중입니다...</p>;
  }

  if (isError) {
    const status = error.response?.status;
    if (status === 404)
      return (
        <>
          <p>존재하지 않는 상품입니다.</p>
          <Link href={"/items"}>목록으로 돌아가기</Link>
        </>
      );
    return <p>{getErrorMessage(error)}</p>;
  }

  if (isUserMatched) {
    return null;
  }

  return <ProductForm product={data} id={id} />;
}
