import { Link } from 'react-router-dom';
import { useIsMobile, useIsTablet } from "../contexts/ResponsiveContext.jsx";
import heroImg from '../assets/Img_home_top.png';
import featImg1 from '../assets/Img_home_01.png';
import featImg2 from '../assets/Img_home_02.png';
import featImg3 from '../assets/Img_home_03.png';
import bottomImg from '../assets/Img_home_bottom.png';
import './Homepage.css'; 

function Homepage () {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
  <>
    <div className="home-wrap">
      <section className="hero-bg">
        <div className="hero-content">
          <div className="hero-copy">
            <h1>일상의 모든 물건을{isTablet ? ' ' : <br/>}거래해 보세요</h1>
            <Link to="/items"><span>구경하러 가기</span></Link>
          </div>
          <img src={heroImg} alt="판다마켓 메인 이미지"/>
        </div>
      </section>
      <section className="features">
        <article>
          <div className="features-box">
            <img src={featImg1} alt="특징 인기상품 확인"/>
            <div className="features-copy">
              <h2>Hot item</h2>
              <h3>인기 상품을{isTablet ? ' ' : <br/>}확인해 보세요</h3>
              <p>가장 HOT한 중고거래 물품을{isTablet ? <br/>:' '}판다 마켓에서 확인해 보세요</p>
            </div>
          </div>
        </article>
        <article>
          <div className="features-box">
            <img src={featImg2} alt="특징 구매상품 검색"/>
            <div className="features-copy">
              <h2>Search</h2>
              <h3>구매를 원하는{isTablet ? ' ' : <br/>}상품을 검색하세요</h3>
              <p>구매하고 싶은 물품은 검색해서{isTablet ? <br/>:' '}쉽게 찾아보세요</p>
            </div>
          </div>
        </article>
        <article>
          <div className="features-box">
            <img src={featImg3} alt="특징 판매상품 등록"/>
            <div className="features-copy">
              <h2>Register</h2>
              <h3>판매를 원하는{isTablet ? ' ' : <br/>}상품을 등록하세요</h3>
              <p>어떤 물건이든 판매하고 싶은 상품을{isTablet ? <br/>:' '}쉽게 등록하세요</p>
            </div>
          </div>
        </article>
     </section>
     <section className="bot-bg">
      <div className="bot">
        <div className="bot-banner">
          <div className="bot-banner-copy">
            <h2>믿을 수 있는<br/>판다마켓 중고 거래</h2>
          </div>
          <img src={bottomImg} alt="판다마켓 중고거래"/>
        </div>
      </div>
    </section>
    </div>
  </>
  );
}

export default Homepage;