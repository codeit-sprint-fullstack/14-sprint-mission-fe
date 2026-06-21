import dropdownIcon from '../assets/ic_arrow_down.svg';
import sortIcon from '../assets/ic_sort.svg';

function Dropdown({ orderBy, onChangeOrderBy }) {
  return (
    <div className='order-by-box'>
      <select
        className='order-by'
        value={orderBy}
        onChange={(e) => {
          onChangeOrderBy(e.target.value)
        }}
      >
        <option value="recent">최신순</option>
        <option value="favorite">좋아요순</option>
      </select>
      <img className='order-by-icon arrow-icon' src={dropdownIcon} alt='' />
      <img className='order-by-icon sort-icon' src={sortIcon} alt='' />
    </div>
  );
}

export default Dropdown;