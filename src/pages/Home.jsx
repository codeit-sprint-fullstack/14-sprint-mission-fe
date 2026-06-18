function Home() {
  return (
    <>
      {/* 히어로 배너 */}
      <div className="hero">
        <div className="inner">
          <div className="heroText">
            <h1>일상의 모든 물건을<br />거래해 보세요</h1>
            <button className="shopButton" onClick={() => location.href = '/items'}>구경해보러 가기</button>
          </div>
          <img className="heroImage" src="/img/panda_home.png" alt="판다 홈 이미지" />
        </div>
      </div>

      {/* 피처 섹션 */}
      <div className="featuresWrap">
        <div className="featureRow">
          <div className="inner">
            <img className="featureImage" src="/img/panda_body1.png" alt="인기 상품" />
            <div className="featureText">
              <p className="featureLabel">Hot Item</p>
              <h2>인기 상품을<br />확인해 보세요</h2>
              <p>가장 HOT한 중고거래 물품을<br />판다 마켓에서 확인해 보세요</p>
            </div>
          </div>
        </div>

        <div className="featureRow reverse">
          <div className="inner">
            <img className="featureImage" src="/img/panda_body2.png" alt="상품 검색" />
            <div className="featureText">
              <p className="featureLabel">Search</p>
              <h2>구매를 원하는<br />상품을 검색하세요</h2>
              <p>구매하고 싶은 물품은 검색해서<br />쉽게 찾아보세요</p>
            </div>
          </div>
        </div>

        <div className="featureRow">
          <div className="inner">
            <img className="featureImage" src="/img/panda_body3.png" alt="상품 등록" />
            <div className="featureText">
              <p className="featureLabel">Register</p>
              <h2>판매를 원하는<br />상품을 등록하세요</h2>
              <p>어떤 물건이든 판매하고 싶은 상품을<br />쉽게 등록하세요</p>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 신뢰 섹션 */}
      <div className="trust">
        <div className="inner">
          <h2>믿을 수 있는<br />판다마켓 중고 거래</h2>
          <img className="trustImage" src="/img/panda_footer.png" alt="판다마켓 중고 거래" />
        </div>
      </div>

      {/* 푸터 */}
      <div className="footer">
        <div className="inner">
          <div className="footerLeft">codeit-2024</div>
          <div className="footerCenter">
            <a className="footerLink" href="/privacy">Privacy Policy</a>
            <a className="footerLink" href="/faq">FAQ</a>
          </div>
          <div className="footerRight">
            <a className="snsLink" href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <img src="/img/ic_facebook.png" alt="페이스북" />
            </a>
            <a className="snsLink" href="https://www.twitter.com" target="_blank" rel="noreferrer">
              <img src="/img/ic_twitter.png" alt="트위터" />
            </a>
            <a className="snsLink" href="https://www.youtube.com" target="_blank" rel="noreferrer">
              <img src="/img/ic_youtube.png" alt="유튜브" />
            </a>
            <a className="snsLink" href="https://www.instagram.com" target="_blank" rel="noreferrer">
              <img src="/img/ic_instagram.png" alt="인스타그램" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
