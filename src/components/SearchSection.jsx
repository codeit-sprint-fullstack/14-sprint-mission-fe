import { useState } from 'react'
import magnifierImage from '../img/Magnifier.png'

function SearchSection() {

  return (
    <div className="panda6">
      <div className="gray_box2">
        <div className="search_text_group">
          <p className="search_text1">
            Search
          </p>

          <h1 className="search_text2">
            구매를 원하는
            <br />
            상품을 검색하세요
          </h1>

          <p className="search_text3">
            구매하고 싶은 물품은 검색해서
            <br />
            쉽게 찾아보세요
          </p>
        </div>

        <img
          src={magnifierImage}
          alt="돋보기 이미지"
          className="Magnifier"
        />
      </div>
    </div>
  )
}

export default SearchSection