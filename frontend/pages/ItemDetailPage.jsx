import { Link, useNavigate, useParams } from "react-router-dom";
import Market from "../src/components/Market.jsx";
import { useEffect, useState } from "react";
import axios from "../src/utils/axios.js";
import itemDefaultImage from "../src/assets/img/img_default.png";

function ItemDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState([]);

  const handleLoad = async () => {
    const response = await axios.get(`/items/${id}`);
    setItem(response.data);
  };

  const deleteItem = async () => {
    if (!confirm("상품을 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`/items/${id}`);
      alert("삭제되었습니다.");
      navigate('/items');

    } catch (error) {
      console.error(error);
      alert("삭제에 실패했습니다.");
    }
  };

  const goToEditPage = async () => {
    try {
      await axios.patch(`/items/${id}`, {
        name: '상품수정',
        description: '수정된 상품설명',
        price: 4000,
        tags: '수정',
      });

      alert('수정되었습니다');
      handleLoad();
      
    } catch (error) {
      console.error(error);
      alert('수정에 실패했습니다.');
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <main id="main" style={{ padding: "24px 0" }}>
        <section className="item_detail_page">
          <div className="inner">
            <div className="section_title">
              <p>{item.name}</p>
              <Link to="/items">
                <button type="button" className="regist_item_btn">
                  목록보기
                </button>
              </Link>
            </div>
            <div className="item_detail_img">
              <img src={itemDefaultImage} alt="상품 이미지" />
            </div>
            <p>{item.price}</p>
            <p>{item.description}</p>
            <p>
              {item.tags.map((tag, index) => (
                <span key={tag}>
                  #{tag}
                  {index !== item.tags.length - 1 && ", "}
                </span>
              ))}
            </p>            
            <div
              className="btn_wrap"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
                gap: "10px",
                margin: "20px 0 0",
              }}
            >
              <div className="btn delete" onClick={deleteItem}>
                삭제
              </div>
              <div className="btn" onClick={goToEditPage}>
                수정
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default ItemDetailPage;
