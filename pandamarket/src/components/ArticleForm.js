import { useState } from 'react';

export default function ArticleForm({ initialTitle = '', initialContent = '', onSubmit, submitLabel }) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const isValid = title.trim() !== '' && content.trim() !== '';

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ title, content });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>제목</label>
        <input
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label>내용</label>
        <textarea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <button type="submit" disabled={!isValid}>
        {submitLabel}
      </button>
    </form>
  );
}