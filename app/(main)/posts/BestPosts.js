import Link from "next/link";
import Image from "next/image";
import defaultImg from "@/public/default_image.png";
import badgeIc from "@/public/icon_badge.png";

export default async function BestPosts({ className }) {
  const res = await fetch(
    `${process.env.API_URL}/articles?limit=3&orderBy=recent`,
  );
  const bestPostList = await res.json();
  return (
    <section className={className}>
      <h2>베스트 게시글</h2>
      <div>
        <ul>
          {bestPostList.map((post) => (
            <li key={post.id}>
              <article>
                <span>
                  <Image src={badgeIc} alt="" width={16} />
                  Best
                </span>
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
                  <span>말랑판다</span>
                  <span>♡ 9999+</span>
                  <time dateTime={post.createdAt}>
                    {post.createdAt.slice(0, 10).replaceAll("-", ". ")}
                  </time>
                </footer>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
