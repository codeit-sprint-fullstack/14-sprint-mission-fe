import style from "./LobbyContent.module.css";
import Img_content1 from "../assets/Frame 2608833.png";
import Img_content2 from "../assets/Frame 2608833.png";
import Img_content3 from "../assets/Frame 2608833.png";

function LobbyContent({option, imgContent, h4_txt, h2_txt, h3_txt}) {
  const tmp = option === '1' ? style.right : style.left;
  return (
  <>
    <div className={style.container}>
      <div className={`${style.content} ${tmp}`}>
        <img src={imgContent} alt="Img_content"/>
        <div className={`${style.discription} ${tmp}`}>
          <h4>
            {h4_txt}
          </h4>
          <h2>
            {h2_txt}
          </h2>
          <h3>
            {h3_txt}
          </h3>
        </div>
      </div>
    </div>
  </>
  );
}

export default LobbyContent;
