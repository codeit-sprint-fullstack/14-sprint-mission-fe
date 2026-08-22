export default function FreeBoardLoading() {
  return (
    <main className="board-main" aria-busy="true">
      <section className="board-section">
        <h1 className="board-title">자유게시판</h1>
        <p className="board-status">게시글을 불러오는 중입니다.</p>
      </section>
    </main>
  );
}
