'use client';

export default function GlobalError({ error, reset }) {
  return (
    <main className="content-width flex min-h-screen flex-col items-center justify-center gap-5 py-20 text-center">
      <h1 className="text-4xl font-bold leading-tight text-gray-800">문제가 발생했습니다</h1>
      <p className="text-base text-gray-600">{error.message || '잠시 후 다시 시도해주세요.'}</p>
      <button className="primary-button px-8" type="button" onClick={reset}>다시 시도</button>
    </main>
  );
}
