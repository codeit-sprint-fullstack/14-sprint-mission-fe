"use client";

import AlertModal from "@/components/AlertModal/AlertModal";
import ConfirmModal from "@/components/ConfirmModal/ConfirmModal";
import Dropdown from "@/components/Dropdown/Dropdown";
import { deleteProduct } from "@/lib/productApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const menuOptions = [
  { label: "수정하기", value: "edit" },
  { label: "삭제하기", value: "delete" },
];

export default function ProductActionMenu({ productId }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    mutate: removeProduct,
    isPending: isDeleting,
    isError: isDeleteError,
    error: deleteError,
    reset: resetDelete,
  } = useMutation({
    mutationFn: () => deleteProduct(productId),

    onSuccess: () => {
      setIsDeleteModalOpen(false);

      queryClient.removeQueries({
        queryKey: ["products", "detail", String(productId)],
        exact: true,
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
        refetchType: "none",
      });

      router.push("/items");
    },

    onError: () => {
      setIsDeleteModalOpen(false);
    },
  });

  const handleMenuChange = (value) => {
    if (value === "delete") {
      setIsDeleteModalOpen(true);
    }
  };

  const deleteErrorMessage = deleteError?.response?.data?.message;

  return (
    <>
      <Dropdown
        options={menuOptions}
        variant="menu"
        onChange={handleMenuChange}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        message="정말로 상품을 삭제하시겠어요?"
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={removeProduct}
        isPending={isDeleting}
      />

      <AlertModal
        isOpen={isDeleteError}
        message={
          typeof deleteErrorMessage === "string"
            ? deleteErrorMessage
            : "상품을 삭제하지 못했습니다. 잠시 후 다시 시도해 주세요."
        }
        onClose={resetDelete}
      />
    </>
  );
}
