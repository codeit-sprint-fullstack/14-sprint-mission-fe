export class AppError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'AppError';
    this.status = status;
  }
}

export function getErrorResponse(error, fallbackMessage = '요청을 처리하지 못했습니다.') {
  const status = error instanceof AppError ? error.status : 500;
  const message = error instanceof AppError ? error.message : fallbackMessage;

  if (!(error instanceof AppError)) {
    console.error(error);
  }

  return Response.json({ message }, { status });
}

export async function readJson(request) {
  try {
    return await request.json();
  } catch {
    throw new AppError(400, 'JSON 요청 본문이 올바르지 않습니다.');
  }
}
