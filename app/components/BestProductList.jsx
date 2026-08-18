"use client";

import { getProducts } from "@/app/lib/api/products";
import { useQuery } from "@tanstack/react-query";
import styles from "./BestProductList.module.css";
import Item from "@/app/components/Item";

export default function BestProductList() {
  const BestProductQuery = {
    page: "1",
    pageSize: "4",
    orderBy: "favorite",
    keyword: "",
  };
  const { data, isPending } = useQuery({
    queryKey: ["items", BestProductQuery],
    queryFn: () => getProducts(BestProductQuery),
    throwOnError: true,
  });
  if (isPending) {
    return null;
  }
  const { list } = data;

  return (
    <>
      <ul className={styles.grid}>
        {list.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
}
