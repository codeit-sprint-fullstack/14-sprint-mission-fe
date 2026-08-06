'use client';

import Image from 'next/image';
import Link from 'next/link';

const sizeClass = {
  header: {
    wrap: 'logo-link logo-link--header',
    image: 'logo-image',
    text: 'logo-text',
  },
  auth: {
    wrap: 'logo-link logo-link--auth',
    image: 'logo-image',
    text: 'logo-text',
  },
};

export default function Logo({ variant = 'header', pathname = '' }) {
  const styles = sizeClass[variant];
  const isLandingLogo = variant === 'header' && pathname === '/';
  const href = variant === 'header' && !isLandingLogo ? '/items' : '/';

  function handleClick(event) {
    if (!isLandingLogo) {
      return;
    }

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <Link href={href} className={styles.wrap} onClick={handleClick} aria-label="판다마켓 홈">
      <Image className={styles.image} src="/images/panda-logo.png" width={160} height={161} alt="" priority />
      <span className={styles.text}>판다마켓</span>
    </Link>
  );
}
