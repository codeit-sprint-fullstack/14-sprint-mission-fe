import googleIcon from '../../../assets/icons/ic_google.svg'
import kakaoIcon from '../../../assets/icons/ic_kakao.svg'

const SocialLoginSection = () => {
  return (
    <div className="auth-page__social-group">
      간편 로그인하기
      <div className="auth-page__social-button">
        <a
          href="https://www.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={googleIcon} alt="구글 아이콘" />
        </a>
        <a
          href="https://www.kakaocorp.com/page/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={kakaoIcon} alt="카카오 아이콘" />
        </a>
      </div>
    </div>
  )
}
export default SocialLoginSection
