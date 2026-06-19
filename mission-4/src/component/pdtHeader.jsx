const PdtHeader = ({ keyword, setKeyword, order, setOrder }) => {
  return (
    <div>
      <div>판매 중인 상품</div>
      <div>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색할 상품을 입력하세요"
        />
        <button>상품 등록하기</button>
        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="recent">최신순</option>
          <option value="favorite">좋아요</option>
        </select>
      </div>
    </div>
  );
};

export default PdtHeader;
