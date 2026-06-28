import trustImage from '../../../assets/images/img_home_bottom.svg'
import './TrustSection.css'

const TrustSection = () => {
  return (
    <section className="trust-section">
      <div className="trust-section__content">
        <h2 className="trust-section__title">
          믿을 수 있는 <br />
          판다마켓 중고거래
        </h2>
        <img
          src={trustImage}
          alt="믿을 수 있는 판다마켓 이미지"
          className="trust-section__image"
        />
      </div>
    </section>
  )
}
export default TrustSection
