import homeImage from '../img/Img_home_top.png'

function HeroSection() {


  return (
    <div className="hot_sangpum">
      <div className="gugyeong">
        <h1 className="gugyeong_text1">
          일상의 모든 물건을
          <br />
          거래해 보세요.
        </h1>

        <div className="gugyeong_button_group">
          <a
            href="/items"
            className="gugyeong_button"
          >
            구경하러 가기
          </a>
        </div>

      </div>

      <div>
        <img
          src={homeImage}
          alt="판다 집"
          className="panda_shopping"
        />
      </div>
    </div>
  )
}

export default HeroSection