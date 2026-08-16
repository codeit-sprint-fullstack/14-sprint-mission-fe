const SIGNIN_ERROR_MESSAGE = {
  RETRY_LATER: "잠시 후 다시 시도해주세요.",
  CHECK_NETWORK_SETTING: "네트워크 환경을 확인해주세요.",
  UNDEFINED_ERROR: "로그인을 실행할 수 없습니다.",
};

//errorCode에 맞는 에러를 던짐
//네트워크가 응답이 없는 경우에는 해결이 안됌.
export function getErrorMessage(error) {
  const errorResponse = error.response;
  const errorMessage = errorResponse?.data?.message;
  const errorCode = errorResponse?.data?.status;

  if (!errorResponse) {
    return SIGNIN_ERROR_MESSAGE.CHECK_NETWORK_SETTING;
  } else if (errorMessage) {
    return errorMessage;
  } else if (errorCode === 500) {
    return SIGNIN_ERROR_MESSAGE.RETRY_LATER;
  } else {
    return SIGNIN_ERROR_MESSAGE.UNDEFINED_ERROR;
  }
}
