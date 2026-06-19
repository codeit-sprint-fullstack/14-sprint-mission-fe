import { Link } from 'react-router-dom'
import AuthLayout from './components/AuthLayout'
import SocialLoginSection from './components/SocialLoginSection'
import AuthTextField from './components/AuthTextField'
import AuthPasswordField from './components/AuthPasswordField'

const SignupPage = () => {
  return (
    <AuthLayout title="회원가입">
      <form className="auth-page__form">
        <div className="auth-page__input-group">
          <AuthTextField
            id="email"
            label="이메일"
            type="email"
            placeholder="이메일을 입력해주세요"
          />
          <AuthTextField
            id="username"
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
          />
          <AuthPasswordField
            id="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            ariaLabel="비밀번호 보기"
          />
          <AuthPasswordField
            id="password-check"
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 한번 입력해주세요"
            ariaLabel="비밀번호 확인 보기"
          />
        </div>
        <button type="submit" className="auth-page__signup-button">
          회원가입
        </button>
        <SocialLoginSection />
        <span className="auth-page__signup-prompt">
          이미 회원이신가요? <Link to="/login">로그인</Link>
        </span>
      </form>
    </AuthLayout>
  )
}
export default SignupPage
