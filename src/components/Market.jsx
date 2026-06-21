import BestItem from "./BestItem.jsx";
import MarketItems from "./MarketItems.jsx";

function Market() {
    return (
        <main id="main" style={{ padding: '24px 0'}}>
            <div className="inner">
                <BestItem/>
                <MarketItems/>
            </div>
        </main>
    );
}

export default Market;