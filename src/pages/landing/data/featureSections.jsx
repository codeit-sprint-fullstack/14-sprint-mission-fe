import popularImage from '../../../assets/images/img_popular.svg'
import registerImage from '../../../assets/images/img_register.svg'
import searchImage from '../../../assets/images/img_search.svg'

export const featureSections = [
  {
    badge: 'Hot item',
    title: (
      <>
        인기 상품을 <br />
        확인해 보세요
      </>
    ),
    description: '가장 HOT한 중고거래 물품을 판다 마켓에서 확인해 보세요',
    imageSrc: popularImage,
    imageAlt: '인기 상품 섹션 이미지',
    imageOnLeft: true,
  },
  {
    badge: 'Search',
    title: (
      <>
        구매를 원하는 <br />
        상품을 검색하세요
      </>
    ),
    description: '구매하고 싶은 물품은 검색해서 쉽게 찾아보세요',
    imageSrc: searchImage,
    imageAlt: '상품 검색 섹션 이미지',
    imageOnLeft: false,
  },
  {
    badge: 'Register',
    title: (
      <>
        판매를 원하는 <br />
        상품을 등록하세요
      </>
    ),
    description: '어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요',
    imageSrc: registerImage,
    imageAlt: '상품 등록 섹션 이미지',
    imageOnLeft: true,
  },
]
