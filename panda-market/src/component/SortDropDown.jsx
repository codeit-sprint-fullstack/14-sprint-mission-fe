import '../css/SortDropDown.css'
import { useState } from 'react';

function SortDropDown({ orderBy, setOrderBy }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="productSort">
      <button className={`btnDropDown ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}>
        {orderBy === 'favorite' ? '좋아요순' : '최신순'}
      </button>
      {isOpen && (
        <ul className="SortList">
          <li onClick={() => {
             setOrderBy('recent');
             setIsOpen(false);
          } }>최신순</li>
          <li onClick={() => {
            setOrderBy('favorite');
             setIsOpen(false);
          }}>좋아요순</li>
        </ul>
      )}
    </div>
  )
}

export default SortDropDown;