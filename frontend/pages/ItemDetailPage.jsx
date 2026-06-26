import { Link, useParams } from 'react-router-dom';
import Market from '../src/components/Market.jsx';
import { useEffect, useState } from 'react';
import axios from '../src/utils/axios.js';
import itemDefaultImage from '../src/assets/img/img_default.png';

function ItemDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState([]);

  const handleLoad = async () => {
    const response = await axios.get(`/${id}`);
    setItem(response.data);
  }

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <main id="main" style={{ padding: '24px 0'}}>
        <section className="item_detail_page">
          <div className="inner">
            <div className="section_title">
              <p>{item.name}</p>
              <Link to="/items">
                <button type="button" className="regist_item_btn">목록보기</button>
              </Link>
            </div>
            <div className="item_detail_img">
              <img src={itemDefaultImage} alt="상품 이미지"/>
            </div>
            <p>{item.price}</p>
            <p>{item.description}</p>
          </div>
        </section>
      </main>
    </>
  )
}

export default ItemDetailPage;
