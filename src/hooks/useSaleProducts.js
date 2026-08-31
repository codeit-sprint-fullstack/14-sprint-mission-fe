import { useQuery } from "@tanstack/react-query";

import pandaMarketApi from "@/lib/api";

// 판매 중인 상품 목록 조회
export default function useSaleProducts({
  page,
  pageSize,
  orderBy,
  keyword,
}) {
  const {
    data,
    isPending,
    error,
  } = useQuery({
    queryKey: [
      "products",
      page,
      pageSize,
      orderBy,
      keyword,
    ],

    queryFn: async () => {
      const response = await pandaMarketApi.get(
        "/products",
        {
          params: {
            page,
            pageSize,
            orderBy,
            keyword: keyword || undefined,
          },
        },
      );

      return response.data;
    },
  });

  return {
    saleProducts: data?.list ?? [],
    totalCount: data?.totalCount ?? 0,
    isSaleLoading: isPending,
    saleError: error
      ? "상품 목록을 불러오지 못했습니다."
      : null,
  };
}