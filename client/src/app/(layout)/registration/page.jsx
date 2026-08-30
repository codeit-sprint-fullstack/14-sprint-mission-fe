"use client";

import Input from "@/components/form/Input";
import SubmitButton from "@/components/form/SubmitButton";
import TagInput from "@/components/form/TagInput";
import Textarea from "@/components/form/Textarea";
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateProduct } from "@/queries/products";

export default function Registration() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const createProductMutation = useCreateProduct();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);

  const isFormEmpty =
    name.trim() === "" ||
    description.trim() === "" ||
    price === "" ||
    tags.length === 0;

  // 상품 생성하기
  function handleCreateProduct(e) {
    e.preventDafualt();

    const data = {
      name,
      description,
      price: Number(price),
      tags,
      image: [],
    };

    createProductMutation.mutate(data, {
      onSuccess: (product) => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        router.push(`/products/${product.id}`);
      },
      onError: (error) => {
        console.error('상품 등록 실패: ', error.response?.data?.message);
        alert('상품 등록에 실패했습니다');
      }
    });
  }

  return (
    <form 
      onSubmit={handleCreateProduct} 
      className={styles.wrapper}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>상품 등록하기</h1>
        <SubmitButton disabled={isFormEmpty || createProductMutation.isPending} />
      </div>
      <Input
        label="상품명"
        type="text"
        id="name"
        placeholder="상품명을 입력해주세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Textarea
        label="상품 소개"
        id="description"
        placeholder="상품 소개를 입력해주세요"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        label="판매가격"
        type="number"
        id="price"
        placeholder="판매 가격을 입력해주세요"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
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
