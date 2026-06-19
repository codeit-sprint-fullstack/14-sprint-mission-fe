import BestPdt from "./component/bestPdt";
import SalePdt from "./component/salePdt";
import PageNum from "./component/pageNum";
import Footer from "./component/footer";
import { useEffect, useState } from "react";
import axios from "./util/axios";
import PdtHeader from "./component/pdtHeader";
import Nav from "./component/nav";

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("recent");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;
  // 페이지네이션 1차작업
  const totalPages = Math.ceil(totalCount / pageSize);
  const [keyword, setKeyword] = useState("");
  const filterItems = items.filter((item) => item.name.includes(keyword));
  console.log("총 페이지", totalPages);

  //Products 값 가져오기
  const handleLoad = async (orderParam, pageParam) => {
    const response = await axios.get("/products", {
      params: {
        orderBy: orderParam,
        page: pageParam,
        pageSize: pageSize,
      },
    });

    // 리스트 및 카운트 확인용
    const { list, totalCount } = response.data;
    setItems(list);
    setTotalCount(totalCount);
    console.log("확인용 ", response.data);
  };

  useEffect(() => {
    handleLoad(order, page);
  }, [order, page]);

  return (
    <div>
      <div>
        <Nav />
      </div>

      <div>
        <BestPdt />
      </div>
      <div>
        <div>
          <PdtHeader
            keyword={keyword}
            setKeyword={setKeyword}
            order={order}
            setOrder={setOrder}
          />
        </div>
        <SalePdt items={filterItems} />
      </div>
      <div>{<PageNum totalPages={totalPages} setPage={setPage} />}</div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
