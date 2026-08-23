"use client";
import { useRouter } from "next/navigation";

const DeleteButton = ({ id }: { id: number }) => {
  const router = useRouter();
  const handleDelete = async () => {
    const res = await fetch(`http://localhost:4000/articles/${id}`, {
      method: "DELETE",
    });
    router.push("/articles");
  };
  return <button onClick={handleDelete}>삭제하기</button>;
};

export default DeleteButton;
