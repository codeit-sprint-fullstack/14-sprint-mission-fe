'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from '@/components/common/EditDeleteMenu.module.css'

function EditDeleteMenu({
  onEdit,
  onDelete,
  disabled = false,
  menuButtonAriaLabel,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!isMenuOpen) return undefined

    // 메뉴 외부 클릭하거나 터치로 메뉴 닫기
    function handlePointerDown(e) {
      if (!menuRef.current?.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }

    // esc키로 메뉴 닫기
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }
    // pointerdown: 마우스·터치·펜 통합
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (disabled) {
      setIsMenuOpen(false)
    }
  }, [disabled])

  function handleEdit() {
    setIsMenuOpen(false)
    onEdit()
  }

  function handleDelete() {
    setIsMenuOpen(false)
    onDelete()
  }

  return (
    <div className={styles.editDeleteMenu} ref={menuRef}>
      <button
        className={styles.menuButton}
        type="button"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label={menuButtonAriaLabel}
        aria-expanded={isMenuOpen}
        aria-haspopup="menu"
        disabled={disabled}
      >
        <Image src="/ic_kebab.svg" alt="" width={24} height={24} />
      </button>

      {isMenuOpen && (
        <div className={styles.menuDropdown} role="menu">
          <button
            className={styles.editButton}
            type="button"
            onClick={handleEdit}
            disabled={disabled}
            role="menuitem"
          >
            수정하기
          </button>

          <button
            className={styles.deleteButton}
            type="button"
            onClick={handleDelete}
            disabled={disabled}
            role="menuitem"
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  )
}

export default EditDeleteMenu
