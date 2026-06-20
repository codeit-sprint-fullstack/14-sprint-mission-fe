const features = [
  {
    keyword: 'Hot item',
    title: '인기 상품을\n확인해 보세요',
    description: '가장 HOT한 중고거래 물품을\n판다마켓에서 확인해 보세요',
    image: '/images/Img_home_01.png',
    alt: '인기 상품',
  },
  {
    keyword: 'Search',
    title: '구매를 원하는\n상품을 검색하세요',
    description: '구매하고 싶은 물품을 검색해서\n쉽게 찾아보세요',
    image: '/images/Img_home_02.png',
    alt: '상품 검색',
    reverse: true,
  },
  {
    keyword: 'Register',
    title: '판매를 원하는\n상품을 등록하세요',
    description: '어떤 물건이든 판매하고 싶은 상품을\n쉽게 등록하세요',
    image: '/images/Group 33682.png',
    alt: '상품 등록',
  },
];

function MultilineText({ text }) {
  return text.split('\n').map((line) => (
    <span key={line}>
      {line}
      <br />
    </span>
  ));
}

function FeatureSection({ feature }) {
  return (
    <section className="home-content">
      <div
        className={`feature-card ${
          feature.reverse ? 'feature-card--reverse' : ''
        }`}
      >
        <img className="feature-card__image" src={feature.image} alt={feature.alt} />
        <div className="feature-card__text">
          <p className="feature-card__keyword">{feature.keyword}</p>
          <h2 className="feature-card__title">
            <MultilineText text={feature.title} />
          </h2>
          <p className="feature-card__description">
            <MultilineText text={feature.description} />
          </p>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero__inner">
          <div className="home-hero__text">
            <h1 className="home-hero__title">
              일상의 모든 물건을
              <br />
              거래해 보세요
            </h1>
            <a className="primary-button home-hero__button" href="#/market">
              구경하러 가기
            </a>
          </div>
          <img className="home-hero__image" src="/images/Img_home_top.png" alt="판다마켓 대표 이미지" />
        </div>
      </section>

      <div className="home-features">
        {features.map((feature) => (
          <FeatureSection key={feature.keyword} feature={feature} />
        ))}
      </div>

      <section className="home-bottom">
        <div className="home-bottom__inner">
          <h2 className="home-bottom__title">
            믿을 수 있는
            <br />
            판다마켓 중고 거래
          </h2>
          <img className="home-bottom__image" src="/images/Img_home_bottom.png" alt="판다마켓 하단 이미지" />
        </div>
      </section>
    </>
  );
}

export default HomePage;
