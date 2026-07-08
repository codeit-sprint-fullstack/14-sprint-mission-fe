import './RegistForm.css'

function RegistForm ({ onSubmit }) {
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   onSubmit(formData);
  // };
  
  return (
    <form action={onSubmit}>
      <div className="section-title-header">
        <h2 className="section-title">상품 등록하기</h2>
        <button className="bt-primary">등록</button>
      </div>
      <div className="section-item-input">
      <label htmlFor="name" >
        상품명
        <input type="text" id="name" name="name" placeholder="상품명을 입력해주세요"/>
      </label>
      <label htmlFor="description">
        상품 소개
        <textarea type="text" id="description" name="description" placeholder="상품 소개를 입력해주세요"/>
      </label>
      <label htmlFor="price">
        판매가격
        <input type="text" id="price" name="price" placeholder="판매 가격을 입력해주세요"/>
      </label>
      <label htmlFor="tags">
        태그
        <input type="text" id="tags" name="tags" placeholder="태그를 입력해주세요"/>
      </label>
      </div>
    </form>
   );
}

export default RegistForm;