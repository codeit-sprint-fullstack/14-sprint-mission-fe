import { Link } from 'react-router-dom'
import AuthLayout from './components/AuthLayout'
import visibilityOffIcon from '../../assets/icons/btn_visibility_off.svg'
import googleIcon from '../../assets/icons/ic_google.svg'
import kakaoIcon from '../../assets/icons/ic_kakao.svg'

const SignupPage = () => {
  return (
    <AuthLayout title="회원가입">
      <form className="auth-page__form">
        <div className="auth-page__input-group">
          <div className="auth-page__input-set">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력해주세요"
            />
          </div>
          <div className="auth-page__input-set">
            <label htmlFor="username">닉네임</label>
            <input
              type="text"
              id="username"
              placeholder="닉네임을 입력해주세요"
            />
          </div>
          <div className="auth-page__input-set">
            <label htmlFor="password">비밀번호</label>
            <div className="auth-page__password-wrapper">
              <input
                className="password"
                type="password"
                id="password"
                placeholder="비밀번호를 입력해주세요"
              />
              <button
                type="button"
                className="auth-page__visibility-button"
                aria-label="비밀번호 보기"
              >
                <img src={visibilityOffIcon} alt="" className="visibility" />
              </button>
            </div>
          </div>
          <div className="auth-page__input-set">
            <label htmlFor="password-check">비밀번호 확인</label>
            <div className="auth-page__password-wrapper">
              <input
                className="password"
                type="password"
                id="password-check"
                placeholder="비밀번호를 다시 한번 입력해주세요"
              />
              <button
                type="button"
                className="auth-page__visibility-button"
                aria-label="비밀번호 확인 보기"
              >
                <img src={visibilityOffIcon} alt="" className="visibility" />
              </button>
            </div>
          </div>
        </div>
        <button type="submit" className="auth-page__signup-button">
          회원가입
        </button>
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
        <span className="auth-page__signup-prompt">
          이미 회원이신가요? <Link to="/login">로그인</Link>
        </span>
      </form>
    </AuthLayout>
  )
}
export default SignupPage
