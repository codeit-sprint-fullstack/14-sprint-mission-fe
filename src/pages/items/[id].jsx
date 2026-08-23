import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Gnb from "@/components/gnb";
import Footer from "@/components/Footer";
import style from "@/styles/items/[id].module.css";
import api from "@/utils/api";
import { formatDate } from "@/utils/time";
import Commentcard from "@/components/commentcard";
import Link from "next/link";
import { toast } from "react-toastify";
import WarningModal from "@/components/warningmodal";

export default function ItemDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [item, setItem] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [liked, setLiked] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const currentComments = Array.isArray(comments)
        ? comments.slice((currentPage - 1) * 10, currentPage * 10)
        : [];

    // 삭제 버튼 클릭 시 모달 열기
    const handleDeleteClick = () => {
        setIsModalOpen(true);
    };

    // 모달 닫기
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // 댓글 등록
    const handleRegister = async () => {
        try {
            const response = await api.post(`/items/${id}/comment`, {
                content: comment, // ✅ content만 전달
            });

            const newComment = response.data;
            // 등록 후 목록 갱신
            await fetchComments();
            setComment(""); // 입력창 초기화
        } catch (error) {
            console.error("댓글 등록 에러:", error);
        }
    };

    // 댓글 조회 함수
    const fetchComments = async () => {
        try {
            const res = await api.get(`/items/${id}/comment?limit=10`);
            const data = res.data;

            // ✅ 응답 구조에 맞게 list만 저장
            setComments(data.list || []);
            setTotalPages(Math.ceil((data.list?.length || 0) / 10));
        } catch (err) {
            console.error("댓글 조회 에러:", err);
        }
    };

    const handleLike = async () => {
        try {
            if (!liked) {
                // 좋아요 등록
                const res = await api.post(`/items/${id}/favorite`);
                const updated = res.data;
                setItem((prev) => ({
                    ...prev,
                    favoriteCount: updated.favoriteCount ?? prev.favoriteCount + 1,
                }));
                setLiked(true);
            } else {
                // 좋아요 취소
                const res = await api.delete(`/items/${id}/favorite`);
                const updated = res.data;
                setItem((prev) => ({
                    ...prev,
                    favoriteCount: updated.favoriteCount ?? prev.favoriteCount - 1,
                }));
                setLiked(false);
            }
        } catch (err) {
            console.error("좋아요 토글 에러:", err);
        }
    };

    // 수정 권한 확인 후 이동
    const handleEdit = async () => {
        try {
            const res = await api.patch(`/items/${id}`, {}); // body는 빈 객체로 권한 체크만
            if (res.status === 403) {
                toast("본인이 작성한 글만 수정할 수 있습니다.");
            } else if (res.status === 200) {
                router.push(`/items/${id}/edit`);
            } else {
                toast("수정 권한 확인 중 오류");
            }
        } catch (error) {
            console.error("수정 권한 확인 에러:", error);
            alert("수정 권한 확인 중 문제가 발생했습니다.");
        }
    };

    // 삭제 처리
    const handleDelete = async () => {
        try {
            const res = await api.delete(`/items/${id}`);
            if (res.status === 200) {
                toast("게시글이 삭제되었습니다.");
                router.push("/items");
            } else if (res.status === 401) {
                toast("로그인이 필요합니다.");
            } else if (res.status === 403) {
                toast("본인이 작성한 글만 삭제할 수 있습니다.");
            } else {
                toast("삭제 중 오류");
            }
        } catch (error) {
            console.error("삭제 에러:", error);
            alert("삭제 중 문제가 발생했습니다.");
        }
    };

    const handlePermit = () => {
        handleDelete();      // 실제 삭제 로직
        handleCloseModal();  // 모달 닫기
    };


    // 페이지 로드 시 상품 + 댓글 조회
    useEffect(() => {
        if (id) {
            api.get(`/items/${id}`)
                .then((res) => setItem(res.data))
                .catch((err) => {
                    console.error("상품 상세 조회 에러:", err);
                });

            fetchComments();
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
                    <div className={style.content_frame}>
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
                                            <div className={style.kebob_dropdown}>
                                                <img
                                                    src="/assets/ic_kebab.svg"
                                                    alt="kebob"
                                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                    style={{ cursor: "pointer" }}
                                                />
                                                {isDropdownOpen && (
                                                    <ul className={style.dropdown}>
                                                        <li onClick={handleEdit}>수정</li>
                                                        <li onClick={handleDeleteClick}>삭제</li>
                                                    </ul>
                                                )}
                                                {isModalOpen && (
                                                    <WarningModal
                                                        message="정말로 상품을 삭제하시겠어요?"
                                                        onPermit={handlePermit}
                                                        onClose={handleCloseModal}
                                                    />
                                                )}
                                            </div>
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
                                            <div className={style.taglist}>
                                                {item.tags.map((tag, idx) => (
                                                    <div key={idx} className={style.tags}>
                                                        <span>#{tag}</span>
                                                    </div>
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
                                            <button className={style.likebutton}
                                                onClick={handleLike}
                                            >
                                                <div className={style.heart_likes}>
                                                    <img src={liked ? "/assets/ic_heart_on.svg" : "/assets/ic_heart.svg"} alt="heart" />
                                                    <span>{item.favoriteCount}</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="1" viewBox="0 0 100 1" preserveAspectRatio="none">
                            <path d="M0 0.5H100" stroke="#E5E7EB" />
                        </svg>


                        <div className={style.comment_wrap}>
                            <div className={style.comment_input_wrap}>
                                <div className={style.comment_input}>
                                    <span>문의하기</span>
                                    <form>
                                        <textarea
                                            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                    </form>
                                </div>
                                <button
                                    className={`${style.registerButton} ${comment !== "" ? style.active : ""}`}
                                    disabled={comment === ""}
                                    onClick={handleRegister}
                                >
                                    <span>등록</span>
                                </button>

                            </div>
                            {comments.length > 0 ? (
                                <div className={style.comment_list_wrap}>
                                    {currentComments.map((c) => (
                                        <Commentcard
                                            key={c.id}
                                            id={c.id}
                                            type="items"
                                            title={c.content}
                                            author={c.writer.nickname}
                                            date={c.createdAt}
                                            parentId={id}
                                            onUpdated={(commentId, newContent) => {
                                                setComments((prev) =>
                                                    prev.map((comment) =>
                                                        comment.id === commentId ? { ...comment, content: newContent } : comment
                                                    )
                                                );
                                            }}
                                            onDeleted={(commentId) => {
                                                fetchComments();
                                            }}
                                        />
                                    ))}

                                </div>
                            ) : (
                                <div className={style.empty_comment}>
                                    <img src="/assets/img_inquiry_empty.svg" alt='empty' />
                                    <span>아직 문의가 없어요</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <Link href="/items" className={style.link}>
                        <button id={style.framebutton}>
                            <div className={style.backlist}>
                                <span>목록으로 돌아가기</span>
                                <img src="/assets/ic_back.svg" alt="back" />
                            </div>
                        </button>
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}