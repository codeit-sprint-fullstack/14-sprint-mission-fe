function AuthInput({ id, label, type, placeholder, value, error, onChange, onBlur }) {
  return (
    <>
      <label className="label" htmlFor={id}>{label}</label>
      <input
        className={`input${error ? ' error' : ''}`}
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <span className={`error-msg${error ? ' visible' : ''}`}>{error}</span>
    </>
  );
}

export default AuthInput;
