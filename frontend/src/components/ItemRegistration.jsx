function ItemRegistration() {
    return (
        <>
            <main id="main" style={{ padding: '24px 0'}}>
                <section>
                    <div className="inner">
                        <div className="section_title">
                            <p>상품 등록하기</p>
                            <button className="regist_item_btn">등록</button>
                        </div>
                        <form action="">
                            <div className="input_wrap">
                                <label htmlFor="">상품명</label>
                                <input type="text" placeholder="상품명을 입력해주세요." />
                            </div>
                            <div className="input_wrap">
                                <label htmlFor="">상품 소개</label>
                                <textarea placeholder="상품 소개를 입력해주세요." rows={6} />
                            </div>
                            <div className="input_wrap">
                                <label htmlFor="">판매 가격</label>
                                <input type="text" placeholder="판매 가격을 입력해주세요." />
                            </div>
                            <div className="input_wrap">
                                <label htmlFor="">태그</label>
                                <input type="text" placeholder="태그를 입력해주세요." />
                            </div>
                            
                        </form>
                    </div>
                </section>
            </main>
        </>
    )
}

export default ItemRegistration;