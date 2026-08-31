
import CommentSection from "@/app/components/commentSection";
import DeleteButton from "@/app/components/deleteButton";
    import Link from "next/link";
    
    
    
    
    const ArticleDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const res = await fetch(`http://localhost:4000/articles/${id}`);
    const article = await res.json();
    const commentsRes = await fetch(`http://localhost:4000/comments?articleId=${id}`);
    const comments = await commentsRes.json();

    return (
        <div>
            <DeleteButton id = {article.id}/>
            <Link href={`/articles/${article.id}/edit`}>
    <button>수정하기</button></Link>
            <h2>{article.title}</h2>
            <p>총명한판다 · {article.createdAt}</p>
            <p>♥ 123</p>
            <p>{article.content}</p>
            <CommentSection articleId={article.id} initialComments={comments}/>
        </div>
    )
}

export default ArticleDetailPage;