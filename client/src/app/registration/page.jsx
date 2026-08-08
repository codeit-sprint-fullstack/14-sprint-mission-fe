"use client";

import { createProduct } from "@/actions/productActions";
import Input from "@/components/form/Input";
import SubmitButton from "@/components/form/SubmitButton";
import Textarea from "@/components/form/Textarea";
import { useActionState, useState } from "react";
import TagInput from "./_components/TagInput";
import styles from "./page.module.css";

// useActionState를 위한 초기 설정
const initialState = {
  errors: {},
  message: '',
};

export default function Registration() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);

  const [state, formAction, isPending] = useActionState(createProduct, initialState)

  const isFormEmpty =
    name.trim() === "" || description.trim() === "" || price === "" || tags.length === 0;

  return (
    <form action={formAction} className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>상품 등록하기</h1>
        <SubmitButton disabled={isFormEmpty} />
      </div>
      <Input
        label="상품명"
        type="text"
        id="name"
        placeholder="상품명을 입력해주세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={state.errors.name}
      />
      <Textarea
        label="상품 소개"
        id="description"
        placeholder="상품 소개를 입력해주세요"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={state.errors.description}
      />
      <Input
        label="판매가격"
        type="number"
        id="price"
        placeholder="판매 가격을 입력해주세요"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        error={state.errors.price}
      />
      <TagInput
        label="태그"
        type="text"
        id="tags"
        tags={tags}
        setTags={setTags}
        placeholder="태그를 입력해주세요"
      />
    </form>
  );
}
