import noImage from "../assets/images/img_noImage.jpg";


function ProductListItem({ item }) {
    const pdImage = item.images?.[0] || noImage;
    const price = Number(item.price).toLocaleString("ko-KR");
    return (
        <div className="product">
            <button type="button" className="btnDtail" onClick={() => { }}>

                <div className="imgWrap objectFit">
                    {/* 이미지 경로는 있는데 경로가 잘못됐거나 오류로 인해 못 불러올때 */}
                    <img src={pdImage} alt={item.name} onError={(e) => {
                        e.currentTarget.src = noImage
                    }} />
                </div>

                <div className="textWrap">
                    <p className="title">{item.name}</p>
                    <span className="pdPrice">{price}</span>
                </div>
            </button>
            <div className="likeWrap">
                <button type="button" className="btnLike">
                    <span className="noText">이 상품 좋아요 누르기</span>
                </button>
                <span className="totalLike">{item.favoriteCount}</span>
            </div>

        </div>
    )
}



function ProductList({ items }) {

    return (
        <div className="productList flex">
            {items.map((item) => (
                <ProductListItem key={item.id} item={item}></ProductListItem>
            ))}
        </div>
    )
}

export default ProductList;