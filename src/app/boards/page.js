import Link from "next/link";
import BestBoard from "@/components/BestBoard"
import Board from "@/components/Board"
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BoardPage(){
  return (
    <>
    <Header/>
      <div className="subWrapper">
        <div className="subContents">
          <div className="subTitle">
            <p>베스트 게시글</p>
          </div>  
        {/*   <BestBoard/> */}
        </div>
        <div className="subContents">
          <div className="subTitle">
            <p>게시글</p>
            <Link href="/boards/write" className="btn btnWrite">글쓰기</Link>
          </div>  
          <Board/>
        </div>
      </div>
      <Footer/>
    </>
  )
} 