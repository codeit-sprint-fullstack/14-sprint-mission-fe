import heroImage from '../../../assets/images/img_home_top.svg'
import './HeroSection.css'

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-section__content">
        <div className="hero-section__wrapper">
          <div className="hero-section__text">
            <h1 className="hero-section__title">
              일상의 모든 물건을 <br />
              거래해 보세요
            </h1>
            <a href="/items/" className="hero-section__button">
              구경하러가기
            </a>
          </div>
          <img
            src={heroImage}
            alt="판다마켓 메인 히어로 이미지"
            className="hero-section__image"
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
