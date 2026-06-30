import './Body.css'
import moreButton from './assets/Img_home_top.png'
import bodyHome from './assets/Img_home_01.png'
import bodyHome2 from './assets/Img_home_02.png'
import bodyHome3 from './assets/Img_home_03.png'
import bodyHome4 from './assets/Img_home_bottom.png'

function Body() {
  return (
    <>
      <div className="hero">
        <div className="heroInner">
          <div className="heroTextBox">
            <div className="heroTitle">일상의 모든 물건을<br />
              거래해 보세요</div>
            <a className="moreButton" href="items.html">구경하러 가기</a></div>
          <div><img src={moreButton} alt="배경"></img></div>
        </div>
      </div>

      <div className="overallBody">
        <div className="bodySection">
          <div className="bodyInner home01">
            <div><img src={bodyHome} alt=""></img></div>
            <div className="bodyTextBox">
              <div className="titleGroup">
                <div className="title4">Hot item</div>
                <div className="title2">인기 상품을<br />
                  확인해 보세요
                </div>
              </div>
              <div className="title3">가장 HOT한 중고거래 물품을<br />판다 마켓에서 확인해 보세요</div>
            </div>
          </div>
        </div>

        <div className="bodySection">
          <div className="bodyInner home02">
            <div className="bodyTextBox">
              <div className="titleGroup">
                <div className="title4">Search</div>
                <div className="title2">구매를 원하는<br />
                  상품을 검색하세요
                </div>
              </div>
              <div className="title3">구매하고 싶은 물품은 검색해서<br />쉽게 찾아보세요</div>
            </div>
            <div><img src={bodyHome2} alt=""></img></div>
          </div>
        </div>

        <div className="bodySection">
          <div className="bodyInner home01">
            <div><img src={bodyHome3} alt=""></img></div>
            <div className="bodyTextBox">
              <div className="titleGroup">
                <div className="title4">Register</div>
                <div className="title2">판매를 원하는<br />
                  상품을 등록하세요
                </div>
              </div>
              <div className="title3">어떤 물건이든 판매하고 싶은<br />상품을 쉽게 등록하세요</div>
            </div>
          </div>
        </div>
      </div>

      <div className="heroBottom">
        <div className="heroInner">
          <div className="heroTextBox">
            <div className="heroTitle">믿을 수 있는<br />
              판다마켓 중고 거래</div>
          </div>
          <div><img src={bodyHome4} alt="배경"></img></div>
        </div>
      </div>
    </>
  )
}

export default Body