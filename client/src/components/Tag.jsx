import xIcon from '../assets/ic_X.svg'

function Tag({ tag, onDelete }) {
  return (
    <div>
      <span>{tag}</span>

      <button type="button" onClick={() => onDelete(tag)}>
        <img src={xIcon} alt="태그 삭제" />
      </button>
    </div>
  )
}
export default Tag
