"use client";

import Dropdown from "@/components/Dropdown/Dropdown";
import useAsyncAction from "@/hooks/useAsyncAction";
import { deleteArticle } from "@/lib/articleApi";
import { useRouter } from "next/navigation";

export default function ArticleActionMenu({ articleId }) {
  const router = useRouter();

  const { execute: executeDelete, isLoading: isDeleting } = useAsyncAction(
    "게시글을 삭제하지 못했습니다. 잠시 후 다시 시도해 주세요.",
  );

  const menuOptions = [
    { label: "수정하기", value: "edit" },
    { label: "삭제하기", value: "delete" },
  ];

  const handleDelete = async () => {
    if (isDeleting) return;

    const shouldDelete = window.confirm("게시글을 삭제하시겠습니까?");

    if (!shouldDelete) return;

    const result = await executeDelete(() => deleteArticle(articleId));

    if (!result.success) {
      window.alert(result.errorMessage);
      return;
    }

    router.push("/boards");
  };

  const handleMenuChange = (value) => {
    if (value === "edit") {
      router.push(`/boards/${articleId}/edit`);
    }

    if (value === "delete") {
      handleDelete();
    }
  };

  return (
    <Dropdown
      options={menuOptions}
      variant="menu"
      onChange={handleMenuChange}
    />
  );
}
