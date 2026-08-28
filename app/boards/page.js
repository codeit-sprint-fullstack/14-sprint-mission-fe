import Link from "next/link";
import Image from "next/image";
import SearchForm from "./SearchForm";
import SortDropdown from "./SortDropdown";
import { DEFAULT_BOARD_IMAGE, DEFAULT_PROFILE_IMAGE } from "@/constant/board";
import styles from "./boards.module.css";

async function getBoardList({ keyword, orderBy }) {
  const params = new URLSearchParams({
    cursor: "0",
    take: "10",
    orderBy: orderBy || "recent",
  });
  if (keyword) params.set("keyword", keyword);

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles?${params.toString()}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `게시글 목록 조회 실패 (status: ${res.status}, url: ${url})\n${body}`,
    );
  }
  return res.json();
}

async function getBestBoardList() {
  const params = new URLSearchParams({
    cursor: "0",
    take: "3",
    orderBy: "recent",
  });

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles?${params.toString()}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `베스트 게시글 조회 실패 (status: ${res.status}, url: ${url})\n${body}`,
    );
  }
  return res.json();
}

export default async function BoardsPage({ searchParams }) {
  const { keyword, orderBy } = await searchParams;

  const [boardData, bestData] = await Promise.all([
    getBoardList({ keyword, orderBy }),
    getBestBoardList(),
  ]);

  const boards = boardData.list ?? [];
  const bestBoards = bestData.list ?? [];

  return (
    <div className={`wrapper ${styles.page}`}>
      <section>
        <h2 className={styles.sectionTitle}>베스트 게시글</h2>
        <ul className={styles.bestList}>
          {bestBoards.map((board) => (
            <li key={board.id}>
              <Link href={`/boards/${board.id}`} className={styles.bestCard}>
                <span className={styles.bestBadge}>
                  <Image
                    src="/images/icons/ic_medal.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                  Best
                </span>
                <div className={styles.bestContent}>
                  <div className={styles.bestBody}>
                    <p className={styles.bestTitle}>{board.title}</p>
                    <Image
                      src={DEFAULT_BOARD_IMAGE}
                      alt=""
                      width={72}
                      height={72}
                      className={styles.bestThumbnail}
                    />
                  </div>
                  <div className={styles.bestmeta}>
                    <div className={styles.bestmetaLeft}>
                      <Image
                        src={DEFAULT_PROFILE_IMAGE}
                        alt=""
                        width={24}
                        height={24}
                        className={styles.bestprofileImage}
                      />
                      <span className={styles.bestauthor}>
                        {board.writer?.nickname ?? "익명"}
                      </span>
                      <span className={styles.bestlikeCount}>
                        <Image
                          src="/images/icons/ic_empty_heart.svg"
                          alt=""
                          width={16}
                          height={16}
                        />
                        {(board.likeCount ?? 0).toLocaleString()}
                      </span>
                    </div>
                    <span className={styles.bestdate}>
                      {new Date(board.createdAt).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className={styles.listHeader}>
          <h2 className={styles.sectionTitle}>게시글</h2>
          <Link href="/boards/add" className={`button ${styles.writeButton}`}>
            글쓰기
          </Link>
        </div>

        <div className={styles.boardContainer}>
          <div className={styles.toolbar}>
            <SearchForm />
            <SortDropdown />
          </div>

          <ul className={styles.boardList}>
            {boards.map((board) => (
              <li key={board.id}>
                <Link href={`/boards/${board.id}`} className={styles.boardItem}>
                  <div className={styles.boardBody}>
                    <p className={styles.title}>{board.title}</p>
                    <Image
                      src={DEFAULT_BOARD_IMAGE}
                      alt=""
                      width={72}
                      height={72}
                      className={styles.thumbnail}
                    />
                  </div>
                  <div className={styles.meta}>
                    <Image
                      src={DEFAULT_PROFILE_IMAGE}
                      alt=""
                      width={24}
                      height={24}
                      className={styles.profileImage}
                    />
                    <span className={styles.author}>
                      {board.writer?.nickname ?? "익명"}
                    </span>
                    <span className={styles.date}>
                      {new Date(board.createdAt).toLocaleDateString("ko-KR")}
                    </span>
                    <span className={styles.likeCount}>
                      <Image
                        src="/images/icons/ic_empty_heart.svg"
                        alt=""
                        width={16}
                        height={16}
                      />
                      {(board.likeCount ?? 0).toLocaleString()}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}