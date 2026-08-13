'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from '@/components/common/Dropdown.module.css'

function Dropdown({ options, value, onChange, className = '' }) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption =
    options.find((option) => option.value === value) ?? options[0]

  const handleSelect = (nextValue) => {
    onChange(nextValue)
    setIsOpen(false)
  }

  return (
    <div className={`${styles.dropdown} ${className}`.trim()}>
      <button
        className={styles.dropdownToggle}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((previous) => !previous)}
      >
        <span className={styles.selectedLabel}>{selectedOption.label}</span>
        <Image
          className={`${styles.dropdownIcon} ${styles.arrowIcon}`}
          src="/ic_arrow_down.svg"
          alt=""
          width={24}
          height={24}
        />
        <Image
          className={`${styles.dropdownIcon} ${styles.sortIcon}`}
          src="/ic_sort.svg"
          alt=""
          width={24}
          height={24}
        />
      </button>

      {isOpen && (
        <div
          className={styles.optionList}
          role="listbox"
          aria-label="정렬 순서"
        >
          {options.map((option) => {
            const isSelected = option.value === value

            return (
              <button
                key={option.value}
                className={`${styles.optionButton} ${
                  isSelected ? styles.selectedOption : ''
                }`}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Dropdown
