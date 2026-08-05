const SNS_ACCOUNTS = [
  { name: 'google', href: 'https://www.google.com/', src: '/img/google_logo.png', alt: '구글' },
  { name: 'kakao', href: 'https://www.kakaocorp.com/page/', src: '/img/kakaotalk_logo.png', alt: '카카오' },
];

function SnsLogin() {
  return (
    <div className="sns-box">
      <span>간편 로그인하기</span>
      <div className="icons">
        {SNS_ACCOUNTS.map(({ name, href, src, alt }) => (
          <a className={`sns-icon ${name}`} key={name} href={href} target="_blank" rel="noreferrer">
            <img src={src} alt={alt} style={{ width: 44, height: 44, borderRadius: '50%' }} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default SnsLogin;
