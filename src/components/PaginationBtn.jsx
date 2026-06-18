function PaginationBtn({ number, isActive, onClick }) {
    return (
        <button
            type="button"
            className={`pagination_btn ${isActive ? "active" : ""}`}
            onClick={onClick}
        >
            {number}
        </button>
    );
}

export default PaginationBtn;