function FeatureRow({ label, title, description, image, reverse }) {
  return (
    <div className={`featureRow${reverse ? ' reverse' : ''}`}>
      <div className="inner">
        <img className="featureImage" src={image} alt={label} />
        <div className="featureText">
          <p className="featureLabel">{label}</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default FeatureRow;
