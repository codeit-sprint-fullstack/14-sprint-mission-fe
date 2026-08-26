"use client";

import AlertModal from "@/components/AlertModal/AlertModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import { getProduct, updateProduct } from "@/lib/productApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProductEditForm from "../ProductEditForm/ProductEditForm";

export default function ProductEdit({ itemId }) {
  const { data: currentUser, isCheckingAuth } = useCurrentUser();
  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    mutate: editProduct,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
    reset: resetUpdate,
  } = useMutation({
    mutationFn: (productData) => updateProduct(itemId, productData),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      router.push(`/items/${itemId}`);
    },
  });

  const {
    data: product,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["products", "detail", itemId],
    queryFn: () => getProduct(itemId),
    enabled: Boolean(currentUser),
  });

  useEffect(() => {
    if (!isCheckingAuth && !currentUser) {
      router.replace("/signin");
    }
  }, [currentUser, isCheckingAuth, router]);

  useEffect(() => {
    if (currentUser && product && currentUser.id !== product.ownerId) {
      router.replace(`/items/${itemId}`);
    }
  }, [currentUser, product, itemId, router]);

  if (isCheckingAuth) {
    return <p>로그인 정보를 확인하는 중입니다...</p>;
  }

  if (!currentUser) return null;

  if (isPending) {
    return <p>상품을 불러오는 중입니다...</p>;
  }

  if (isError) {
    return <p>상품을 불러오지 못했습니다.</p>;
  }

  if (currentUser.id !== product.ownerId) return null;

  const updateErrorMessage = updateError?.response?.data?.message;

  return (
    <>
      <h1>상품 수정하기 - {product.name}</h1>
      <ProductEditForm
        product={product}
        onSubmit={editProduct}
        isUpdating={isUpdating}
      />

      <AlertModal
        isOpen={isUpdateError}
        message={
          typeof updateErrorMessage === "string"
            ? updateErrorMessage
            : "상품을 수정하지 못했습니다. 잠시 후 다시 시도해 주세요."
        }
        onClose={resetUpdate}
      />
    </>
  );
}
