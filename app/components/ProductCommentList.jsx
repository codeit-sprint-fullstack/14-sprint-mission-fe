"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import emptyImg from "@/public/img_reply_empty.png";
import styles from "./ProductCommentList.module.css";
import { getProductComments } from "../lib/api/comments";
import Image from "next/image";
import ProductCommentItems from "./ProductCommentItems";
import ProductCommentForm from "./ProductCommentForm";
import { getErrorMessage } from "../lib/error";

const LIMIT = 3;

export default function ProductCommentList({ id }) {
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", id],
    queryFn: ({ pageParam }) =>
      getProductComments({
        productId: id,
        limit: LIMIT,
        cursor: pageParam,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  if (isPending) return <p>로딩 중입니다...</p>;
  if (isError) return <p>에러가 발생했습니다.{getErrorMessage(error)}</p>;

  const comments = data.pages.flatMap((page) => page.list);

  return (
    <>
      <ProductCommentForm id={id} />
      <div className={styles.commentArea}>
        {comments.length > 0 ? (
          <>
            <ProductCommentItems productId={id} comments={comments} />
            {hasNextPage && (
              <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                더보기
              </button>
            )}
          </>
        ) : (
          <div className={styles.emptyComment}>
            <figure>
              <Image src={emptyImg} alt="" width={140} />
            </figure>
            <p>
              아직 댓글이 없어요. <br />
              지금 댓글을 달아보세요!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
