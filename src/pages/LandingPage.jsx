import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import homeTop from '../assets/images/Img_home_top.png';
import home01 from '../assets/images/Img_home_01.png';
import home02 from '../assets/images/Img_home_02.png';
import home03 from '../assets/images/Img_home_03.png';
import homeBottom from '../assets/images/Img_home_bottom.png';
import './LandingPage.css';

function LandingPage () {
  return(
  <>
  <Header />
  <main className="landing-main">
<section className="watch-section">
    <div className="watch-content">
        <div className="watch-text">
    <h1 className="midtopic">일상의 모든 물건을<br />
    거래해 보세요</h1>
    <Link className="visit" to="/items">구경하러가기</Link>
    </div>
    <img className="watch-image" src={homeTop} width="746" height="340" alt='판다마켓 첫번째 이미지'/>
    </div>
</section>
<section className="feature-section hot-item-section">
    <div className="feature-content hot-item-content">
     <div className="feature-image-wrap">
    <img className="feature-image" src={home01} width="588" height="444" alt='판다마켓 두번째 이미지'/>
    </div>
    <div className="hot-item-text">
    <h2 className="mintopic">Hot item</h2>
    <h1 className="midtopic">인기 상품을 <br />
    확인해 보세요</h1>
    <h3 className="lasttopic"> 가장 HOT한 중고거래 물품을<br />
        판다 마켓에서 확인해 보세요
    </h3>
    </div>
    </div>
</section>
<section className="feature-section search-section">
    <div className="feature-content search-content">
        <div className="search-text">
    <h2 className="mintopic">Search</h2>
    <h1 className="midtopic">구매를 원하는<br />
    상품을 검색하세요</h1>
    <h3 className="lasttopic"> 구매하고 싶은 물품은 검색해서<br />
        쉽게 찾아보세요
        </h3>
    </div>
        <div className="feature-image-wrap">
        <img className="feature-image" src={home02} width="588" height="444" alt='판다마켓 세번째 이미지'/>
        </div>
    </div>
</section>
<section className="feature-section register-section">
    <div className="feature-content register-content">
         <div className="feature-image-wrap">
    <img className="feature-image" src={home03} width="588" height="444" alt='판다마켓 네번째 이미지'/>
    </div>
    <div className="register-text">
    <h2 className="mintopic">Register</h2>
    <h1 className="midtopic">판매를 원하는<br />
    상품을 등록하세요</h1>
    <h3 className="lasttopic">어떤 물건이든 판매하고 싶은 상품을<br />
        쉽게 등록하세요
    </h3>
        </div>
    </div>
</section>
<section className="trust-section">
    <div className="trust-text">
    <h1 className="midtopic">믿을 수 있는<br />
    판다마켓 중고 거래</h1>
    </div>
    <img className="trust-image" src={homeBottom} width="746" height="397" alt='판다마켓 다섯번째 이미지'/>
</section>
  </main>
  <Footer />
  </>
)
}

export default LandingPage;
