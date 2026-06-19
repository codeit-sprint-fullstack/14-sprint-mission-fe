import { Link } from 'react-router-dom'
import AuthLayout from './components/AuthLayout'
import SocialLoginSection from './components/SocialLoginSection'
import AuthTextField from './components/AuthTextField'
import AuthPasswordField from './components/AuthPasswordField'

const LoginPage = () => {
  return (
    <AuthLayout title="로그인">
      <form className="auth-page__form">
        <div className="auth-page__input-group">
          <AuthTextField
            id="email"
            label="이메일"
            type="email"
            placeholder="이메일을 입력해주세요"
          />
          <AuthPasswordField
            id="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            ariaLabel="비밀번호 보기"
          />
        </div>

        <button type="submit" className="auth-page__login-button">
          로그인
        </button>
        <SocialLoginSection />
        <span className="auth-page__signup-prompt">
          판다마켓이 처음이신가요? <Link to="/signup">회원가입</Link>
        </span>
      </form>
    </AuthLayout>
  )
}
export default LoginPage
