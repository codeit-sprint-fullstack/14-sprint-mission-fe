import SimplePage from '@/components/SimplePage';

export default function NotFound() {
  return (
    <SimplePage
      title="페이지를 찾을 수 없습니다"
      description="주소가 바뀌었거나 삭제된 페이지입니다."
      links={[["/items", '중고마켓'], ['/', '홈으로 돌아가기']]}
    />
  );
}
