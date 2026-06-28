import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/registration.css';

function Registration() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);

  // Enter 키 누르면 태그 추가
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]); // 기존 태그 배열에 새 태그 추가
      setTagInput(''); // input 초기화
    }
  };

  // X 버튼 누르면 해당 태그 제거
  const handleTagRemove = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
    // 클릭한 태그의 index만 제외하고 새 배열 생성
  };

  return (
    <div className="registrationPage">
      <div className="inner">
        <div className="registrationHeader">
          <h1>상품 등록하기</h1>
          <button className="submitBtn"onClick={() => navigate('/items/1')}>등록</button>
        </div>

        <div className="formGroup">
          <label>상품명</label>
          <input
            type="text"
            placeholder="상품명을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="formGroup">
          <label>상품 소개</label>
          <textarea
            placeholder="상품 소개를 입력해주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="formGroup">
          <label>판매가격</label>
          <input
            type="number"
            placeholder="판매 가격을 입력해주세요"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="formGroup">
          <label>태그</label>
          <input
            type="text"
            placeholder="태그를 입력해주세요"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
          />
          <div className="tagList">
            {tags.map((tag, index) => (
              <span className="tag" key={index}>
                #{tag}
                <button onClick={() => handleTagRemove(index)}>X</button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
      );
    }    

      export default Registration;