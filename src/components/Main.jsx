import axios from '../utils/axios';
import TextLink from "./TextLink";
import { useEffect, useState } from "react";
import '../Product.css'
import ProductList from './ProductList';
import Pagination from './Pagination';

function getPageSize() {
    const width = window.innerWidth;
    
    if (width >= 1200) {
        return 10;
    }
    
    if (width >= 744) {
        return 6;
    }
    
    return 4;
}



function Main() {

    const [items, setItems] = useState([]);
    const [bestItems, setBestItems] = useState([]);
    
    const [order, setOrder] = useState('recent');
    const [option, setOption] = useState('optionList');

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(getPageSize());
    const [totalCount, setTotalCount] = useState(0);
    
    const [keyword, setKeyword] = useState("");
    const [searchText, setSearchText] = useState("");

    const totalPage = Math.ceil(totalCount / pageSize);



    const handleLoad = async () => {
        const response = await axios.get('/products', {
            params: {
                page,
                pageSize,
                orderBy: order,
                keyword,
            }
        });
        const { list, totalCount } = response.data;
        setItems(list);
        setTotalCount(totalCount);

    };

    const handleBestLoad = async () => {
        const response = await axios.get('/products', {
            params: {
                page: 1,
                pageSize: 4,
                orderBy: "favorite",
                keyword: "",
            }
        });
        const { list } = response.data;
        setBestItems(list);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        
        setKeyword(searchText);
        setPage(1);
    };

    // useEffect: 콜백과 빈 배열(디펜던시 리스트)을 넘기면, 콜백을 맨 처음 렌더링할 때 한 번만 실행
    useEffect(() => {
        handleLoad();
    }, [page, pageSize, order, keyword])
    
    useEffect(() => {
        handleBestLoad();
    }, [])
    
    return (
        <main id="main">
            <div className="mainArea">

                <div className="bestProducts productArea">
                    <div className="topArea">
                        <div className="titleWrap">
                            <h3 className="title">베스트 상품</h3>
                        </div>
                    </div>
                    <div className="bottomArea">
                        <ProductList items={bestItems} countProduct={4}></ProductList>
                    </div>

                </div>

                <div className="onSale productArea">
                    <div className="topArea flex">
                        <div className="titleWrap">
                            <h3 className="title">판매중인 상품</h3>
                        </div>
                        <form action="" className="formWrap flex" onSubmit={handleSearchSubmit}>
                            <div className="inputWrap search">
                                <input type="text" name="searchText" id="searchText" className="input searchInput" placeholder='검색할 상품을 입력해주세요' value={searchText} onChange={(e) => {
                                    setSearchText(e.target.value);
                                }} />
                            </div>
                            <TextLink btnStyle="btnBasic btnLink" text="상품 등록하기"></TextLink>
                            <TextLink btnStyle="btnBasic btnLink" text="로그인"></TextLink>
                            <div className="selectWrap">
                                <div className="select">
                                    <button type="button" className="selection" onClick={() => {
                                        setOption("optionList visible")
                                    }}>
                                        <span className="text">최신순</span>
                                    </button>
                                    <ul className={option}>
                                        <li>
                                            <button type="button" className="option" onClick={() => {
                                                setOrder('recent');
                                                setOption("optionList");
                                            }}>
                                                <span className="text">최신순</span>
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" className="option" onClick={() => {
                                                setOrder('favorite');
                                                setOption("optionList");
                                            }}>
                                                <span className="text">좋아요순</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="bottomArea">
                        <ProductList items={items}></ProductList>
                    </div>
                </div>

                <div className="paginationWrap">
                    <Pagination page={page} totalPage={totalPage} onPageChange={setPage}></Pagination>
                </div>
            </div>






        </main>
    )
}

export default Main;