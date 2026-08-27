import { OAuth2Client } from "google-auth-library";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const client = GOOGLE_CLIENT_ID ? new OAuth2Client(GOOGLE_CLIENT_ID) : null;

function ensureConfigured() {
  if (!client) throw new Error("GOOGLE_CLIENT_ID 환경변수가 설정되지 않았습니다.");
}

function toProfile({ sub, email, email_verified, name, picture }) {
  return { googleId: sub, email, emailVerified: email_verified, name, picture };
}

// GIS <GoogleLogin> 이 주는 credential(ID 토큰) 검증
export async function verifyGoogleIdToken(idToken) {
  ensureConfigured();
  const ticket = await client.verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID });
  return toProfile(ticket.getPayload());
}

// useGoogleLogin(implicit flow) 이 주는 access token 검증 + 프로필 조회
export async function verifyGoogleAccessToken(accessToken) {
  ensureConfigured();

  // 1) 이 토큰이 우리 Client 로 발급됐는지 확인
  const tokenInfo = await client.getTokenInfo(accessToken);
  if (tokenInfo.aud !== GOOGLE_CLIENT_ID) {
    throw new Error("access token 의 audience 가 일치하지 않습니다.");
  }

  // 2) 이름/사진은 userinfo 에서
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const userInfo = res.ok ? await res.json() : {};

  return toProfile({
    sub: tokenInfo.sub ?? userInfo.sub,
    email: tokenInfo.email ?? userInfo.email,
    email_verified: tokenInfo.email_verified ?? userInfo.email_verified,
    name: userInfo.name,
    picture: userInfo.picture,
  });
}
