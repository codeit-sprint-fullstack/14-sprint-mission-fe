import MarketItem from "./MarketItem.jsx";
import axios from "../utils/axios.js";
import { useState, useEffect } from "react";

function BestItem() {
  const getPageSize = () => {
    if (window.innerWidth < 344) return 1;
    if (window.innerWidth < 745) return 2;
    return 4;
  };

  const [bestItems, setBestItems] = useState([]);
  const [pageSize, setPageSize] = useState(getPageSize());

  const handleLoad = async () => {
    const bestItemsResponse = await axios.get(
      `?pageSize=${pageSize}&orderBy=favorite`,
    );
    setBestItems(bestItemsResponse.data.list);
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    handleLoad();
  }, [pageSize]);

  return (
    <section className="item_section best">
      <div className="section_title">베스트 상품</div>
      <div className="item_wrap best">
        {bestItems.map((item) => (
          <MarketItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export default BestItem;
