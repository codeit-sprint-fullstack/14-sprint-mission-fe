import Link from "next/link";
import SearchBar from "@/app/components/SearchBar";
import FilterList from "@/app/components/FilterList";
import BestPosts from "./BestPosts";
import defaultImg from "@/public/default_image.png";
import profileIc from "@/public/icon_profile.png";
import styles from "./Posts.module.css";
import Image from "next/image";

export default async function postListPage({ searchParams }) {
  const { q, orderBy } = await searchParams;
  const params = new URLSearchParams();
  if (q) params.set("keyword", q);
  if (orderBy) params.set("orderBy", orderBy);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles?${params.toString()}`,
    { cache: "no-store" },
  );

  if (!res.ok) throw new Error("결과를 불러오는데 실패했습니다.");

  const { list: postList } = await res.json();

  return (
    <div className={styles.posts}>
      <BestPosts className={styles.bestPosts} />
      <section className={styles.allPosts}>
        <div className={styles.header}>
          <h2>게시글</h2>
          <Link href="/posts/new">
            <button type="text" className="btStyle">
              글쓰기
            </button>
          </Link>
        </div>
        <div className={styles.filter}>
          <SearchBar />
          <FilterList />
        </div>
        <ul className={styles.lists}>
          {postList.map((post) => (
            <li key={post.id}>
              <article>
                <Link href={`/posts/${post.id}`}>
                  <div>
                    <h3>{post.title}</h3>
                    <figure>
                      <Image
                        src={post.img ?? defaultImg}
                        alt={post.title}
                        fill
                        sizes="100%"
                        style={{ objectFit: "cover" }}
                      />
                    </figure>
                  </div>
                </Link>
                <footer>
                  <span>
                    <Image src={profileIc} alt="" width={24} />
                    말랑판다
                  </span>
                  <time dateTime={post.createdAt}>
                    {post.createdAt.slice(0, 10).replaceAll("-", ". ")}
                  </time>
                  <span>♡ 9999+</span>
                </footer>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
