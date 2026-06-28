import './FeatureSection.css'

const FeatureSection = ({
  imageSrc,
  imageAlt,
  badge,
  title,
  description,
  imageOnLeft = true,
}) => {
  return (
    <section className="feature-section">
      <div
        className={`feature-section__content ${
          imageOnLeft ? '' : 'feature-section__content--image-right'
        }`}
      >
        <img src={imageSrc} alt={imageAlt} className="feature-section__image" />
        <div className="feature-section__text">
          <span className="feature-section__badge">{badge}</span>
          <h2 className="feature-section__title">{title}</h2>
          <p className="feature-section__description">{description}</p>
        </div>
      </div>
    </section>
  )
}
export default FeatureSection
