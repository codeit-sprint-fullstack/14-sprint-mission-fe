"use client";

import { useState } from "react";

export default function ProductEditForm({ product, onSubmit, isUpdating }) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(String(product.price));

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      images: product.images,
      tags: product.tags,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        상품명
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label>
        상품 소개
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <label>
        가격
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>

      <button type="submit" disabled={isUpdating}>
        {isUpdating ? "수정 중..." : "수정하기"}
      </button>
    </form>
  );
}
