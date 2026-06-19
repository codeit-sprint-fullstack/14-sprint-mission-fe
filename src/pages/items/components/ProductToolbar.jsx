import { PRODUCT_SORT_OPTIONS } from '../../../constants/product'
import './ProductToolbar.css'

const ProductToolbar = () => {
  return (
    <div className="product-toolbar">
      <input
        className="product-toolbar__search"
        type="search"
        placeholder="검색할 상품을 입력해주세요"
      />

      <button className="product-toolbar__button" type="button">
        상품 등록하기
      </button>

      <select className="product-toolbar__select" defaultValue="recent">
        {PRODUCT_SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ProductToolbar
