import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/BestBoard.module.css";
import SampleImg from "@/assets/sample.webp"
export default function BestBoard (){
  return (
    <>
      <div className={styles.bestBoardWrap}>
        <div className={styles.bestBoardCont}>
          <div className={styles.bestMark}>
            <img src="/assets/ic_medal.png"/>
            <p>Best</p>
          </div>
          <div className={styles.bestContents}>
            <div className={styles.bestTop}>
              <div className={styles.bestText}>
                이 스파이더맨 피규어 얼마면 살 수 있어요?
              </div>
              <div className={styles.bestImgWrap}>
                <Image
                  src ={SampleImg}
                  fill
                >
                </Image>
              </div>
            </div>
            <div className={styles.bestBottom}>
              <div className={styles.left}>
                <div className={styles.bestNick}></div>
                <div className={styles.favWrap}>
                  <img src="/assets/ic_fav.png"/>
                  <p>9999+</p>
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.date}>
                  2024.05.16
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bestBoardCont}>
          <div className={styles.bestMark}>
            <img src="/assets/ic_medal.png"/>
            <p>Best</p>
          </div>
          <div className={styles.bestContents}>
            <div className={styles.bestTop}>
              <div className={styles.bestText}>
                이 스파이더맨 피규어 얼마면 살 수 있어요?
              </div>
              <div className={styles.bestImgWrap}>
                <Image
                  src ={SampleImg}
                   fill
                >
                </Image>
              </div>
            </div>
            <div className={styles.bestBottom}>
              <div className={styles.left}>
                <div className={styles.bestNick}></div>
                <div className={styles.favWrap}>
                  <img src="/assets/ic_fav.png"/>
                  <p>9999+</p>
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.date}>
                  2024.05.16
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bestBoardCont}>
          <div className={styles.bestMark}>
            <img src="/assets/ic_medal.png"/>
            <p>Best</p>
          </div>
          <div className={styles.bestContents}>
            <div className={styles.bestTop}>
              <div className={styles.bestText}>
                이 스파이더맨 피규어 얼마면 살 수 있어요?
              </div>
              <div className={styles.bestImgWrap}>
                <Image
                  src ={SampleImg}
                   fill
                >
                </Image>
              </div>
            </div>
            <div className={styles.bestBottom}>
              <div className={styles.left}>
                <div className={styles.bestNick}></div>
                <div className={styles.favWrap}>
                  <img src="/assets/ic_fav.png"/>
                  <p>9999+</p>
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.date}>
                  2024.05.16
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}