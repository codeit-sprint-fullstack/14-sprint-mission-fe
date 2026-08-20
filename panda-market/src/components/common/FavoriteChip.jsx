import Image from 'next/image'
import styles from '@/components/common/FavoriteChip.module.css'

function FavoriteChip({
  isFavorite,
  favoriteCount,
  onToggleFavorite,
  disabled = false,
}) {
  const isSelected = isFavorite === true
  const favoriteIcon = isSelected ? '/ic_full_heart.svg' : '/ic_empty_heart.svg'

  return (
    <button
      className={styles.favoriteChip}
      type="button"
      aria-label={`좋아요 ${favoriteCount}개`}
      aria-pressed={isSelected}
      onClick={onToggleFavorite}
      disabled={disabled}
    >
      <Image
        className={styles.favoriteChipIcon}
        src={favoriteIcon}
        alt=""
        width={32}
        height={32}
      />
      <span className={styles.favoriteChipCount}>{favoriteCount}</span>
    </button>
  )
}

export default FavoriteChip
