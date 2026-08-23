import { useMutation, useQuery, } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import Footer from "@/components/Footer";
import useProductFormValidation from "@/hooks/useProductFormValidation";
import pandaMarketApi from "@/lib/api";

import styles from "@/styles/ItemDetail.module.css";

export default function ItemDetail() {
  const router = useRouter();
  const { itemId } = router.query;
  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false);

  // 상품 수정/삭제 케밥 메뉴의 열림 상태를 저장
  const [isProductMenuOpen, setIsProductMenuOpen] =
    useState(false);

  // 상품 수정 상태
  const [isEditMode, setIsEditMode] = useState(false);

  // 수정할 상품 정보를 저장할 상태
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editTagInput, setEditTagInput] = useState("");
  const [editTags, setEditTags] = useState([]);

  // 새로 작성할 상품 문의 내용을 저장할 상태
  const [commentContent, setCommentContent] = useState("");

  // 현재 수정 중인 상품 문의의 id를 저장
  const [editingCommentId, setEditingCommentId] =
    useState(null);

  // 수정할 상품 문의 내용을 저장
  const [editCommentContent, setEditCommentContent] =
    useState("");

  // 현재 케밥 메뉴가 열려 있는 상품 문의의 id를 저장
  const [openCommentMenuId, setOpenCommentMenuId] =
    useState(null);

  // 상품 수정/삭제 케밥 버튼과 드롭다운 영역의 실제 DOM 요소를 기억
  const productMenuRef = useRef(null);

  // 현재 열려 있는 상품 문의의 케밥 버튼과 드롭다운 영역을 기억
  const commentMenuRef = useRef(null);

  // 상품 또는 상품 문의의 케밥 메뉴가 열려 있을 때 해당 메뉴 영역 바깥을 클릭하면 열려 있는 메뉴를 닫음
  useEffect(() => {
    // 열려 있는 케밥 메뉴가 하나도 없다면 클릭 이벤트를 등록할 필요가 없음
    if (!isProductMenuOpen && openCommentMenuId === null) {
      return;
    }

    const handleMenuOutsideClick = (event) => {
      // 상품 케밥 메뉴가 열려 있고, 클릭한 위치가 상품 케밥 영역 바깥이라면 메뉴를 닫음
      if (
        isProductMenuOpen &&
        productMenuRef.current &&
        !productMenuRef.current.contains(event.target)
      ) {
        setIsProductMenuOpen(false);
      }

      // 상품 문의 케밥 메뉴가 열려 있고, 클릭한 위치가 해당 문의의 케밥 영역 바깥이라면 메뉴를 닫음
      if (
        openCommentMenuId !== null &&
        commentMenuRef.current &&
        !commentMenuRef.current.contains(event.target)
      ) {
        setOpenCommentMenuId(null);
      }
    };

    // 페이지에서 마우스를 누르는 순간 바깥 클릭 여부를 확인
    document.addEventListener("mousedown", handleMenuOutsideClick);

    // 메뉴 상태가 바뀌거나 컴포넌트가 사라질 때 이전에 등록한 이벤트를 제거해서 중복 등록을 방지
    return () => {
      document.removeEventListener(
        "mousedown",
        handleMenuOutsideClick,
      );
    };
  }, [isProductMenuOpen, openCommentMenuId]);

  // 수정할 상품 정보의 유효성 검사
  const {
    errors: editErrors,
    isFormValid: isEditFormValid,
    touchField: touchEditField,
    touchAllFields: touchAllEditFields,
  } = useProductFormValidation({
    name: editName,
    description: editDescription,
    price: editPrice,
    tagInput: editTagInput,
    tags: editTags,
  });

  // 상품 상세 조회
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["product", itemId],

    queryFn: async () => {
      const accessToken = localStorage.getItem("accessToken");

      const response = await pandaMarketApi.get(
        `/products/${itemId}`,
        {
          headers: accessToken
            ? {
              Authorization: `Bearer ${accessToken}`,
            }
            : undefined,
        },
      );

      return response.data;
    },

    enabled: router.isReady && Boolean(itemId),
  });

  // 상품 댓글 목록 조회
  const {
    data: commentData,
    isLoading: isCommentLoading,
    error: commentError,
    refetch: refetchComments,
  } = useQuery({
    queryKey: ["productComments", itemId],

    queryFn: async () => {
      // 로그인 상태라면 댓글 조회 요청에도 accessToken을 함께 전달
      const accessToken =
        localStorage.getItem("accessToken");

      const response = await pandaMarketApi.get(
        `/products/${itemId}/comments`,
        {
          // 한 번에 댓글 10개 조회
          params: {
            limit: 10,
          },

          // 토큰이 있을 때만 Authorization 헤더 추가
          headers: accessToken
            ? {
              Authorization: `Bearer ${accessToken}`,
            }
            : undefined,
        },
      );

      // API에서 받은 댓글 목록 데이터를 반환
      return response.data;
    },

    // itemId가 준비된 뒤에만 댓글 API 요청 실행
    enabled: router.isReady && Boolean(itemId),
  });

  // 상품 문의 등록 요청
  const createCommentMutation = useMutation({
    mutationFn: async (content) => {
      // 로그인할 때 저장한 accessToken 가져오기
      const accessToken =
        localStorage.getItem("accessToken");

      // 현재 상품에 새로운 문의 등록
      const response = await pandaMarketApi.post(
        `/products/${itemId}/comments`,
        {
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      // 등록된 상품 문의 정보를 mutation 결과로 반환
      return response.data;
    },

    onSuccess: async () => {
      // 등록이 끝난 뒤 문의 입력창 비우기
      setCommentContent("");

      // 새로 등록된 문의가 보이도록 댓글 목록 다시 조회
      await refetchComments();
    },
  });

  // 상품 문의 수정 요청
  const updateCommentMutation = useMutation({
    mutationFn: async ({
      commentId,
      content,
    }) => {
      // 로그인할 때 저장한 accessToken 가져오기
      const accessToken =
        localStorage.getItem("accessToken");

      // 선택한 상품 문의의 내용을 수정
      const response = await pandaMarketApi.patch(
        `/comments/${commentId}`,
        {
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      // 수정된 상품 문의 정보를 mutation 결과로 반환
      return response.data;
    },

    onSuccess: async () => {
      // 수정된 문의가 바로 보이도록 댓글 목록 다시 조회
      await refetchComments();

      // 상품 문의 수정 상태 종료
      setEditingCommentId(null);

      // 수정용 입력값 초기화
      setEditCommentContent("");
    },
  });

  // 상품 문의 삭제 요청
  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId) => {
      // 로그인할 때 저장한 accessToken 가져오기
      const accessToken =
        localStorage.getItem("accessToken");

      // 선택한 상품 문의를 commentId를 이용해 삭제
      const response = await pandaMarketApi.delete(
        `/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      // 삭제된 상품 문의 정보를 mutation 결과로 반환
      return response.data;
    },

    onSuccess: async () => {
      // 삭제된 문의가 바로 사라지도록 댓글 목록 다시 조회
      await refetchComments();

      // 삭제가 끝난 뒤 열려 있던 케밥 메뉴 닫기
      setOpenCommentMenuId(null);
    },
  });

  // 상품 좋아요 변경
  const favoriteMutation = useMutation({
    mutationFn: async () => {
      const accessToken =
        localStorage.getItem("accessToken");

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      if (product.isFavorite) {
        return pandaMarketApi.delete(
          `/products/${itemId}/favorite`,
          config,
        );
      }

      return pandaMarketApi.post(
        `/products/${itemId}/favorite`,
        {},
        config,
      );
    },

    onSuccess: () => {
      refetch();
    },
  });

  // 상품 삭제
  const deleteProductMutation = useMutation({
    mutationFn: async () => {
      const accessToken =
        localStorage.getItem("accessToken");

      const response = await pandaMarketApi.delete(
        `/products/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return response.data;
    },

    onSuccess: () => {
      router.push("/items");
    },
  });
  // 상품 수정 요청
  const updateProductMutation = useMutation({
    mutationFn: async (productData) => {
      // 로그인할 때 저장한 accessToken 가져오기
      const accessToken =
        localStorage.getItem("accessToken");

      // 현재 상품의 정보를 수정
      const response = await pandaMarketApi.patch(
        `/products/${itemId}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      // 수정된 상품 정보를 mutation 결과로 반환
      return response.data;
    },

    onSuccess: async () => {
      // 수정된 최신 상품 정보를 다시 조회
      await refetch();

      // 상품 수정이 성공하면 상세 보기 상태로 돌아감
      setIsEditMode(false);
    },
  });

  // 새 상품 문의 등록
  function handleCommentSubmit() {
    // 입력한 문의 내용의 앞뒤 공백 제거
    const content = commentContent.trim();

    // 내용이 비어 있으면 문의 등록 요청을 보내지 않음
    if (!content) {
      return;
    }

    // 상품 문의 등록 API 요청 실행
    createCommentMutation.mutate(content);
  }

  // 수정한 상품 정보 저장 준비
  function handleEditSubmit() {
    // 모든 수정 입력값을 검사한 것으로 처리
    touchAllEditFields();

    // 유효성 검사를 통과하지 못하면 수정 요청을 보내지 않음
    if (!isEditFormValid) {
      return;
    }

    // API에 전달할 상품 수정 데이터 생성
    const productData = {
      name: editName.trim(),
      description: editDescription.trim(),
      price: Number(editPrice),
      tags: editTags,

      // 이미지 수정 기능은 아직 구현하지 않았으므로 기존 이미지를 그대로 유지
      images: product.images ?? [],
    };

    // 상품 수정 API 요청 실행
    updateProductMutation.mutate(productData);
  }

  // 상품 수정 시작
  function handleEditStart() {
    // 현재 상품 정보를 수정용 상태에 복사
    setEditName(product.name);
    setEditDescription(product.description);
    setEditPrice(String(product.price));
    setEditTags(product.tags);
    setEditTagInput("");

    // 상품 상세 화면을 수정 상태로 변경
    setIsEditMode(true);
  }

  // 수정할 상품의 태그 추가
  function handleEditTagKeyDown(event) {
    // Enter 키가 아니면 태그를 추가하지 않음
    if (event.key !== "Enter") {
      return;
    }

    // Enter를 눌렀을 때 form 제출 등의 기본 동작 방지
    event.preventDefault();

    // 태그 입력란을 사용한 것으로 처리
    touchEditField("tag");

    const newTag = editTagInput.trim();

    // 빈 태그는 추가하지 않음
    if (!newTag) {
      return;
    }

    // 태그는 5글자까지만 허용
    if (newTag.length > 5) {
      return;
    }

    // 이미 존재하는 태그라면 중복 추가하지 않음
    if (editTags.includes(newTag)) {
      setEditTagInput("");
      return;
    }

    // 기존 태그 배열에 새로운 태그 추가
    setEditTags([...editTags, newTag]);

    // 태그 추가 후 입력창 비우기
    setEditTagInput("");
  }

  // 수정할 상품의 태그 삭제
  function handleEditTagDelete(tagToDelete) {
    setEditTags((prevTags) => {
      return prevTags.filter((tag) => tag !== tagToDelete);
    });
  }

  // 상품 문의 수정 시작
  function handleCommentEditStart(comment) {
    // 어떤 문의를 수정 중인지 알 수 있도록 댓글 id 저장
    setEditingCommentId(comment.id);

    // 기존 문의 내용을 수정용 입력값에 복사
    setEditCommentContent(comment.content);
  }

  // 상품 문의 수정 취소
  function handleCommentEditCancel() {
    // 현재 상품 문의의 수정 상태를 종료
    setEditingCommentId(null);

    // 수정하면서 입력했던 내용을 초기화
    setEditCommentContent("");
  }

  // 수정한 상품 문의 저장
  function handleCommentEditSubmit() {
    // 수정한 문의 내용의 앞뒤 공백 제거
    const content = editCommentContent.trim();

    // 수정할 댓글이 선택되지 않았거나 내용이 비어 있으면 요청하지 않음
    if (!editingCommentId || !content) {
      return;
    }

    // 상품 문의 수정 API 요청 실행
    updateCommentMutation.mutate({
      commentId: editingCommentId,
      content,
    });
  }

  // 상품 문의 작성 시간을 현재 시각 기준으로 보기 쉽게 변환
  function formatCommentDate(createdAt) {
    // 댓글 작성 시각과 현재 시각의 차이를 밀리초로 계산
    const createdTime = new Date(createdAt).getTime();
    const currentTime = Date.now();
    const diff = currentTime - createdTime;

    // 밀리초 단위의 시간 차이를 분 단위로 변환
    const minutes = Math.floor(diff / (1000 * 60));

    // 작성 후 1분이 지나지 않았다면 방금 전으로 표시
    if (minutes < 1) {
      return "방금 전";
    }

    // 작성 후 1시간이 지나지 않았다면 분 단위로 표시
    if (minutes < 60) {
      return `${minutes}분 전`;
    }

    // 분 단위를 시간 단위로 변환
    const hours = Math.floor(minutes / 60);

    // 작성 후 하루가 지나지 않았다면 시간 단위로 표시
    if (hours < 24) {
      return `${hours}시간 전`;
    }

    // 시간 단위를 일 단위로 변환
    const days = Math.floor(hours / 24);

    // 작성 후 7일이 지나지 않았다면 일 단위로 표시
    if (days < 7) {
      return `${days}일 전`;
    }

    // 오래된 문의는 YYYY.MM.DD 형식으로 표시
    return new Date(createdAt).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  return (
    <>
      <main className={styles.itemDetail}>
        <div className={styles.itemDetailContainer}>
          {isLoading && (
            <p className={styles.itemDetailStatus}>
              상품 정보를 불러오는 중입니다.
            </p>
          )}

          {!isLoading && error && (
            <p
              className={`${styles.itemDetailStatus} ${styles.itemDetailError}`}
            >
              상품 정보를 불러오지 못했습니다.
            </p>
          )}

          {!isLoading && !error && product && (
            <section className={styles.itemDetailCard}>
              {/* 상품 이미지와 상품 정보를 Figma처럼 좌우로 배치하는 상단 영역 */}
              <div className={styles.itemDetailTop}>
                <img
                  src={product.images?.[0] || "/img/img_default.svg"}
                  alt={product.name}
                  className={styles.itemDetailImage}
                />

                {/* 상품명, 가격, 소개, 태그, 판매자 정보를 묶는 영역 */}
                <div className={styles.itemDetailInfo}>

                  {/* 상품명 */}
                  {isEditMode ? (
                    // 수정 중일 때는 상품명을 input으로 표시
                    <input
                      type="text"
                      value={editName}
                      onChange={(event) => {
                        setEditName(event.target.value);
                      }}
                      onBlur={() => {
                        touchEditField("name");
                      }}
                    />
                  ) : (
                    // 수정 중이 아닐 때는 기존 상품명을 표시
                    <h1 className={styles.itemDetailTitle}>
                      {product.name}
                    </h1>
                  )}

                  {/* 수정할 상품명의 유효성 검사 메시지 */}
                  {isEditMode && editErrors.name && (
                    <p>{editErrors.name}</p>
                  )}

                  {/* 판매 가격 */}
                  {isEditMode ? (
                    // 수정 중일 때는 판매 가격을 input으로 표시
                    <input
                      type="text"
                      value={editPrice}
                      onChange={(event) => {
                        setEditPrice(event.target.value);
                      }}
                      onBlur={() => {
                        touchEditField("price");
                      }}
                    />
                  ) : (
                    // 수정 중이 아닐 때는 기존 판매 가격을 표시
                    <p className={styles.itemDetailPrice}>
                      {Number(product.price).toLocaleString("ko-KR")}원
                    </p>
                  )}

                  {/* 수정할 판매 가격의 유효성 검사 메시지 */}
                  {isEditMode && editErrors.price && (
                    <p>{editErrors.price}</p>
                  )}

                  <div className={styles.itemDetailSection}>
                    <h2 className={styles.itemDetailSectionTitle}>
                      상품 소개
                    </h2>

                    {/* 상품 소개 */}
                    {isEditMode ? (
                      // 수정 중일 때는 상품 소개를 textarea로 표시
                      <textarea
                        value={editDescription}
                        onChange={(event) => {
                          setEditDescription(event.target.value);
                        }}
                        onBlur={() => {
                          touchEditField("description");
                        }}
                      />
                    ) : (
                      // 수정 중이 아닐 때는 기존 상품 소개를 표시
                      <p className={styles.itemDetailDescription}>
                        {product.description}
                      </p>
                    )}

                    {/* 수정할 상품 소개의 유효성 검사 메시지 */}
                    {isEditMode && editErrors.description && (
                      <p>{editErrors.description}</p>
                    )}
                  </div>

                  <div className={styles.itemDetailSection}>
                    <h2 className={styles.itemDetailSectionTitle}>
                      태그
                    </h2>

                    {isEditMode ? (
                      <>
                        {/* 수정할 태그 입력 */}
                        <input
                          type="text"
                          value={editTagInput}
                          placeholder="태그를 입력해주세요"
                          onChange={(event) => {
                            setEditTagInput(event.target.value);
                          }}
                          onKeyDown={handleEditTagKeyDown}
                          onBlur={() => {
                            touchEditField("tag");
                          }}
                        />

                        {/* 수정할 태그의 유효성 검사 메시지 */}
                        {editErrors.tag && (
                          <p>{editErrors.tag}</p>
                        )}

                        {/* 수정 중인 태그 목록 */}
                        <div className={styles.itemDetailTags}>
                          {editTags.map((tag) => {
                            return (
                              <span
                                key={tag}
                                className={styles.itemDetailTag}
                              >
                                #{tag}

                                {/* 수정할 태그 삭제 */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleEditTagDelete(tag);
                                  }}
                                  aria-label={`${tag} 태그 삭제`}
                                >
                                  ×
                                </button>
                              </span>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      // 수정 중이 아닐 때는 기존 상품 태그를 표시
                      <div className={styles.itemDetailTags}>
                        {product.tags.map((tag) => {
                          return (
                            <span
                              key={tag}
                              className={styles.itemDetailTag}
                            >
                              #{tag}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div className={styles.itemDetailMeta}>
                    {/* 상품 판매자 정보를 프로필 이미지와 닉네임으로 표시 */}
                    <div className={styles.itemDetailOwner}>
                      <img
                        src="/img/ic_profile.svg"
                        alt={`${product.ownerNickname} 프로필`}
                        className={styles.itemDetailOwnerImage}
                      />

                      <div className={styles.itemDetailOwnerInfo}>
                        {/* 상품을 등록한 판매자의 닉네임 표시 */}
                        <p className={styles.itemDetailOwnerNickname}>
                          {product.ownerNickname}
                        </p>
                      </div>
                    </div>

                    {/* 상품의 좋아요 상태와 좋아요 수를 함께 표시 */}
                    <button
                      type="button"
                      className={styles.itemDetailFavoriteCount}
                      onClick={() => {
                        // 현재 좋아요 상태에 맞게 등록 또는 취소 API 요청 실행
                        favoriteMutation.mutate();
                      }}
                      disabled={favoriteMutation.isPending}
                      aria-pressed={product.isFavorite}
                    >
                      {/* 좋아요 여부에 따라 빈 하트 또는 채워진 하트 표시 */}
                      <img
                        src={
                          product.isFavorite
                            ? "/img/ic_heart_pull.png"
                            : "/img/ic_heart.png"
                        }
                        alt=""
                        className={styles.itemDetailFavoriteIcon}
                      />

                      {/* 현재 상품의 좋아요 개수 표시 */}
                      <span>{product.favoriteCount}</span>
                    </button>

                    {/* 상품 수정/삭제 메뉴 */}
                    <div
                      className={styles.productMenu}
                      ref={productMenuRef}
                    >
                      {/* 상품 수정과 삭제 메뉴를 열고 닫는 케밥 버튼 */}
                      <button
                        type="button"
                        className={styles.productMenuButton}
                        onClick={() => {
                          // 현재 메뉴 상태의 반대값으로 변경해서 열거나 닫음
                          setIsProductMenuOpen((prev) => !prev);
                        }}
                        aria-label="상품 메뉴"
                      >
                        ⋮
                      </button>

                      {/* 케밥 메뉴가 열려 있을 때만 수정/삭제 메뉴 표시 */}
                      {isProductMenuOpen && (
                        <div className={styles.productMenuDropdown}>
                          {/* 상품 수정 시작 */}
                          <button
                            type="button"
                            onClick={() => {
                              // 기존 상품 정보를 수정할 수 있도록 수정 모드 시작
                              handleEditStart();

                              // 수정하기를 선택한 뒤 케밥 메뉴 닫기
                              setIsProductMenuOpen(false);
                            }}
                          >
                            수정하기
                          </button>

                          {/* 상품 삭제 확인 모달 열기 */}
                          <button
                            type="button"
                            onClick={() => {
                              // 실제 삭제 전에 사용자에게 한 번 더 확인받기 위해 모달 표시
                              setIsDeleteModalOpen(true);

                              // 삭제하기를 선택한 뒤 케밥 메뉴 닫기
                              setIsProductMenuOpen(false);
                            }}
                          >
                            삭제하기
                          </button>
                        </div>
                      )}
                    </div>

                    {/* 상품 수정 완료 */}
                    {isEditMode && (
                      <button
                        type="button"
                        onClick={handleEditSubmit}
                        disabled={updateProductMutation.isPending}
                      >
                        {updateProductMutation.isPending
                          ? "수정 중..."
                          : "수정 완료"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {isDeleteModalOpen && (
                <div>
                  <p>상품을 삭제하시겠어요?</p>

                  <button
                    type="button"
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                    }}
                  >
                    취소
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      deleteProductMutation.mutate();
                    }}
                    disabled={deleteProductMutation.isPending}
                  >
                    삭제
                  </button>
                </div>
              )}

              {/* 상품 문의 목록 */}
              <div className={styles.commentSection}>
                {/* 상품 문의 영역의 제목 표시 */}
                <h2 className={styles.commentSectionTitle}>
                  문의하기
                </h2>

                {/* 상품 문의 내용을 입력하는 영역 */}
                <textarea
                  className={styles.commentTextarea}
                  value={commentContent}
                  placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유표시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
                  onChange={(event) => {
                    // 사용자가 입력한 내용을 상품 문의 state에 저장
                    setCommentContent(event.target.value);
                  }}
                />

                {/* 새 상품 문의 등록 */}
                <button
                  type="button"
                  className={styles.commentSubmitButton}
                  onClick={handleCommentSubmit}
                  disabled={
                    createCommentMutation.isPending ||
                    !commentContent.trim()
                  }
                >
                  {createCommentMutation.isPending
                    ? "등록 중..."
                    : "등록"}
                </button>

                {/* 상품 문의를 불러오는 중일 때 */}
                {isCommentLoading && (
                  <p>상품 문의를 불러오는 중입니다.</p>
                )}

                {/* 상품 문의 조회에 실패했을 때 */}
                {!isCommentLoading && commentError && (
                  <p>상품 문의를 불러오지 못했습니다.</p>
                )}

                {/* 조회는 성공했지만 등록된 상품 문의가 없을 때 */}
                {!isCommentLoading &&
                  !commentError &&
                  commentData?.list?.length === 0 && (
                    // 문의가 없을 때 Figma의 빈 상태 이미지와 안내 문구를 표시
                    <div className={styles.commentEmpty}>
                      {/* 등록된 문의가 없다는 것을 보여주는 빈 상태 이미지 */}
                      <img
                        src="/img/Img_inquiry_empty.png"
                        alt=""
                        className={styles.commentEmptyImage}
                      />

                      {/* 등록된 상품 문의가 없을 때 안내 문구 표시 */}
                      <p className={styles.commentEmptyMessage}>
                        아직 문의가 없어요
                      </p>
                    </div>
                  )}

                {/* 조회한 상품 문의 목록 출력 */}
                {!isCommentLoading &&
                  !commentError &&
                  commentData?.list?.map((comment) => {
                    return (
                      // 상품 문의 한 개의 전체 영역
                      <div
                        key={comment.id}
                        className={styles.commentItem}
                      >
                        {/* 문의를 작성한 사용자 닉네임 */}

                        {/* 상품 문의 수정/삭제 케밥 메뉴 전체 영역 */}
                        <div
                          className={styles.commentMenu}
                          ref={
                            // 현재 메뉴가 열려 있는 문의에만 ref를 연결해서
                            // 케밥 영역 바깥 클릭 여부를 판단
                            openCommentMenuId === comment.id
                              ? commentMenuRef
                              : null
                          }
                        >
                          {/* 상품 문의 수정/삭제 메뉴를 열고 닫는 케밥 버튼 */}
                          <button
                            type="button"
                            className={styles.commentMenuButton}
                            onClick={() => {
                              // 이미 열려 있는 문의의 버튼을 다시 누르면 메뉴를 닫음
                              if (openCommentMenuId === comment.id) {
                                setOpenCommentMenuId(null);
                                return;
                              }

                              // 클릭한 문의의 id를 저장해서 해당 문의의 메뉴를 열 준비
                              setOpenCommentMenuId(comment.id);
                            }}
                            aria-label="상품 문의 메뉴"
                          >
                            ⋮
                          </button>

                          {/* 현재 문의의 케밥 메뉴가 열려 있을 때만 수정/삭제 메뉴 표시 */}
                          {openCommentMenuId === comment.id && (
                            // 현재 문의의 수정/삭제 메뉴를 Figma 드롭다운 형태로 표시
                            <div className={styles.commentMenuDropdown}>
                              {/* 상품 문의 수정 시작 */}
                              <button
                                type="button"
                                onClick={() => {
                                  // 선택한 문의를 수정 상태로 변경
                                  handleCommentEditStart(comment);

                                  // 수정하기를 선택한 뒤 케밥 메뉴 닫기
                                  setOpenCommentMenuId(null);
                                }}
                              >
                                수정하기
                              </button>

                              {/* 상품 문의 삭제 */}
                              <button
                                type="button"
                                onClick={() => {
                                  // 현재 선택한 상품 문의의 id를 전달해서 삭제 요청 실행
                                  deleteCommentMutation.mutate(comment.id);
                                }}
                                disabled={deleteCommentMutation.isPending}
                              >
                                {deleteCommentMutation.isPending
                                  ? "삭제 중..."
                                  : "삭제하기"}
                              </button>
                            </div>
                          )}
                        </div>

                        {/* 상품 문의 내용 */}
                        {editingCommentId === comment.id ? (
                          // 현재 수정 중인 문의라면 textarea로 표시
                          <textarea
                            value={editCommentContent}
                            onChange={(event) => {
                              // 사용자가 수정한 문의 내용을 state에 저장
                              setEditCommentContent(event.target.value);
                            }}
                          />
                        ) : (
                          // 수정 중이 아니라면 기존 문의 내용을 그대로 표시
                          <p className={styles.commentContent}>
                            {comment.content}
                          </p>
                        )}

                        {/* 상품 문의 작성자 정보 */}
                        <div className={styles.commentWriter}>
                          {/* 작성자 프로필 이미지가 없으면 기본 프로필 이미지 표시 */}
                          <img
                            src={comment.writer.image || "/img/ic_profile.svg"}
                            alt={`${comment.writer.nickname} 프로필`}
                            className={styles.commentWriterImage}
                          />

                          {/* 작성자 닉네임과 작성 시간을 세로로 표시 */}
                          <div className={styles.commentWriterInfo}>
                            {/* 상품 문의 작성자 닉네임 */}
                            <p className={styles.commentWriterNickname}>
                              {comment.writer.nickname}
                            </p>

                            {/* 상품 문의 작성 시간 */}
                            <p className={styles.commentCreatedAt}>
                              {formatCommentDate(comment.createdAt)}
                            </p>
                          </div>
                        </div>

                        {/* 상품 문의 수정 버튼 */}
                        {editingCommentId === comment.id && (
                          // 현재 수정 중인 문의라면 취소와 수정 완료 버튼을 함께 표시
                          <>
                            {/* 상품 문의 수정 취소 */}
                            <button
                              type="button"
                              onClick={handleCommentEditCancel}
                              disabled={updateCommentMutation.isPending}
                            >
                              취소
                            </button>

                            {/* 수정한 상품 문의 저장 */}
                            <button
                              type="button"
                              onClick={handleCommentEditSubmit}
                              disabled={updateCommentMutation.isPending}
                            >
                              {updateCommentMutation.isPending
                                ? "수정 중..."
                                : "수정 완료"}
                            </button>
                          </>
                        )}
                      </div>
                    );
                  })}
              </div>
            </section>
          )}

          {/* 상품 상세 확인을 마친 뒤 전체 상품 목록으로 이동 */}
          <button
            type="button"
            className={styles.backToListButton}
            onClick={() => {
              // 상품 목록 페이지로 이동
              router.push("/items");
            }}
          >
            {/* Figma의 목록으로 돌아가기 버튼 이미지 사용 */}
            <img
              src="/img/btn_medium.png"
              alt="목록으로 돌아가기"
              className={styles.backToListButtonImage}
            />
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}