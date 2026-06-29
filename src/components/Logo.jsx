import logoImg from '../assets/판다 얼굴.svg';
import { Link } from 'react-router-dom';
import style from '../style/Logo.module.css';

function Logo() {
  return (
  <Link to='/' className={style.Logo}>
    <img src={logoImg} alt="Logo" />
    <h1>판다마켓</h1>
  </Link>
  )
}

export default Logo;