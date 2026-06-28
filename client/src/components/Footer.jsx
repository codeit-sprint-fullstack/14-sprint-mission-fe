import { Link } from "react-router-dom"

function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <span>@codeit - 2024</span>
                <div className="footer-tag">
                    <Link to="/privacy"><span>Privacy Policy</span></Link>
                    <Link to="/faq"><span>FAQ</span></Link>
                </div>
                <div className="footer-icon">
                    <a href="https://www.youtube.com/" target="_blank"><img src="/img/icon/ic_facebook.png" alt="페이스북" /></a>
                    <a href="https://www.youtube.com/" target="_blank"><img src="/img/icon/ic_twitter.png" alt="트위터" /></a>
                    <a href="https://www.youtube.com/" target="_blank"><img src="/img/icon/ic_youtube.png" alt="유튜브" /></a>
                    <a href="https://www.youtube.com/" target="_blank"><img src="/img/icon/ic_instagram.png" alt="인스타그램" /></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer