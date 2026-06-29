import tagDeleteBtnImg from '../assets/img/ic_X.svg';

function ItemTag({tags, onDelete}) {
    return (
        <>
        {tags.map((tag) => (
            <span className="tag" key={tag}>
            # {tag}
            <img src={tagDeleteBtnImg} alt="태그삭제버튼" onClick={() => onDelete(tag)}/>
            </span>
        ))}
        </>
    );
}

export default ItemTag;