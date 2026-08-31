import ArticleCard, { Article } from "@/app/components/articleCard";


export const ArticleList =( {articles} : {articles: Article[]} ) => {
    return (
        <div>
          {articles.map((article) => (
            <ArticleCard key={article.id} article= {article} />
          ))}
        </div>

    )
  }

export default ArticleList;