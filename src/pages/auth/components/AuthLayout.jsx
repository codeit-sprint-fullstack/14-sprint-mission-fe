import { Link } from 'react-router-dom'
import logo from '../../../assets/logos/logo.svg'
import '../AuthPage.css'

const AuthLayout = ({ title, children }) => {
  return (
    <main className="auth-page">
      <h1 className="visually-hidden">{title}</h1>
      <Link to="/">
        <img src={logo} alt="판다마켓 로고" className="auth-page__logo" />
      </Link>
      {children}
    </main>
  )
}
export default AuthLayout
