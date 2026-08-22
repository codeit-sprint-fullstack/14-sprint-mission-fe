import SimplePage from '@/components/SimplePage';

export const metadata = { title: 'FAQ' };

export default function FaqPage() {
  return <SimplePage title="FAQ" links={[["/policy", 'Privacy Policy'], ['/', '홈으로 돌아가기']]} />;
}
