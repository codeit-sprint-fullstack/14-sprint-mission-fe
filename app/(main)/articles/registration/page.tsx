"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";

const RegistrationPage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();
    const handleSubmit = async() => {
        const res = await fetch("http://localhost:4000/articles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content }),
        })
        const newArticle = await res.json();
        router.push(`/articles/${newArticle.id}`);
    }

    return (
        <div>
        <h2>게시물쓰기</h2>
        <button disabled={!title || !content} onClick={handleSubmit}>등록</button>
        <h2>제목</h2>
        <input value={title} onChange={(e) =>setTitle(e.target.value)} placeholder="제목을 입력해주세요"></input>
        <h2>*내용</h2>
        <input value={content} onChange={(e) =>setContent(e.target.value)}  placeholder="내용을 입력해주세요"></input>
        </div>
    )
}


export default RegistrationPage;