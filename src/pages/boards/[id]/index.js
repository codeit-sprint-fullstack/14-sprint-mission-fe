import { useRouter } from "next/router";

export default function BoardDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return <h1>게시글 상세: {id}</h1>;
}
