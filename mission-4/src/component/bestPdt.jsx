import { useEffect, useState } from "react";
import axios from "../util/axios";

const BestPdt = () => {
  const [bestItems, setBestItems] = useState([]);

  const handLoad = async () => {
    const response = await axios.get("/products", {
      params: {
        orderBy: "favorite",
        page: 1,
        pageSize: 4,
      },
    });
    console.log("BEST : ", response.data.list);
    setBestItems(response.data.list);
  };
  useEffect(() => {
    handLoad();
  }, []);

  return (
    <div>
      <h2>베스트 상품</h2>

      <ul className="sale-list">
        {bestItems.map((item) => (
          <li key={item.id}>
            <div>
              <img className="sale-img" src={item.images[0]} alt={item.name} />
              <h1>상품이름 : {item.name}</h1>
              <p>가격 : {item.price}</p>
              <p>좋아요 : {item.favoriteCount}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BestPdt;
