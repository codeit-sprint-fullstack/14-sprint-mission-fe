import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Gnb from "@/components/gnb";
import Footer from "@/components/Footer";
import style from "@/styles/items/[id].module.css";
import api from "@/utils/api";
import { formatDate } from "@/utils/time";

export default function ItemDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [item, setItem] = useState(null);

    useEffect(() => {
        if (id) {
            api.get(`/items/${id}`)
                .then((res) => setItem(res.data))
                .catch((err) => {
                    console.error("상품 상세 조회 에러:", err);
                });
        }
    }, [id]);

    if (!item) {
        return <p>로딩 중...</p>;
    }


    return (
        <>
            <Gnb />
            <div className={style.wrap}>
                <div className={style.frame}>
                    <div className={style.content_wrap}>
                        <div className={style.item_images}>
                            {item.images.map((img, idx) => (
                                <img key={idx} src={img} alt={item.name} />
                            ))}
                        </div>
                        <div className={style.info}>
                            <div className={style.info_head}>
                                <div className={style.head_top}>
                                    <div className={style.withkebob}>
                                        <div className={style.name_price}>
                                            <h1>{item.name}</h1>
                                            <p>{item.price}원</p>
                                        </div>
                                        <img
                                            src="/assets/ic_kebab.svg"
                                            alt="kebob"
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            style={{ cursor: "pointer" }}
                                        />
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="1" viewBox="0 0 690 1" fill="none">
                                        <path d="M0 0.5H690" stroke="#E5E7EB" />
                                    </svg>
                                </div>
                                <div className={style.head_body}>
                                    <div className={style.discripton}>
                                        <span>상품 소개</span>
                                        <p>{item.description}</p>
                                    </div>
                                    <div className={style.taginfo}>
                                        <span>상품 태그</span>
                                        <div className={style.tags}>
                                            {item.tags.map((tag, idx) => (
                                                <span key={idx}>#{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={style.info_bottom}>
                                <div className={style.userprofile}>
                                    <img src="/assets/ic_profile.svg" alt="profile" />
                                    <div className={style.user_createat}>
                                        <span>{item.ownerNickname}</span>
                                        <p>{formatDate(item.createdAt)}</p>
                                    </div>
                                </div>
                                <div style={style.likearea}>
                                    <div className={style.line_button}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1" height="34" viewBox="0 0 1 34" fill="none">
                                            <path d="M0.5 0V34" stroke="#E5E7EB" />
                                        </svg>
                                        <div className={style.likebutton}>
                                            <div className={style.heart_likes}>
                                                <img src="/assets/ic_heart.svg" alt="heart" />
                                                <span>{item.favoriteCount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => router.push("/items")}>목록으로 돌아가기</button>
                </div>
            </div>
            <Footer />
        </>
    );
}
