import { useState } from 'react';

const SORT_OPTIONS = [
  { value: 'recent', label: '최신순' },
  { value: 'favorite', label: '좋아요순' },
];

function SortDropdown({ orderBy, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = SORT_OPTIONS.find((option) => option.value === orderBy);

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdownBtn" onClick={() => setIsOpen((prev) => !prev)}>
        {selected.label} ▼
      </button>
      {isOpen && (
        <ul className="dropdownMenu">
          {SORT_OPTIONS.map(({ value, label }) => (
            <li key={value} onClick={() => handleSelect(value)}>{label}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SortDropdown;
