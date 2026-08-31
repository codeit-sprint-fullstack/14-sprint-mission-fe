"use client";

import { getProducts } from "@/app/lib/api/products";
import { useQuery } from "@tanstack/react-query";
import styles from "./BestProductList.module.css";
import Item from "@/app/components/Item";
import { productKeys } from "@/app/lib/queryKeys";

export default function BestProductList() {
  const BestProductQuery = {
    page: "1",
    pageSize: "4",
    orderBy: "favorite",
    keyword: "",
  };
  const { data, isPending } = useQuery({
    queryKey: productKeys.list(BestProductQuery),
    queryFn: () => getProducts(BestProductQuery),
    throwOnError: true,
  });
  if (isPending) {
    return <p>로딩중입니다...</p>;
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
