const AuthTextField = ({ id, label, type = 'text', placeholder }) => {
  return (
    <div className="auth-page__input-set">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} placeholder={placeholder} />
    </div>
  )
}
export default AuthTextField
