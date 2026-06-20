import { useMemo, useState } from 'react';
import AuthShell from '../components/AuthShell.jsx';
import FormField from '../components/FormField.jsx';
import MessageModal from '../components/MessageModal.jsx';
import PasswordField from '../components/PasswordField.jsx';
import {
  AUTH_MESSAGES,
  findUserByEmail,
  validateEmail,
  validatePassword,
} from '../utils/auth.js';

const initialValues = {
  email: '',
  password: '',
};

function LoginPage() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [modalMessage, setModalMessage] = useState('');

  const errors = useMemo(() => ({
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  }), [values]);

  const isSubmittable = values.email.trim() && values.password.trim() && !errors.email && !errors.password;

  const updateField = (name) => (event) => {
    setValues((current) => ({ ...current, [name]: event.target.value }));
  };

  const touchField = (name) => () => {
    setTouched((current) => ({ ...current, [name]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ email: true, password: true });

    if (!isSubmittable) {
      return;
    }

    const user = findUserByEmail(values.email);

    if (!user || user.password !== values.password.trim()) {
      setModalMessage(AUTH_MESSAGES.passwordMismatch);
      return;
    }

    window.location.hash = '/market';
  };

  return (
    <AuthShell>
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <FormField id="email" label="이메일" error={touched.email ? errors.email : ''}>
          <input
            id="email"
            className={`input-field ${touched.email && errors.email ? 'input-field-error' : ''}`}
            type="email"
            value={values.email}
            onChange={updateField('email')}
            onBlur={touchField('email')}
            placeholder="이메일을 입력해주세요"
            autoComplete="email"
            required
          />
        </FormField>

        <FormField id="password" label="비밀번호" error={touched.password ? errors.password : ''}>
          <PasswordField
            id="password"
            value={values.password}
            onChange={updateField('password')}
            onBlur={touchField('password')}
            placeholder="비밀번호를 입력해주세요"
            autoComplete="current-password"
            hasError={touched.password && errors.password}
          />
        </FormField>

        <button className="primary-button w-full" type="submit" disabled={!isSubmittable}>
          로그인
        </button>
      </form>

      <section className="mt-6 flex items-center justify-between rounded-lg bg-primary-50 px-6 py-4">
        <p className="font-medium text-gray-800">간편 로그인</p>
        <div className="flex gap-4">
          <a href="https://www.google.com/" target="_blank" rel="noreferrer" aria-label="Google">
            <img className="h-11 w-11" src="/images/Component 2@3x.png" alt="" />
          </a>
          <a href="https://www.kakao.com/" target="_blank" rel="noreferrer" aria-label="Kakao">
            <img className="h-11 w-11" src="/images/Component 3@3x.png" alt="" />
          </a>
        </div>
      </section>

      <p className="mt-6 text-center text-sm font-medium text-gray-800">
        판다마켓이 처음이신가요? <a className="text-primary underline" href="#/signup">회원가입</a>
      </p>

      <MessageModal message={modalMessage} onClose={() => setModalMessage('')} />
    </AuthShell>
  );
}

export default LoginPage;
