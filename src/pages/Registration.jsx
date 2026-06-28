import '../styles/registration.css';



function Registration() {
  return (
    <div className="registrationPage">
      <div className="inner">
        <div className="registrationHeader">
          <h1>상품 등록하기</h1>
          <button className="submitBtn">등록</button>
        </div>

        <div className="formGroup">
          <label>상품명</label>
          <input type="text" placeholder="상품명을 입력해주세요" />
        </div>

        <div className="formGroup">
          <label>상품 소개</label>
          <textarea placeholder="상품 소개를 입력해주세요" />
        </div>

        <div className="formGroup">
          <label>판매가격</label>
          <input type="number" placeholder="판매 가격을 입력해주세요" />
        </div>

        <div className="formGroup">
          <label>태그</label>
          <input type="text" placeholder="태그를 입력해주세요" />
        </div>
      </div>
    </div>
  );
}

export default Registration;