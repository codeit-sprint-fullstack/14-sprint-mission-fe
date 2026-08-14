import { useState, useEffect } from 'react'
import { useSignup } from '../hooks/useSignup.js';
import Link from 'next/link';
import Logo from '../components/logo.jsx'
import style from '@/styles/signup.module.css';
import InputEmail from '../components/inputemail.jsx';
import InputPwd from '../components/inputpwd.jsx';
import LoginSignupButton from '../components/loginsignupbutton.jsx';
import EasyLogin from '../components/easylogin.jsx';
import Modal from '../components/modal.jsx';

function Signup() {
    const signupMutation = useSignup();
    const [emailPass, setEmailPass] = useState(false);
    const [nicknamePass, setNicknamePass] = useState(false);
    const [pwdPass, setPwdPass] = useState(false);
    const [checkPwdPass, setCheckPwdPass] = useState(false);
    const [pwd, setPwd] = useState("");
    const [disabled, setDisabled] = useState(true); // 버튼 비활성화
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSignup = (e) => {
        e.preventDefault();
        const formData = {
            email: e.target.email.value,
            nickname: e.target.nickname.value,
            password: e.target.password.value,
            passwordConfirmation: e.target.passwordCheck.value,
        };
        console.log(formData);
        signupMutation.mutate(formData, {
            onError: (error) => {
                // 백엔드에서 내려주는 에러 메시지 확인
                const msg = error?.message
                    || error?.details?.email?.message
                    || "회원가입 중 오류가 발생했습니다.";
                setErrorMessage(msg); // ✅ 모달 열기
            }
        });
    }

    useEffect(() => {
        if (emailPass && pwdPass && nicknamePass && checkPwdPass) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    }, [emailPass, nicknamePass, pwdPass, checkPwdPass]);

    return (
        <main className={style.main}>
            <Logo />
            <div className={style.container}>
                <form onSubmit={handleSignup} className={style.form}>
                    <div className={style.Info}>
                        <h2>
                            이메일
                        </h2>
                        <InputEmail emailPass={setEmailPass} placeholder={`이메일을 입력해주세요`} type={`email`} name="email" />
                    </div>

                    <div className={style.Info}>
                        <h2>
                            닉네임
                        </h2>
                        <InputEmail emailPass={setNicknamePass} placeholder={`닉네임을 입력해주세요`} type={'nickname'} name="nickname" />
                    </div>

                    <div className={style.Info}>
                        <h2>
                            비밀번호
                        </h2>
                        <InputPwd pwdPass={setPwdPass} placeholder={`비밀번호를 입력해주세요`} type={`password`} setPWD={setPwd} name="password" />
                    </div>

                    <div className={style.Info}>
                        <h2>
                            비밀번호 확인
                        </h2>
                        <InputPwd pwdPass={setCheckPwdPass} placeholder={`비밀번호를 다시 입력해주세요`} type={`passwordCheck`} originalPwd={pwd} name="passwordCheck" />
                    </div>

                    <LoginSignupButton disabled={disabled} message="회원가입" />

                    <EasyLogin />
                </form>
                <div id={style.haveAccount}>
                    <p>
                        판다마켓이 계정이 있으신가요?
                    </p>
                    <Link href="/login">
                        로그인
                    </Link>
                </div>
            </div>
            {errorMessage && (
                <Modal
                    message={errorMessage}
                    onClose={() => setErrorMessage(null)}
                />
            )}
        </main>
    );
}

export default Signup;