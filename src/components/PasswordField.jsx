import { useState } from 'react';

function PasswordField({ id, value, onChange, onBlur, placeholder, autoComplete, hasError }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        className={`input-field pr-14 ${hasError ? 'input-field-error' : ''}`}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
      />
      <button
        type="button"
        className="absolute right-4 top-1/2 -translate-y-1/2"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? '비밀번호 숨기기' : '비밀번호 보기'}
      >
        <img
          className="h-6 w-6"
          src={visible ? '/images/btn_visibility_off_24px.png' : '/images/btn_visibility_on_24px.png'}
          alt=""
        />
      </button>
    </div>
  );
}

export default PasswordField;
