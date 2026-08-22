'use client';

export default function FreeBoardError({ error, reset }) {
  return (
    <main className="board-main">
      <section className="board-section">
        <h1 className="board-title">게시글을 불러오지 못했습니다</h1>
        <p className="board-status">{error.message || '잠시 후 다시 시도해주세요.'}</p>
        <button className="board-primary-button" type="button" onClick={reset}>다시 시도</button>
      </section>
    </main>
  );
}
