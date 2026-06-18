import arrowDownImg from "../assets/img/arrow_down.svg";
import mobileSortImg from "../assets/img/ic_sort.svg";
import MarketItem from "./MarketItem.jsx";
import searchIcon from "../assets/img/ic_search.svg";
import Pagination from "./Pagination.jsx";
import axios from "../utils/axios.js";
import { useState, useEffect } from "react";

function MarketItems() {
  const getPageSize = () => {
    if (window.innerWidth < 344) return 4;
    if (window.innerWidth < 745) return 6;
    return 10;
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 343);
  const [marketItems, setMarketItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [sortType, setSortType] = useState("recent");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(getPageSize());

  const handleLoad = async (
    nextPage = page,
    keyword = searchKeyword,
    orderType = sortType,
  ) => {
    const response = await axios.get(
      `?page=${nextPage}&pageSize=${pageSize}&orderBy=${orderType}&keyword=${keyword}`,
    );

    setMarketItems(response.data.list);
    setTotalCount(response.data.totalCount);
  };

  const handleSelect = (value) => {
    setSortType(value);
    setPage(1);
    handleLoad(1, searchKeyword, value);
    setIsOpen(false);
  };

  const handleSearch = () => {
    setPage(1);
    handleLoad(1, searchKeyword, sortType);
  };

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
    handleLoad(nextPage, searchKeyword, sortType);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 343);
      setPageSize(getPageSize());
      setPage(1);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    handleLoad(page, searchKeyword, sortType);
  }, [pageSize]);

  return (
    <>
      <section className="item_section">
        <div className="market_controls">
          <p className="section_title">판매 중인 상품</p>

          <div className="input_wrap">
            <input
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <img src={searchIcon} alt="검색 아이콘" />
          </div>

          <button type="button" className="register_btn">
            상품 등록하기
          </button>

          <div className="select_wrap">
            <div
              className="select_display"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <p>{sortType === "recent" ? "최신순" : "좋아요순"}</p>
              <img
                src={isMobile ? mobileSortImg : arrowDownImg}
                alt="필터 목록 버튼"
              />
            </div>

            {isOpen && (
              <div className="select_btn_wrap">
                <div
                  className="select_btn"
                  onClick={() => handleSelect("recent")}
                >
                  최신순
                </div>

                <div
                  className="select_btn"
                  onClick={() => handleSelect("favorite")}
                >
                  좋아요순
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="item_wrap market">
          {marketItems.map((item) => (
            <MarketItem key={item.id} item={item} />
          ))}
        </div>
      </section>
      <Pagination
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default MarketItems;
