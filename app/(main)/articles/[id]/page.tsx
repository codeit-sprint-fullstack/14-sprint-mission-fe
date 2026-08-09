
    import DeleteButton from "@/app/components/deleteButton";
    import Link from "next/link";
    
    
    
    
    const ArticleDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const res = await fetch(`http://localhost:4000/articles/${id}`);
    const article = await res.json();

    return (
        <div>
            <DeleteButton id = {article.id}/>
            <Link href={`/articles/${article.id}/edit`}>
    <button>수정하기</button></Link>
            <h2>{article.title}</h2>
            <p>총명한판다 · {article.createdAt}</p>
            <p>♥ 123</p>
            <p>{article.content}</p>
            <p>댓글달기</p>
            <input></input>
            <div>
            <button>등록</button>
            </div>
            <div>
            <button>목록으로 돌아가기</button>
            </div>
        </div>
    )
}

export default ArticleDetailPage;