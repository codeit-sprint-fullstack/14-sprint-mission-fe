"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchProductDetail } from "../lib/api/products";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./PostForm.module.css";

export default function ProductForm({ product, id }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { images, tags, price, description, name } = product ?? {};

  //tag input value 분리, form은 Req body형태를 유지
  //이미지는 등록폼은 없고, 서버에만 존재
  const [tagInput, setTagInput] = useState("");
  const [form, setForm] = useState({
    images: images ?? [],
    name: name ?? "",
    description: description ?? "",
    price: price ?? "",
    tags: tags ?? [],
  });

  const { mutate } = useMutation({
    mutationFn: (formValues) => patchProductDetail({ id, ...formValues }),
    onSuccess: (updated) => {
      queryClient.setQueryData(["item", id], updated);
      queryClient.invalidateQueries({ queryKey: ["items"] });
      router.push(`/items/${id}`);
    },
  });

  const canSubmit =
    form.name.trim() !== "" &&
    form.description.trim() !== "" &&
    String(form.price).trim() !== "";

  function handleChange(e) {
    const { name, value } = e.target;
    const cleanValue = name === "price" ? value.replace(/[^0-9]/g, "") : value;
    setForm({ ...form, [name]: cleanValue });
  }

  function handleTag(e) {
    const newValue = e.target.value;

    if (newValue.includes(",")) {
      const newTag = newValue.slice(0, newValue.indexOf(",")).trim();

      if (newTag && !form.tags.includes(newTag)) {
        setForm({ ...form, tags: [...form.tags, newTag] });
      }
      setTagInput("");
      return;
    }

    setTagInput(newValue);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      const newTag = tagInput.trim();

      if (newTag && !form.tags.includes(newTag)) {
        setForm({ ...form, tags: [...form.tags, newTag] });
      }
      setTagInput("");
    }
  }

  function removeTag(tagToRemove) {
    const removedTags = form.tags.filter((tag) => tag !== tagToRemove);
    setForm({ ...form, tags: removedTags });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    mutate({ ...form, price: Number(form.price) });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.head}>
          <h2>상품 수정하기</h2>
          <button type="submit" className="btStyle" disabled={!canSubmit}>
            등록
          </button>
        </div>
        <div className={styles.content}>
          <div>
            <label htmlFor="name">상품명</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="상품명을 입력해주세요"
              onChange={handleChange}
              value={form.name}
              maxLength={40}
              required
            />
          </div>
          <div>
            <label htmlFor="description">상품 소개</label>
            <textarea
              id="description"
              name="description"
              placeholder="상품 소개를 입력해주세요"
              onChange={handleChange}
              value={form.description}
              required
            />
          </div>
          <label htmlFor="price">판매가격</label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="판매 가격을 입력해주세요"
            onChange={handleChange}
            value={form.price}
            required
          />
          <label htmlFor="tags">태그</label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="태그를 입력해주세요. 엔터나 쉼표로 구분할 수 있습니다."
            onChange={handleTag}
            onKeyDown={handleKeyDown}
            value={tagInput}
          />
          {form.tags?.map((tag) => (
            <p key={tag}>
              #{tag}
              <button type="button" onClick={() => removeTag(tag)}>
                X
              </button>
            </p>
          ))}
        </div>
      </form>
    </>
  );
}
