import { Link } from 'react-router-dom'

import pandaFace from '../img/판다얼굴.png'

function AuthLogo() {
  return (
    <Link
      to="/"
      className="pandaLogo"
    >
      <img
        src={pandaFace}
        alt="판다 얼굴"
        className="pandaFace"
      />

      <h1 className="pandaText">
        판다마켓
      </h1>
    </Link>
  )
}

export default AuthLogo