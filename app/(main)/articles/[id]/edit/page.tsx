import EditForm from "@/app/components/EditForm";

const EditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const res = await fetch(`http://localhost:4000/articles/${id}`);
    const article = await res.json();

    return <EditForm id={id} initialTitle={article.title} initialContent={article.content} />;
};

export default EditPage;