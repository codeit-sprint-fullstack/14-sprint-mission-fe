import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import FeatureRow from '../components/FeatureRow';

const FEATURES = [
  {
    label: 'Hot Item',
    image: '/img/panda_body1.png',
    title: <>인기 상품을<br />확인해 보세요</>,
    description: <>가장 HOT한 중고거래 물품을<br />판다 마켓에서 확인해 보세요</>,
  },
  {
    label: 'Search',
    image: '/img/panda_body2.png',
    title: <>구매를 원하는<br />상품을 검색하세요</>,
    description: <>구매하고 싶은 물품은 검색해서<br />쉽게 찾아보세요</>,
    reverse: true,
  },
  {
    label: 'Register',
    image: '/img/panda_body3.png',
    title: <>판매를 원하는<br />상품을 등록하세요</>,
    description: <>어떤 물건이든 판매하고 싶은 상품을<br />쉽게 등록하세요</>,
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* 히어로 배너 */}
      <div className="hero">
        <div className="inner">
          <div className="heroText">
            <h1>일상의 모든 물건을<br />거래해 보세요</h1>
            <button className="shopButton" onClick={() => navigate('/items')}>구경해보러 가기</button>
          </div>
          <img className="heroImage" src="/img/panda_home.png" alt="판다 홈 이미지" />
        </div>
      </div>

      {/* 피처 섹션 */}
      <div className="featuresWrap">
        {FEATURES.map((feature) => (
          <FeatureRow key={feature.label} {...feature} />
        ))}
      </div>

      {/* 하단 신뢰 섹션 */}
      <div className="trust">
        <div className="inner">
          <h2>믿을 수 있는<br />판다마켓 중고 거래</h2>
          <img className="trustImage" src="/img/panda_footer.png" alt="판다마켓 중고 거래" />
        </div>
      </div>

      {/* 푸터 */}
      <Footer />
    </>
  );
}

export default Home;
