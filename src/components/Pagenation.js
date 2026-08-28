import "@/styles/Pagenation.css";
export default function Pagenation({page, setPage}) {
  return (
    <div className="pagenation">
      <div className="btnWrap">
        <button className="btnArrow btnLeft"onClick={()=> setPage(page - 1)} />
        
        <button className="btnArrow btnRight" onClick={()=> setPage(page + 1)} />
      </div>
    </div>
  )
}
