"use client";

import { getProducts } from "@/app/lib/api/products";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import EachItem from "@/app/components/Item";
import styles from "./AllProductList.module.css";
import { parseEnum, parseNumberParam } from "../lib/validation";
import Pagination from "./Pagination";
import { productKeys } from "../lib/queryKeys";

export default function AllProductList() {
  const searchParams = useSearchParams();
  const page = parseNumberParam(searchParams.get("page"), 1);
  const pageSize = parseNumberParam(searchParams.get("pageSize"), 10);
  const orderBy = parseEnum(searchParams.get("orderBy"), {
    allowed: ["recent", "favorite"],
    defaultValue: "recent",
  });
  const keyword = searchParams.get("keyword") ?? "";

  const { data, isPending } = useQuery({
    queryKey: productKeys.list({ page, pageSize, orderBy, keyword }),
    queryFn: () =>
      getProducts({
        page,
        pageSize,
        orderBy,
        keyword,
      }),
    throwOnError: true,
  });

  if (isPending) {
    return <p>로딩중입니다...</p>;
  }

  return data.list.length === 0 ? (
    <p>상품이 없습니다.</p>
  ) : (
    <>
      <ul className={styles.grid}>
        {data.list.map((item) => (
          <EachItem key={item.id} item={item} />
        ))}
      </ul>
      <Pagination totalCount={data.totalCount} />
    </>
  );
}
