import { useRouter } from "next/router";

export default function BoardEditPage() {
  const router = useRouter();
  const { id } = router.query;

  return <h1>게시글 수정: {id}</h1>;
}
