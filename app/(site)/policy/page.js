import SimplePage from '@/components/SimplePage';

export const metadata = { title: 'Privacy Policy' };

export default function PolicyPage() {
  return <SimplePage title="Privacy Policy" links={[["/faq", 'FAQ'], ['/', '홈으로 돌아가기']]} />;
}
