"use client";

import { useQuery } from "@tanstack/react-query";
import ProductForm from "./ProductForm";
import { getProductDetail } from "../lib/api/products";
import { getErrorMessage } from "../lib/error";

export default function ProductEdit({ id }) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["item", id],
    queryFn: () => getProductDetail(id),
  });

  if (isPending) return <p>로딩 중입니다...</p>;
  if (isError) return <p>에러가 발생했습니다.{getErrorMessage(error)}</p>;

  return <ProductForm product={data} id={id} />;
}
