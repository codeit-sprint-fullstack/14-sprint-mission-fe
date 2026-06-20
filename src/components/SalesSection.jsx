import salesImage from '../img/Img01.png'

function SalesSection() {
  return (
    <div className="panda7">
      <div className="gray_box3">
        <img
          src={salesImage}
          alt="판매 등록 이미지"
          className="Sales"
        />

        <div className="sales_text_group">
          <p className="sales1">
            Register
          </p>

          <h1 className="sales2">
            판매를 원하는
            <br />
            상품을 등록하세요
          </h1>

          <p className="sales3">
            어떤 물건이든 판매하고 싶은 상품을
            <br />
            쉽게 등록하세요
          </p>
        </div>
      </div>
    </div>
  )
}

export default SalesSection