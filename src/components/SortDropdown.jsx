import { useState } from 'react';

/**
 * 정렬 드롭다운.
 *
 * @param options  [{ value, label }] 형태의 정렬 옵션 목록
 * @param value    현재 선택된 정렬 값
 * @param onChange 옵션을 고르면 해당 value로 호출된다
 */
function SortDropdown({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find((option) => option.value === value) ?? options[0];

  const handleSelect = (nextValue) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdownBtn" onClick={() => setIsOpen((prev) => !prev)}>
        {selected.label} ▼
      </button>
      {isOpen && (
        <ul className="dropdownMenu">
          {options.map((option) => (
            <li key={option.value} onClick={() => handleSelect(option.value)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SortDropdown;
