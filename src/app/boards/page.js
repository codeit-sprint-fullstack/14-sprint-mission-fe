import Link from "next/link";
import BestBoard from "@/components/BestBoard"
import Board from "@/components/Board"

export default function BoardPage(){
  return (
    <>
      <div className="subWrapper">
        <div className="subContents">
          <div className="subTitle">
            <p>베스트 게시글</p>
          </div>  
          <BestBoard/>
        </div>
        <div className="subContents">
          <div className="subTitle">
            <p>게시글</p>
            <Link href="/boards/write" className="btn btnWrite">글쓰기</Link>
          </div>  
          <Board/>
        </div>
      </div>
    </>
  )
} 