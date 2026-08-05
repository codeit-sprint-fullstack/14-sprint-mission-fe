import style from "./bestpostcard.module.css";

function Bestpostcard({ title, author, likes, date }) {
  return (
    <div className={style.bestpostcard_wrap}>
      <div className={style.frame}>
        <div className={style.bestbadge}>
          <img src="/assets/ic_medal.svg" alt="medal"/>
          <span>Best</span>
        </div>
        <div className={style.content_wrap}>
          <span>{title}</span>
          <img src="/assets/default.jpg" alt="default"/>
        </div>
        <div className={style.explane_wrap}>
          <div className={style.namelike_wrap}>
            <span>{author}</span>
            <div className={style.like_wrap}>
              <img src="/assets/ic_heart.svg" alt="heart"/>
              <span>{likes}</span>
            </div>
          </div>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}

export default Bestpostcard;