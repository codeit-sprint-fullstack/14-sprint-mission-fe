function PaginationBtn({ number, isActive }) {
    return (
        <div className={isActive ? 'pagination_btn active' : 'pagination_btn'}>
            {number}
        </div>
    );
}

export default PaginationBtn;