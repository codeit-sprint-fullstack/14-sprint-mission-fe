export function getApiErrorMessage(error, fallbackMessage) {
  const status = error?.response?.status;
  const serverMessage = error?.response?.data?.message;

  if (typeof serverMessage === "string" && serverMessage.trim()) {
    return serverMessage;
  }

  if (status === 400) {
    return "요청 내용을 다시 확인해 주세요.";
  }

  if (status === 401) {
    return "로그인이 필요하거나 인증이 만료되었습니다.";
  }

  if (status === 403) {
    return "이 작업을 수행할 권한이 없습니다.";
  }

  if (status === 404) {
    return "요청한 정보를 찾을 수 없습니다.";
  }

  if (status === 409) {
    return "이미 존재하는 데이터입니다.";
  }

  if (status >= 500) {
    return "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
  }

  return fallbackMessage;
}
