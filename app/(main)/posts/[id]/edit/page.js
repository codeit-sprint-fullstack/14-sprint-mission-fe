import PostForm from "@/app/components/PostForm";

export default async function postEditPage({ params }) {
  const { id } = await params;
  const res = await fetch(`${process.env.API_URL}/articles/${id}`);
  const post = await res.json();

  return (
    <section className="insert-post">
      <PostForm post={post} />
    </section>
  );
}
