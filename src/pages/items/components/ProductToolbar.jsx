import { PRODUCT_SORT_OPTIONS } from '../../../constants/product'
import { useNavigate } from 'react-router-dom'
import './ProductToolbar.css'

const ProductToolbar = ({
  keyword,
  orderBy,
  onKeywordChange,
  onOrderByChange,
}) => {
  const navigate = useNavigate()

  return (
    <div className="product-toolbar">
      <input
        className="product-toolbar__search"
        type="search"
        placeholder="검색할 상품을 입력해주세요"
        value={keyword}
        onChange={(event) => onKeywordChange(event.target.value)}
      />

      <button
        className="product-toolbar__button"
        type="button"
        onClick={() => navigate('/registration')}
      >
        상품 등록하기
      </button>

      <select
        className="product-toolbar__select"
        value={orderBy}
        onChange={(event) => onOrderByChange(event.target.value)}
      >
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
