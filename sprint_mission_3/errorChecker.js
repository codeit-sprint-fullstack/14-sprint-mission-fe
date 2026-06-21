export default function errorChecker(status) {
  if (status >= 200 && status < 300) {
    console.log("요청이 성공적으로 처리되었습니다.");
    return; // 성공은 에러를 던지지 않음
  }

  switch (status) {
    case 400:
      throw new Error("잘못된 요청입니다. (400)");
    case 401:
      throw new Error("인증이 필요합니다. (401)");
    case 403:
      throw new Error("권한이 없습니다. (403)");
    case 404:
      throw new Error("리소스를 찾을 수 없습니다. (404)");
    case 409:
      throw new Error("데이터 충돌이 발생했습니다. (409)");
    case 422:
      throw new Error("요청 데이터를 처리할 수 없습니다. (422)");
    case 500:
      throw new Error("서버 내부 오류입니다. (500)");
    case 502:
      throw new Error("잘못된 게이트웨이입니다. (502)");
    case 503:
      throw new Error("서비스를 사용할 수 없습니다. (503)");
    case 504:
      throw new Error("게이트웨이 타임아웃입니다. (504)");
    default:
      throw new Error(`알 수 없는 오류가 발생했습니다. (status: ${status})`);
  }
}