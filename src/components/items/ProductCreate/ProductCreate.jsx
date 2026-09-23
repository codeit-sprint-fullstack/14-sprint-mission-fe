"use client";

import AlertModal from "@/components/AlertModal/AlertModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import { getApiErrorMessage } from "@/lib/apiError";
import { createProduct } from "@/lib/productApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProductForm from "../ProductForm/ProductForm";

export default function ProductCreate() {
  const {
    data: currentUser,
    isCheckingAuth,
    hasAuthError,
    error: authError,
  } = useCurrentUser();
  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    mutate: addProduct,
    isPending: isCreating,
    isError: isCreateError,
    error: createError,
    reset: resetCreate,
  } = useMutation({
    mutationFn: createProduct,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      router.push("/items");
    },
  });

  useEffect(() => {
    if (!isCheckingAuth && !hasAuthError && !currentUser) {
      router.replace("/signin");
    }
  }, [currentUser, isCheckingAuth, hasAuthError, router]);

  if (isCheckingAuth) {
    return <p>로그인 정보를 확인하는 중입니다...</p>;
  }

  if (hasAuthError) {
    const authErrorMessage = getApiErrorMessage(
      authError,
      "로그인 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
    );

    return <p>{authErrorMessage}</p>;
  }

  if (!currentUser) {
    return null;
  }

  const createErrorMessage = getApiErrorMessage(
    createError,
    "상품을 등록하지 못했습니다. 잠시 후 다시 시도해 주세요.",
  );

  return (
    <>
      <h1>상품 등록하기</h1>

      <ProductForm
        onSubmit={addProduct}
        isSubmitting={isCreating}
        submitLabel="등록하기"
      />

      <AlertModal
        isOpen={isCreateError}
        message={createErrorMessage}
        onClose={resetCreate}
      />
    </>
  );
}
