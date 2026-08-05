'use client';

import { useState } from 'react';

function TagInput({ tags, onAdd, onRemove }) {
  const [value, setValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && value.trim() !== '') {
      e.preventDefault();
      onAdd(value.trim());
      setValue('');
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="태그를 입력해주세요"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="tagList">
        {tags.map((tag, index) => (
          <span className="tag" key={index}>
            #{tag}
            <button onClick={() => onRemove(index)}>X</button>
          </span>
        ))}
      </div>
    </>
  );
}

export default TagInput;
