import Link from "next/link";
export type Article = {
    id: number;
    title: string;
    createdAt: string;
}

export const ArticleCard = ({ article } : {article: Article}) => {
  return ( 
    
    
      <Link href ={`articles/${article.id}`}>
        <p>{article.title}</p>
        <h1>{article.createdAt}</h1>
          <p>♥ 9999+</p>
          </Link>
    

)}

export default ArticleCard;