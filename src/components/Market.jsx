import { useState, useEffect } from "react";
import BestItem from "./BestItem.jsx";
import MarketItems from "./MarketItems.jsx";
import axios from '../utils/axios.js';

function Market() {
    const [bestItems, setBestItems] = useState([]);
    const [marketItems, setMarketItems] = useState([]);
    
    const handleLoad = async () => {
        const bestItemsResponse = await axios.get('?pageSize=4&orderBy=favorite');
        const marketItemsResponse = await axios.get('?pageSize=10');
        setBestItems(bestItemsResponse.data.list);
        setMarketItems(marketItemsResponse.data.list);
    }

    useEffect(() => {
        handleLoad();
    }, []);
    
    return (
        <main id="main" style={{ padding: '24px 0'}}>
            <div className="inner">
                <BestItem bestItems={bestItems}/>
                <MarketItems marketItems={marketItems}/>
            </div>
        </main>
    );
}

export default Market;