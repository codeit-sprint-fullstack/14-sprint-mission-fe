import facebookLogo from '../assets/img/Group.png';
import xLogo from '../assets/img/Vector.png';
import ytLogo from '../assets/img/Group (1).png';
import instaLogo from '../assets/img/ic_instagram.png';

function Footer() {
    return (
        <footer id="footer">
            <div className="inner">
                <div className="copyright">©codeit - 2024</div>
                <ul id="footer_menu">
                    <li>
                        <a href="/privacy">Privacy Policy</a></li>
                    <li>
                        <a href="/faq">FAQ</a>
                    </li>
                </ul>
                <div className="comm_wrap">
                    <a href="https://www.facebook.com/codeit.kr/" target="_blank" className="comm_btn">
                        <img src={facebookLogo} alt="페이스북 바로가기"/>
                    </a>
                    <a href="https://x.com/?lang=ko" target="_blank" className="comm_btn">
                        <img src={xLogo} alt="X 바로가기"/>
                    </a>
                    <a href="https://www.youtube.com/channel/UCCM79CPm2WbBYTRaiNEExbg" target="_blank" className="comm_btn">
                        <img src={ytLogo} alt="유튜브 바로가기"/>
                    </a>
                    <a href="https://www.instagram.com/codeit_kr/" target="_blank" className="comm_btn">
                        <img src={instaLogo} alt="인스타그램 바로가기"/>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;