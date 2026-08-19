import Link from "next/link";
import Footer from "@/components/Footer.jsx";
import Gnb from "@/components/gnb";
import Items_Card from "@/components/items_Card.jsx";
import style from "@/styles/items.module.css";
import { useEffect, useState } from "react";
import Dropdown from "@/components/dropdown";
import Pagination from "@/components/Pagination";

function Items() {
    const [sortRule, setSortRule] = useState("recent");
    const [count, setCount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1);
    const [favoritSize, setFavoritSize] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [isPhone, setIsPhone] = useState(false);
    const [products, setProducts] = useState([]);
    const [bestProducts, setBestProducts] = useState([]);

    const getInitialPageSize = () => {
        if (typeof window !== "undefined") {
            const width = window.innerWidth;
            if (width >= 1200) return 10;
            if (width >= 744) return 6;
            return 4;
        }
        return 0; // SSR 환경에서는 기본값
    };

    const [size, setSize] = useState(getInitialPageSize());

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1200) {
                setFavoritSize(4);
                setSize(10);
                setIsPhone(false);
            } else if (window.innerWidth >= 744) {
                setFavoritSize(2);
                setSize(6);
                setIsPhone(false);
            } else {
                setFavoritSize(1);
                setSize(4);
                setIsPhone(true);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        async function fetchItems() {
            try {
                const res = await fetch(
                    `/api/items?page=${page}&size=${size}&orderBy=${sortRule}&keyword=${keyword}`
                );
                const data = await res.json();
                setProducts(data.list);
                setCount(data.totalCount);
                setTotalPage(Math.ceil(data.totalCount / size));
            } catch (error) {
                console.error("Failed to fetch items:", error);
            }
        }
        fetchItems();
    }, [page, size, sortRule, keyword]);

    useEffect(() => {
        async function fetchBestItems() {
            try {
                const res = await fetch(`/api/items?page=1&size=${favoritSize}&orderBy=favorite`);
                const data = await res.json();
                setBestProducts(data.list);
            } catch (error) {
                console.error("Failed to fetch best items:", error);
            }
        }
        if (favoritSize > 0) {
            fetchBestItems();
        }
    }, [favoritSize]);


    const getPageNumbers = () => {
        const maxButtons = 5;
        let start = Math.max(page - Math.floor(maxButtons / 2), 1);
        let end = start + maxButtons - 1;

        if (end > totalPage) {
            end = totalPage;
            start = Math.max(end - maxButtons + 1, 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    return (
        <>
            <Gnb />
            <div className={style.container}>
                <div className={style.content}>
                    <div className={style.bestItem}>
                        <h2>베스트 상품</h2>
                        <div className={style.bestItemList}>
                            <Items_Card products={bestProducts} index={true} />
                        </div>
                    </div>
                    <div className={style.sellItem}>
                        <div className={style.sellHeader}>
                            <div className={style.sellTitle}>
                                <h2>판매 중인 상품</h2>
                                {isPhone && (
                                    <Link href="/" className={style.registerButton}>
                                        <span>상품 등록하기</span>
                                    </Link>
                                )}
                            </div>
                            <div className={style.search_Button}>
                                <div className={style.input_wrap}>
                                    <img src="/assets/ic_search.svg" alt="검색" className={style.icon} />
                                    <input
                                        type="text"
                                        placeholder="검색할 상품을 입력해주세요"
                                        value={keyword}
                                        onChange={(e) => {
                                            setKeyword(e.target.value);
                                            setPage(1);
                                        }}
                                    />
                                </div>
                                {!isPhone && (
                                    <Link href="/items/create" className={style.registerButton}>
                                        <span>상품 등록하기</span>
                                    </Link>
                                )}
                                <Dropdown
                                    size="medium"
                                    options={["최신순", "좋아요순"]}
                                    onChange={(value) => {
                                        const sortKey = value === "최신순" ? "recent" : "favorite";
                                        setSortRule(sortKey);
                                        setPage(1);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={style.sellItemList}>
                        <Items_Card
                            products={products}
                            page={page}
                            size={size}
                            option={sortRule}
                            index={false}
                            keyword={keyword}
                            count={count}
                            totalPage={totalPage}
                        />
                    </div>
                </div>
                <Pagination currentPage={page} totalPages={totalPage} onPageChange={setPage} />

                {/* 
                <div className={style.listButton}>
                    <button
                        type="button"
                        id={style.right}
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    />

                    {getPageNumbers().map((num) => (
                        <button
                            key={num}
                            type="button"
                            onClick={() => setPage(num)}
                            className={page === num ? style.active : ""}
                        >
                            {num}
                        </button>
                    ))}

                    <button
                        type="button"
                        id={style.left}
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPage))}
                    />
                </div> */}
            </div>
            <Footer />
        </>
    );
}

export default Items;