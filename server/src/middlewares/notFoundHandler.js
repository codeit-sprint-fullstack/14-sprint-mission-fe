import createHttpError from "../utils/createHttpError.js";

export default function notFoundHandler(req, res, next) {
  next(createHttpError(404, "요청한 경로를 찾을 수 없습니다."));
}
