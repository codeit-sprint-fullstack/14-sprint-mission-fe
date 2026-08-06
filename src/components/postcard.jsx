import Link from "next/link";
import style from "./postcard.module.css";

function Postcard({ id, title, author, likes, date }) {
  return (
    <>
    <Link href={`/notice/${id}`}>
      <div className={style.postcard_wrap}>
        <div className={style.frame}>
          <div className={style.content_wrap}>
            <span>{title}</span>
            <img src="/assets/default.jpg" alt="default"/>
          </div>
          <div className={style.explane_wrap}>
            <div className={style.namelike_wrap}>
              <img src="/assets/ic_profile.svg" alt="profile" />
              <span id={style.author}>{author}</span>
              <span id={style.date}>{date}</span>
            </div>
            <div className={style.like_wrap}>
                <img src="/assets/ic_heart.svg" alt="heart"/>
                <span>{likes}</span>
              </div>
          </div>
        </div>
      </div>
    </Link>

      <svg width="100%" height="1">
        <line x1="0" y1="0" x2="100%" y2="0" stroke="#E5E7EB" strokeWidth="1" />
      </svg>
    </>
  );
}

export default Postcard;