import Link from 'next/link';
import Gnb from '../components/gnb.jsx';

export default function home() {
  return (
    <>
      <Gnb />
      <Link href="/notice">
        <h1 style={{ color: '#111', marginTop: '70px' }}>
          안녕 notice!
        </h1>
      </Link>
    </>
  );
}