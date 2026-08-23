import Link from "next/link";
import { SearchProduct } from "./searchProduct";

type SearchParams = {
  page: string;
  search?: string;
};

const ItemPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { page = "1" } = await searchParams;
  const limit = 10;
  const res = await fetch(
    `https://panda-market-api.vercel.app/products?page=${page}&pageSize=${limit}`,
  );
  const { list, totalCount } = await res.json();
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div>
      <h4>베스트상품</h4>

      <h4>판매 중인 상품</h4>
      <SearchProduct initialProducts={list} />
      <div style={{ display: "flex", gap: "8px" }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <Link key={pageNum} href={`/items?page=${pageNum}`}>
            {pageNum}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ItemPage;
