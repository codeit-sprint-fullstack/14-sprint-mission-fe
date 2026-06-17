import arrowLeftImg from '../assets/img/arrow_left.svg';
import arrowRightImg from '../assets/img/arrow_right.svg';
import PaginationBtn from './PaginationBtn';

function Pagination() {
    return (
        <div className="pagination_wrap">
            <div className="pagination_btn">
                <img src={arrowLeftImg} alt="이전 페이지 보기" />
            </div>
            <PaginationBtn number={1} isActive={true}/>
            <PaginationBtn number={2}/>
            <PaginationBtn number={3}/>
            <PaginationBtn number={4}/>
            <PaginationBtn number={5}/>
            <div className="pagination_btn">
                <img src={arrowRightImg} alt="다음 페이지 보기" />
            </div>
        </div>
    );
}

export default Pagination;