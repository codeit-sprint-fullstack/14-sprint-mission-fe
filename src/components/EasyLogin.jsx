import googleImage from '../img/google.png'
import kakaoImage from '../img/kakao.png'

function EasyLogin() {
  return (
    <div className="Easy_login_group">
      <div className="Easy_login1">
        <p className="Easy_login2">
          간편 로그인하기
        </p>
      </div>

      <div className="Easy_login_logo_group">
        <a
          href="https://www.google.com/"
          className="link_underline"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={googleImage}
            alt="구글 로고"
            className="google_logo"
          />
        </a>

        <a
          href="https://www.kakaocorp.com/page/"
          className="link_underline"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={kakaoImage}
            alt="카카오톡 로고"
            className="kakao_logo"
          />
        </a>
      </div>
    </div>
  )
}

export default EasyLogin