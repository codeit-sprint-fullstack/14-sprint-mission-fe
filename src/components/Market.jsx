import { useState, useEffect } from "react";
import BestItem from "./BestItem.jsx";
import MarketItems from "./MarketItems.jsx";
import axios from '../utils/axios.js';
import Pagination from "./Pagination.jsx";

function Market() {
    const [bestItems, setBestItems] = useState([]);
    
    const handleLoad = async () => {
        const bestItemsResponse = await axios.get('?pageSize=4&orderBy=favorite');
        setBestItems(bestItemsResponse.data.list);
    }

    useEffect(() => {
        handleLoad();
    }, []);
    
    return (
        <main id="main" style={{ padding: '24px 0'}}>
            <div className="inner">
                <BestItem bestItems={bestItems}/>
                <MarketItems/>
                <Pagination/>
            </div>
        </main>
    );
}

export default Market;