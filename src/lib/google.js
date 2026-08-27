import { OAuth2Client } from "google-auth-library";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const client = GOOGLE_CLIENT_ID ? new OAuth2Client(GOOGLE_CLIENT_ID) : null;

// 프론트(Google Identity Services)가 넘겨준 credential(ID 토큰)을 검증하고
// 프로필 정보를 반환한다.
export async function verifyGoogleIdToken(idToken) {
  if (!client) {
    throw new Error("GOOGLE_CLIENT_ID 환경변수가 설정되지 않았습니다.");
  }

  const ticket = await client.verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID });
  const payload = ticket.getPayload();

  return {
    googleId: payload.sub,
    email: payload.email,
    emailVerified: payload.email_verified,
    name: payload.name,
    picture: payload.picture,
  };
}
