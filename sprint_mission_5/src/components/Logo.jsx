import logoImg from '../assets/판다 얼굴.svg';
import { Link } from 'react-router-dom';

function Logo({className}) {
  return (
  <Link to='/' className={className}>
    <img src={logoImg} alt="Logo" />
    <h1>판다마켓</h1>
  </Link>
  )
}

export default Logo;