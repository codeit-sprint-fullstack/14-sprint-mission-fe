import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";
import style from "./easylogin.module.css";

function EasyLogin() {
  const googleLogin = useGoogleLogin();
  const hasClientId = Boolean(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

  return (
    <div className={style.easy_login}>
      <div className={style.outside_box}>
        <p>간편 로그인하기</p>
        <div id={style.component}>
          {hasClientId ? (
            <GoogleLogin
              onSuccess={(res) => {
                if (res.credential) {
                  googleLogin.mutate(res.credential, {
                    onError: (err) => toast.error(err.message || "구글 로그인에 실패했습니다."),
                  });
                }
              }}
              onError={() => toast.error("구글 로그인이 취소되었거나 실패했습니다.")}
            />
          ) : (
            <a href="https://www.google.com/">
              <img src="/assets/Google.png" alt="Google" />
            </a>
          )}
          <a href="https://www.kakaocorp.com/page/">
            <img src="/assets/Kakao.png" alt="Kakao" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default EasyLogin;
