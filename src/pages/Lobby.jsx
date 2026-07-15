import { useNavigate } from "react-router-dom"; // Web 캐시를 유지하기위한 Navigate 반영
import style from "../style/Lobby.module.css";
import ImgHomeTop from "../assets/Img_home_top.png";
import LobbyContent from "../components/LobbyContent";
import Img_content1 from "../assets/Frame 2608833.png";
import Img_content2 from "../assets/Img_home_02.png";
import Img_content3 from "../assets/Img_home_03.png";
import Footer from "../components/Footer";
import Lobby_Header from "../components/Lobby_Header.jsx"

function Lobby() {
  const navigate = useNavigate(); // 링크 이동 시 새로고침이 아닌 상태로 컴포넌트 호출
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
    <Lobby_Header/>
    <div className={style.main}>
      <div className={style.content} id={style.heroImage}>
        <div className={style.content} id={style.mainSection}>
          <div className={style.content} id={style.discriptionSection}>
            <h2>
              일상의 모든 물건을 <br />
              거래해 보세요
            </h2>
            <button
              type="button"
              onClick={() => navigate('items')}
            >
              <span>구경하러 가기</span>
            </button>
          </div>
          <img src={ImgHomeTop} alt="Img_home_top"/>
        </div>
      </div>

      <LobbyContent 
        option="2"
        imgContent={Img_content1}
        h4_txt={`Hot item`}
        h2_txt={h2_txt_no1}
        h3_txt={h3_txt_no1}
      />
      <LobbyContent 
        option="1"
        imgContent={Img_content2}
        h4_txt={`Search`}
        h2_txt={h2_txt_no2}
        h3_txt={h3_txt_no2}
      />
      <LobbyContent 
        option="2"
        imgContent={Img_content3}
        h4_txt={`Register`}
        h2_txt={h2_txt_no3}
        h3_txt={h3_txt_no3}
      />    
    </div>
    <Footer/>
  </>
  )
}

export default Lobby;