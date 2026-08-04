import logo from '@/assets/ic_logo.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className='bg-white flex items-center'>
      <div>
        <Link href='/' className='flex items-center gap-2'>
          <Image 
            src={logo}
            width={40}
            height={40}
            loading='eager'
            alt='판다마켓 로고'
          />
          <span>판다마켓</span>
        </Link>
      </div>
      <div>
        <Link href='/articles'>
          자유게시판
        </Link>
        <Link href='/products'>
          중고마켓
        </Link>
      </div>
      <div>
        <Link href='/signin'>
          로그인
        </Link>
      </div>
    </header>
  )
}