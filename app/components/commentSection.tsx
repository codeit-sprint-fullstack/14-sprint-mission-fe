"use client";
import { useState } from "react";

type Comment = {
  id: number;
  content: string;
  createdAt: string;
};

const CommentSection = ({
  articleId,
  initialComments,
}: {
  articleId: number;
  initialComments: Comment[];
}) => {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState(initialComments);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const handleSubmit = async () => {
    console.log("articleId:", articleId);
    const res = await fetch("http://localhost:4000/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, articleId }),
    });
    const newComment = await res.json();
    setComments([...comments, newComment]);
    setContent("");
  };

  const handleDelete = async (commentId: number) => {
    await fetch(`http://localhost:4000/comments/${commentId}`, {
      method: "DELETE",
    });
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  const handleUpdate = async (commentId: number) => {
    const res = await fetch(`http://localhost:4000/comments/${commentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: editContent }),
    });
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

export default CommentSection;
