import homeTopImage from '../src/assets/img/Img_home_top.png';
import hotItemImage from '../src/assets/img/Img_home_01.png';
import searchItemImage from '../src/assets/img/Img_home_02.png';
import registItemImage from '../src/assets/img/Group 33682.png';
import homeBottomImage from '../src/assets/img/Img_home_bottom.png';

function MainPage() {
  return (
    <>
      <main id="main">
        <section id="visual">
          <div className="inner">
            <div className="text_wrap">
              일상의 모든 물건을
              <br />
              거래해 보세요
              <a href="/items" className="btn go_buy_page">
                구경하러 가기
              </a>
            </div>
            <div className="img_wrap">
              <img src={homeTopImage} alt="메인페이지 상단 이미지" />
            </div>
          </div>
        </section>
        <section id="con">
          <div className="inner">
            <div className="box">
              <div className="img_wrap">
                <img src={hotItemImage} alt="인기 상품 관련 이미지" />
              </div>
              <div className="text_wrap">
                <span className="dec_title">Hot Item</span>
                <span className="box_title">
                  인기 상품을
                  <br />
                  확인해 보세요
                </span>
                <span className="box_text">
                  가장 HOT한 중고거래 물품을
                  <br />
                  판다 마켓에서 확인해 보세요
                </span>
              </div>
            </div>
            <div className="box">
              <div className="text_wrap left">
                <span className="dec_title">Search</span>
                <span className="box_title">
                  구매를 원하는
                  <br />
                  상품을 검색하세요
                </span>
                <span className="box_text">
                  구매하고 싶은 물품은 검색해서
                  <br />
                  쉽게 찾아보세요
                </span>
              </div>
              <div className="img_wrap">
                <img src={searchItemImage} alt="상품 검색 관련 이미지" />
              </div>
            </div>
            <div className="box">
              <div class="img_wrap">
                <img src={registItemImage} alt="상품 등록 관련 이미지" />
              </div>
              <div className="text_wrap">
                <span class="dec_title">Register</span>
                <span className="box_title">
                  판매를 원하는 <br />
                  상품을 등록하세요
                </span>
                <span className="box_text">
                  어떤 물건이든 판매하고 싶은 상품을
                  <br />
                  쉽게 등록하세요
                </span>
              </div>
            </div>
          </div>
        </section>
        <section id="bottom_banner">
          <div className="inner">
            <div className="text_wrap">
              믿을 수 있는
              <br />
              판다마켓 중고 거래
              <br />
            </div>
            <div className="img_wrap">
              <img src={homeBottomImage} alt="메인페이지 하단 이미지" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default MainPage;
