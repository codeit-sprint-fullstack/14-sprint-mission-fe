import clothesImage from '../img/Img_clothes_01.png'

function HotItem() {

  return (
    <div className="hot_item">
      <div className="gray_box">
        <img
          src={clothesImage}
          alt="의류 이미지"
          className="clothes"
        />

        <div className="panda5">
          <p className="hot_item_text1">
            Hot item
          </p>

          <h1 className="hot_item_text2">
            인기 상품을
            <br />
            확인해 보세요
          </h1>

          <p className="hot_item_text3">
            가장 HOT한 중고거래 물품을
            <br />
            판다 마켓에서 확인해보세요
          </p>

        </div>
      </div>
    </div>
  )
}

export default HotItem