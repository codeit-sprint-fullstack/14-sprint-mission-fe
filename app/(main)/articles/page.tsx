import ArticleList from "@/app/components/articleList";
import Link from "next/link";
//import { SearchProduct } from "./searchProduct";

/*type SearchParams = {
    page: string;
    search?: string;
}*/

const ArticlePage = async () =>{
    const res = await fetch(`http://localhost:4000/articles?page=1&limit10`);
    const data = await res.json();
    const { articles, count} = data;
    console.log(data);

    const bestRes = await fetch(`http://localhost:4000/articles?page=1&limit=3`)
    const {articles: bestArticles} = await bestRes.json();
    
    return (
         <div>
            <h4>베스트 게시글</h4>
            <ArticleList articles={bestArticles}/>

            <h4>게시글</h4>
            <ArticleList articles={articles} />
            <Link href="/articles/registration">
            <button>게시물등록</button>
            </Link>

            
        </div>
    )
    

}


export default ArticlePage;