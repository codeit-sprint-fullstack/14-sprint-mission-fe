export function EyeIcon({ visible }) {
  return visible ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.25 12s3.5-6 9.75-6 9.75 6 9.75 6-3.5 6-9.75 6-9.75-6-9.75-6Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 3 21 21" />
      <path d="M10.6 6.1A10.8 10.8 0 0 1 12 6c6.25 0 9.75 6 9.75 6a15.8 15.8 0 0 1-2.2 2.85M6.2 6.2C3.65 8 2.25 12 2.25 12S5.75 18 12 18c1.45 0 2.75-.32 3.9-.82" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

export function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.91h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.32 2.98-7.4Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.62-2.37l-3.24-2.54c-.9.6-2.05.96-3.38.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.39 13.92A6 6 0 0 1 6.08 12c0-.67.11-1.32.31-1.92V7.46H3.04A10 10 0 0 0 2 12c0 1.61.38 3.14 1.04 4.54l3.35-2.62Z" />
      <path fill="#EA4335" d="M12 5.95c1.47 0 2.79.51 3.83 1.5l2.87-2.88A9.63 9.63 0 0 0 12 2a10 10 0 0 0-8.96 5.46l3.35 2.62C7.18 7.71 9.39 5.95 12 5.95Z" />
    </svg>
  );
}

export function KakaoIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#FEE500" />
      <path fill="#191919" d="M16 8.4c-4.75 0-8.6 3.02-8.6 6.75 0 2.4 1.6 4.5 4 5.7l-1.02 3.73a.4.4 0 0 0 .61.44l4.48-3.02H16c4.75 0 8.6-3.03 8.6-6.85S20.75 8.4 16 8.4Z" />
      <text x="16" y="17.2" fill="#FEE500" fontSize="5.2" fontWeight="700" textAnchor="middle">TALK</text>
    </svg>
  );
}
