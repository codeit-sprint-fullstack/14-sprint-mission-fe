import Link from 'next/link';
import Gnb from '../components/gnb.jsx';
import style from "@/styles/index.module.css";
import LobbyContent from "../components/lobbycontent.jsx";
import Footer from "../components/Footer.jsx";

export default function home() {
  // span에 <br>태그를 넣을 수 없어 변수 선언 후 호출
  const h2_txt_no1 = (
    <>
      인기 상품을 <br />확인해 보세요
    </>
  );
  const h2_txt_no2 = (
    <>
      원하는 상품을 <br />확인해 보세요
    </>
  );
  const h2_txt_no3 = (
    <>
      판매를 원하는 <br />상품을 등록하세요
    </>
  );
  const h3_txt_no1 = (
    <>
      가장 HOT한 중고거래 물품을<br />판다 마켓에서 확인해 보세요
    </>
  );
  const h3_txt_no2 = (
    <>
      구매하고 싶은 물품은 검색해서<br />쉽게 찾아보세요
    </>
  );
  const h3_txt_no3 = (
    <>
      어떤 물건이든 판매하고 싶은 상품을<br />쉽게 등록하세요
    </>
  );

  return (
    <>
      <Gnb />
      <div className={style.main}>
        <div className={style.content} id={style.heroImage}>
          <div className={style.content} id={style.mainSection}>
            <div className={style.content} id={style.discriptionSection}>
              <h2>
                일상의 모든 물건을 <br />
                거래해 보세요
              </h2>
              <Link href="/items" className={style.button}>
                <span>거래하러 가기</span>
              </Link>
            </div>
            <img src="/assets/Img_home_top.svg" alt="Img_home_top" />
          </div>
        </div>

        <LobbyContent
          option="2"
          imgContent={"/assets/Img_home_01.svg"}
          h4_txt={`Hot item`}
          h2_txt={h2_txt_no1}
          h3_txt={h3_txt_no1}
        />
        <LobbyContent
          option="1"
          imgContent={"/assets/Img_home_02.svg"}
          h4_txt={`Search`}
          h2_txt={h2_txt_no2}
          h3_txt={h3_txt_no2}
        />
        <LobbyContent
          option="2"
          imgContent={"/assets/Img_home_03.svg"}
          h4_txt={`Register`}
          h2_txt={h2_txt_no3}
          h3_txt={h3_txt_no3}
        />
      </div>

      <div className={style.content} id={style.heroImage}>
        <div className={style.content} id={style.mainSection}>
          <div className={style.content} id={style.discriptionSection}>
            <h2>
              믿을 수 있는 <br />
              판다마켓 중고 거래
            </h2>
          </div>
          <img src="/assets/Img_home_bottom.svg" alt="Img_home_bottom" />
        </div>
      </div>

      <Footer />
    </>
  )
}
