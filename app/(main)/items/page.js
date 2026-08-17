"use client";

import { getProducts } from "@/app/lib/api/products";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function Items() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const pageSize = searchParams.get("pageSize") ?? "10";
  const orderBy = searchParams.get("orderBy") ?? "recent";
  const keyword = searchParams.get("keyword") ?? "";
  // const params = new URLSearchParams(searchParams);
  const { data, isPending } = useQuery({
    queryKey: ["items", page, pageSize, orderBy, keyword],
    queryFn: () =>
      getProducts({
        page,
        pageSize,
        orderBy,
        keyword,
      }),
  });
  if (isPending) {
    return null;
  }
  const { list, totalCount } = data;
  return (
    <>
      <ul>
        {list?.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      {totalCount}
    </>
  );
}
