import { useState } from 'react'
import visibilityOffIcon from '../../../assets/icons/ic_visibility_off.svg'

const AuthPasswordField = ({
  id,
  label,
  placeholder,
  ariaLabel,
  name,
  value,
  onChange,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <div className="auth-page__input-set">
      <label htmlFor={id}>{label}</label>
      <div className="auth-page__password-wrapper">
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <button
          type="button"
          className="auth-page__visibility-button"
          aria-label={ariaLabel}
          aria-pressed={isPasswordVisible}
          onClick={() => setIsPasswordVisible((prevValue) => !prevValue)}
        >
          <img src={visibilityOffIcon} alt="" />
        </button>
      </div>
    </div>
  )
}

export default AuthPasswordField
