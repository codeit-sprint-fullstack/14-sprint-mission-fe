"use client";

import { useState } from "react";
import { createArticle, updateArticle } from "../actions.js";
import styles from "./PostForm.module.css";

export default function PostForm({ post }) {
  const { title, content } = post ?? {};
  const [form, setForm] = useState({
    title: title ?? "",
    content: content ?? "",
  });
  const action = post ? updateArticle.bind(null, post.id) : createArticle;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }
  const isValid = form.title.trim() !== "" && form.content.trim() !== "";

  return (
    <>
      <form action={action} className={styles.form}>
        <div className={styles.head}>
          <h2>게시글 쓰기</h2>
          <button type="submit" className="btStyle" disabled={!isValid}>
            등록
          </button>
        </div>
        <div className={styles.content}>
          <div>
            <label htmlFor="title">제목</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="제목을 입력해주세요"
              onChange={handleChange}
              value={form.title}
              maxLength={40}
              required
            />
          </div>
          <div>
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              name="content"
              placeholder="내용을 입력해주세요"
              onChange={handleChange}
              value={form.content}
              required
            />
          </div>
        </div>
      </form>
    </>
  );
}
