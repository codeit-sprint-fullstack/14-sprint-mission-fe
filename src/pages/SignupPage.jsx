import { useMemo, useState } from 'react';
import AuthShell from '../components/AuthShell.jsx';
import FormField from '../components/FormField.jsx';
import MessageModal from '../components/MessageModal.jsx';
import PasswordField from '../components/PasswordField.jsx';
import {
  AUTH_MESSAGES,
  getSignupPasswordChecks,
  isRegisteredEmail,
  validateEmail,
  validatePasswordConfirm,
  validateSignupPassword,
} from '../utils/auth.js';

const initialValues = {
  email: '',
  nickname: '',
  password: '',
  passwordConfirm: '',
};

const passwordRules = [
  ['length', '10자 이상'],
  ['letters', '영문 대문자와 소문자 포함'],
  ['number', '숫자 포함'],
  ['special', '특수문자 포함'],
];

function SignupPage() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [modalMessage, setModalMessage] = useState('');

  const passwordChecks = useMemo(() => getSignupPasswordChecks(values.password), [values.password]);
  const errors = useMemo(() => ({
    email: validateEmail(values.email),
    password: validateSignupPassword(values.password),
    passwordConfirm: validatePasswordConfirm(values.password, values.passwordConfirm),
  }), [values]);

  const hasEmptyField = Object.values(values).some((value) => !value.trim());
  const isSubmittable = !hasEmptyField && !errors.email && !errors.password && !errors.passwordConfirm;

  const updateField = (name) => (event) => {
    setValues((current) => ({ ...current, [name]: event.target.value }));
  };

  const touchField = (name) => () => {
    setTouched((current) => ({ ...current, [name]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ email: true, password: true, passwordConfirm: true });

    if (!isSubmittable) {
      return;
    }

    if (isRegisteredEmail(values.email)) {
      setModalMessage(AUTH_MESSAGES.emailInUse);
      return;
    }

    window.location.hash = '/login';
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
            placeholder="이메일을 입력하세요"
            autoComplete="email"
            required
          />
        </FormField>

        <FormField id="nickname" label="닉네임">
          <input
            id="nickname"
            className="input-field"
            type="text"
            value={values.nickname}
            onChange={updateField('nickname')}
            placeholder="닉네임을 입력해주세요"
            autoComplete="nickname"
            required
          />
        </FormField>

        <FormField
          id="password"
          label="비밀번호"
          error={touched.password && errors.password !== AUTH_MESSAGES.passwordForbiddenSpecial ? errors.password : ''}
        >
          <PasswordField
            id="password"
            value={values.password}
            onChange={updateField('password')}
            onBlur={touchField('password')}
            placeholder="비밀번호를 입력해주세요"
            autoComplete="new-password"
            hasError={touched.password && errors.password}
          />
          {values.password || touched.password ? (
            <ul className="space-y-1 text-sm font-medium leading-5">
              {passwordRules.map(([key, label]) => {
                const isValid = key === 'special'
                  ? passwordChecks.special && passwordChecks.forbidden
                  : passwordChecks[key];
                const isInvalid = values.password && !isValid;

                return (
                  <li
                    key={key}
                    className={`flex flex-wrap items-center gap-2 ${
                      isValid ? 'text-primary' : isInvalid ? 'text-error' : 'text-gray-400'
                    }`}
                  >
                    <span
                      className={`h-3 w-3 rounded-full border-2 ${
                        isValid ? 'border-primary bg-primary' : isInvalid ? 'border-error' : 'border-gray-400'
                      }`}
                    />
                    {label}
                    {key === 'special' && values.password && !passwordChecks.forbidden ? (
                      <span>{AUTH_MESSAGES.passwordForbiddenSpecial}</span>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </FormField>

        <FormField id="passwordConfirm" label="비밀번호 확인" error={touched.passwordConfirm ? errors.passwordConfirm : ''}>
          <PasswordField
            id="passwordConfirm"
            value={values.passwordConfirm}
            onChange={updateField('passwordConfirm')}
            onBlur={touchField('passwordConfirm')}
            placeholder="비밀번호를 다시 한번 입력해주세요"
            autoComplete="new-password"
            hasError={touched.passwordConfirm && errors.passwordConfirm}
          />
        </FormField>

        <button className="primary-button w-full" type="submit" disabled={!isSubmittable}>
          회원가입
        </button>
      </form>

      <section className="mt-6 flex items-center justify-between rounded-lg bg-primary-50 px-6 py-4">
        <p className="font-medium text-gray-800">간편 회원가입</p>
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
        이미 회원이신가요? <a className="text-primary underline" href="#/login">로그인</a>
      </p>

      <MessageModal message={modalMessage} onClose={() => setModalMessage('')} />
    </AuthShell>
  );
}

export default SignupPage;
