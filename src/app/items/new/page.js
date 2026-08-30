"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";

import styles from "@/styles/Items.module.css";
import api from "@/api/axios";

export default function NewItemPage() {
  // 상품 입력값
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const router = useRouter();

  // 상품 등록
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 공통 axios를 사용해 상품 등록
      await api.post("/products", {
        name,
        description,
        price: Number(price),
      });

      // 등록 성공 → 상품 목록 이동
      router.push("/items");
    } catch (error) {
      alert(
        error.response?.data?.message ??
          "상품 등록에 실패했습니다."
      );
    }
  };

  return (
    <>
      <Header />

      <div className="subWrapper">
        <div className="subContents">

          {/* form 안에 등록 버튼까지 전부 포함 */}
          <form onSubmit={handleSubmit}>
            <div className="subTitle">
              <p>상품 등록하기</p>

              {/* form submit 버튼 */}
              <button
                type="submit"
                className="btn btnItemRegist"
              >
                등록
              </button>
            </div>

            {/* 상품 이미지 */}
            <div className={styles.itemRegistWrap}>
              <div className={styles.registerTit}>
                상품 이미지
              </div>

              <div className={styles.registerImgWrap}>
                <div className={styles.imgRegisterBtnWrap}>
                  <button
                    type="button"
                    className={styles.imgRegisterBtn}
                  >
                    <div className={styles.imgRegisterTxt}>
                      <img
                        src="/assets/ic_plus.png"
                        alt=""
                      />
                      이미지 등록
                    </div>
                  </button>
                </div>

                <div className={styles.registedImgWrap}>
                  <button
                    type="button"
                    className={styles.btnDelete}
                  >
                    <span className={styles.hidden}>
                      삭제
                    </span>
                  </button>

                  <img src="" alt="" />
                </div>
              </div>
            </div>

            {/* 상품명 */}
            <div className={styles.registerInputWrap}>
              <div className={styles.registerTit}>
                상품명
              </div>

              <Input
                placeholder="상품명을 입력해주세요"
                className={styles.registerInput}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* 상품 소개 */}
            <div className={styles.registerInputWrap}>
              <div className={styles.registerTit}>
                상품 소개
              </div>

              <Textarea
                placeholder="상품 소개를 입력해주세요"
                className={styles.registerTextarea}
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />
            </div>

            {/* 판매 가격 */}
            <div className={styles.registerInputWrap}>
              <div className={styles.registerTit}>
                판매가격
              </div>

              <Input
                type="number"
                placeholder="판매 가격을 입력해주세요"
                className={styles.registerInput}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}