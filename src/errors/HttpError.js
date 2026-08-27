// 서비스 레이어에서 상태코드를 담아 던지는 에러.
// server.js 의 에러 핸들러가 err.status / err.message 를 그대로 사용한다.
export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

export const BadRequest = (msg) => new HttpError(400, msg);
export const Unauthorized = (msg) => new HttpError(401, msg);
export const Forbidden = (msg) => new HttpError(403, msg);
export const NotFound = (msg) => new HttpError(404, msg);
export const Conflict = (msg) => new HttpError(409, msg);
export const Unprocessable = (msg) => new HttpError(422, msg);
