import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import style from "./easylogin.module.css";

function EasyLogin() {
  const googleAuth = useGoogleAuth();
  const hasClientId = Boolean(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

  // 커스텀 이미지 버튼용 — 클릭 시 구글 팝업 → access token → 백엔드
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      googleAuth.mutate(tokenResponse.access_token, {
        onError: (err) => toast.error(err.message || "구글 로그인에 실패했습니다."),
      });
    },
    onError: () => toast.error("구글 로그인이 취소되었거나 실패했습니다."),
  });

  const handleGoogleClick = (e) => {
    e.preventDefault();
    if (!hasClientId) {
      toast.error("구글 로그인이 설정되지 않았습니다.");
      return;
    }
    login();
  };

  return (
    <div className={style.easy_login}>
      <div className={style.outside_box}>
        <p>간편 로그인하기</p>
        <div id={style.component}>
          <a href="#" onClick={handleGoogleClick}>
            <img src="/assets/Google.png" alt="Google 로그인" />
          </a>
          <a href="https://www.kakaocorp.com/page/">
            <img src="/assets/Kakao.png" alt="Kakao" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default EasyLogin;
