'use client';

/* eslint-disable @next/next/no-img-element */

import { useState } from 'react';

const DEFAULT_FALLBACK = '/images/Img_home_01.png';

export default function SafeImage({ src, fallback = DEFAULT_FALLBACK, alt = '', ...props }) {
  const [currentSrc, setCurrentSrc] = useState(src || fallback);

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (currentSrc !== fallback) {
          setCurrentSrc(fallback);
        }
      }}
    />
  );
}
