import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import style from "@/styles/items/[id].module.css"
import api from "@/utils/api";
import { toast } from "react-toastify";
import Gnb from "@/components/gnb";
import Link from "next/link";
import Footer from "@/components/Footer";
import { formatDate } from "@/utils/time";
import Commentcard from "@/components/commentcard";
import WarningModal from "@/components/warningmodal";

export default function ItemDetail() {
    const router = useRouter();
    const { id } = router.query;
    const queryClient = useQueryClient();

    const [comment, setComment] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [like, setLike] = useState(false);

    const handleDeleteClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // 상품 상세 조회
    const {
        data: item,
        isLoading: itemLoading,
        error: itemError,
    } = useQuery({
        queryKey: ["item", id],
        queryFn: async () => {
            const res = await api.get(`/items/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    // 댓글 조회
    const {
        data: commentsData,
        isLoading: commentsLoading,
        error: commentsError,
    } = useQuery({
        queryKey: ["comments", id],
        queryFn: async () => {
            const res = await api.get(`/items/${id}/comment?limit=10`);
            return res.data;
        },
        enabled: !!id,
    });

    const comments = commentsData?.list || [];
    const currentComments = comments.slice((currentPage - 1) * 10, currentPage * 10);

    // 댓글 등록 Mutation
    const registerComment = useMutation({
        mutationFn: async () => {
            const res = await api.post(`/items/${id}/comment`, { content: comment });
            return res.data;
        },
        onSuccess: () => {
            toast("댓글이 등록되었습니다!");
            setComment("");
            queryClient.invalidateQueries(["comments", id]); // 댓글 목록 갱신
        },
        onError: (err) => {
            if (!err?.__toastShown) toast.error("댓글 등록 중 오류가 발생했습니다.");
        },
    });

    // 댓글 등록: 로그인(닉네임) 안 되어 있으면 막고 안내
    const handleCommentSubmit = () => {
        if (!localStorage.getItem("nickname")) {
            toast.error("로그인 후 이용 가능합니다.");
            return;
        }
        registerComment.mutate();
    };

    // 좋아요 Mutation
    const toggleLike = useMutation({
        mutationFn: async (liked) => {
            if (!liked) {
                // 좋아요 등록
                const res = await api.post(`/items/${id}/favorite`);
                return res.data;
            } else {
                // 좋아요 취소
                const res = await api.delete(`/items/${id}/favorite`);
                return res.data;
            }
        },
        onMutate: async (liked) => {
            // Optimistic Update: 클릭 즉시 UI 반영
            await queryClient.cancelQueries(["item", id]);
            const prevItem = queryClient.getQueryData(["item", id]);

            queryClient.setQueryData(["item", id], (old) => ({
                ...old,
                isFavorite: !liked,
                favoriteCount: liked ? old.favoriteCount - 1 : old.favoriteCount + 1,
            }));

            return { prevItem };
        },
        onError: (err, variables, context) => {
            // 실패 시 롤백
            queryClient.setQueryData(["item", id], context.prevItem);
            if (!err?.__toastShown) toast.error("좋아요 처리 중 오류가 발생했습니다.");
        },
        onSuccess: (updated) => {
            queryClient.setQueryData(["item", id], (prev) => ({
                ...prev,
                isFavorite: updated.isFavorite,
                favoriteCount: updated.favoriteCount,
            }));
        },
        onSettled: () => {
            // 서버와 최종 동기화
            queryClient.invalidateQueries(["item", id]);
        },
    });

    // 좋아요: 로그인(닉네임) 안 되어 있으면 막고 안내 (비로그인 시 401 → 세션정리 → "/" 이동 방지)
    const handleToggleLike = () => {
        if (!localStorage.getItem("nickname")) {
            toast.error("로그인 후 이용 가능합니다.");
            return;
        }
        toggleLike.mutate(item.isFavorite);
    };

    // 삭제 Mutation
    const deleteItem = useMutation({
        mutationFn: async () => {
            const res = await api.delete(`/items/${id}`);
            return res.data;
        },
        onSuccess: () => {
            toast("상품이 삭제되었습니다.");
            router.push("/items");
        },
        onError: (err) => {
            if (!err?.__toastShown) toast.error("삭제 중 오류가 발생했습니다.");
        },
    });

    // 게시글 수정
    const handleEdit = async () => {
        try {
            const res = await api.patch(`/items/${id}`, {});
            if (res.status === 403) {
                toast("본인이 작성한 글만 수정할 수 있습니다.");
            } else if (res.status === 200) {
                router.push(`/items/${id}/edit`);
            } else {
                toast("수정 권한 확인 중 오류");
            }
        } catch (error) {
            console.error("수정 권한 확인 에러:", error);
            toast.error("수정 권한 확인 중 문제가 발생했습니다.");
        }
    };

    // 게시글 삭제
    const handlePermit = async () => {
        try {
            await api.delete(`/items/${id}`); // 실제 삭제 API 호출
            toast("상품이 삭제되었습니다.");
            setIsModalOpen(false);
            router.push("/items"); // 목록 페이지로 이동
        } catch (error) {
            console.error("삭제 에러:", error);
            toast.error("상품 삭제 중 문제가 발생했습니다.");
            setIsModalOpen(false);
        }
    };



    if (itemLoading || commentsLoading) return <p>로딩중...</p>;
    if (itemError || commentsError) return <p>에러 발생</p>;


    return (
        <>
            <Gnb />
            <div className={style.wrap}>
                <div className={style.frame}>
                    <div className={style.content_frame}>
                        <div className={style.content_wrap}>
                            <div className={style.item_images}>
                                {Array.isArray(item?.images) && item.images.length > 0 ? (
                                    <img src={item?.images[0]} alt={item?.name || "상품 이미지"} />
                                ) : (
                                    <img src="/assets/default.jpg" alt="기본 이미지" />
                                )}
                            </div>

                            <div className={style.info}>
                                <div className={style.info_head}>
                                    <div className={style.head_top}>
                                        <div className={style.withkebob}>
                                            <div className={style.name_price}>
                                                <h1>{item?.name}</h1>
                                                <p>{item?.price}원</p>
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
                                            <p>{item?.description}</p>
                                        </div>
                                        <div className={style.taginfo}>
                                            <span>상품 태그</span>
                                            <div className={style.taglist}>
                                                {Array.isArray(item?.tags) && item.tags.length > 0 ? (
                                                    item.tags.map((tag, idx) => (
                                                        <div key={idx} className={style.tags}>
                                                            <span>#{tag}</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <span>태그 없음</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.info_bottom}>
                                    <div className={style.userprofile}>
                                        <img src="/assets/ic_profile.svg" alt="profile" />
                                        <div className={style.user_createat}>
                                            <span>{item?.ownerNickname}</span>
                                            <p>{item?.createdAt ? formatDate(item.createdAt) : ""}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={style.line_button}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1" height="34" viewBox="0 0 1 34" fill="none">
                                                <path d="M0.5 0V34" stroke="#E5E7EB" />
                                            </svg>
                                            <button
                                                className={style.likebutton}
                                                onClick={handleToggleLike}
                                            >
                                                <div className={style.heart_likes}>
                                                    <img
                                                        src={item?.isFavorite ? "/assets/ic_heart_on.svg" : "/assets/ic_heart.svg"}
                                                        alt="heart"
                                                    />
                                                    <span>{item?.favoriteCount ?? 0}</span>
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
                                    onClick={handleCommentSubmit}
                                >
                                    <span>등록</span>
                                </button>

                            </div>

                            {Array.isArray(comments) && comments.length > 0 ? (
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
                                                queryClient.setQueryData(["comments", id], (old) => {
                                                    if (!old) return old;
                                                    return {
                                                        ...old,
                                                        list: old.list.map((comment) =>
                                                            comment.id === commentId ? { ...comment, content: newContent } : comment
                                                        ),
                                                    };
                                                });
                                            }}

                                            onDeleted={() => queryClient.invalidateQueries(["comments", id])}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className={style.empty_comment}>
                                    <img src="/assets/img_inquiry_empty.svg" alt="empty" />
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