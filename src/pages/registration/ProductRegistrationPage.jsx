import MainLayout from '../../components/layout/MainLayout.jsx'
import './ProductRegistrationPage.css'

const ProductRegistrationPage = () => {
  return (
    <MainLayout>
      <div className="product-registration-page">
        <form className="product-registration-form">
          <div className="product-registration-form__header">
            <h1 className="product-registration-page__title">상품 등록하기</h1>
            <button
              type="button"
              className="product-registration-page__submit-button"
            >
              등록
            </button>
          </div>

          <label className="product-registration-form__field">
            <span className="product-registration-form__label">상품명</span>
            <input
              className="product-registration-form__input"
              type="text"
              placeholder="상품명을 입력해 주세요"
            />
          </label>
          <label className="product-registration-form__field">
            <span className="product-registration-form__label">상품소개</span>
            <textarea
              className="product-registration-form__textarea"
              placeholder="상품소개를 입력해 주세요"
              rows={10}
            />
          </label>
          <label className="product-registration-form__field">
            <span className="product-registration-form__label">판매가격</span>
            <input
              className="product-registration-form__input"
              type="number"
              placeholder="판매가격을 입력해 주세요"
            />
          </label>
          <label className="product-registration-form__field">
            <span className="product-registration-form__label">태그</span>
            <input
              className="product-registration-form__input"
              type="text"
              placeholder="태그를 입력해 주세요"
            />
          </label>
        </form>
      </div>
    </MainLayout>
  )
}

export default ProductRegistrationPage
