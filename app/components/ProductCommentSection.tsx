"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/components/authProvider";

type Comment = {
  id: number;
  content: string;
  createdAt: string;
};

const ProductCommentSection = ({ productId }: { productId: number }) => {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const { accessToken } = useAuth();
  const commentLimit = 10;
  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(
        `https://panda-market-api.vercel.app/products/${productId}/comments?limit=${commentLimit}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const data = await res.json();
      console.log("댓글응답", data);
      setComments(data.list);
    };
    if (accessToken) {
      fetchComments();
    }
  }, [productId, accessToken]);

  const handleSubmit = async () => {
    console.log("productId:", productId);
    const res = await fetch(
      `https://panda-market-api.vercel.app/products/${productId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ content }),
      },
    );
    const newComment = await res.json();
    setComments([...comments, newComment]);
    setContent("");
  };

  const handleDelete = async (commentId: number) => {
    await fetch(`https://panda-market-api.vercel.app/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  const handleUpdate = async (commentId: number) => {
    const res = await fetch(
      `https://panda-market-api.vercel.app/comments/${commentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },

        body: JSON.stringify({ content: editContent }),
      },
    );
    const updated = await res.json();
    setComments(
      comments.map((comment) => (comment.id === commentId ? updated : comment)),
    );
    setEditingId(null);
  };

  return (
    <div>
      <p>댓글달기</p>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력해주세요"
      />
      <button disabled={!content} onClick={handleSubmit}>
        등록
      </button>
      {comments.map((comment) => (
        <div key={comment.id}>
          {editingId === comment.id ? (
            <>
              <input
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button onClick={() => handleUpdate(comment.id)}>저장</button>
            </>
          ) : (
            <>
              <p>{comment.content}</p>
              <button
                onClick={() =>
                  setOpenMenuId(openMenuId === comment.id ? null : comment.id)
                }
              >
                ⋮
              </button>
              {openMenuId === comment.id && (
                <div>
                  <button
                    onClick={() => {
                      setEditingId(comment.id);
                      setEditContent(comment.content);
                      setOpenMenuId(null);
                    }}
                  >
                    수정하기
                  </button>
                  <button onClick={() => handleDelete(comment.id)}>
                    삭제하기
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductCommentSection;
