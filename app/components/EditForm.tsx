"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

const EditForm = ({ id, initialTitle, initialContent }: { id: string; initialTitle: string; initialContent: string }) => {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const router = useRouter();

    const handleSubmit = async () => {
        const res = await fetch(`http://localhost:4000/articles/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content }),
        });
        router.push(`/articles/${id}`);
    };

    return (
        <div>
            <h2>게시물 수정하기</h2>
            <button disabled={!title || !content} onClick={handleSubmit}>수정</button>
            <h2>제목</h2>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력해주세요" />
            <h2>*내용</h2>
            <input value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 입력해주세요" />
        </div>
    );
};

export default EditForm;