import IconLink from "./IconLink";

function Footer() {
    return (
        <footer id="footer">
            <div className="flex_wrap">
                <div className="flex">
                    <span className="text copyright">©codeit - 2024</span>
                    <ul className="footer_nav flex">
                        <li><a href="privacy.html" className="text">Privacy Policy</a></li>
                        <li><a href="faq.html" className="text">FAQ </a></li>
                    </ul>
                    <ul className="sns_wrap flex">
                        <li>
                            <IconLink href="https://www.facebook.com/PandaMarket/" classNm="facebook" text="판다마켓 페이스북 페이지 보기"></IconLink>
                        </li>
                        <li>
                            <IconLink href="https://x.com/pandamaket" classNm="twitter" text="판다마켓 트위터 계정 보기"></IconLink>
                        </li>
                        <li>
                            <IconLink href="https://www.youtube.com/@%ED%8C%90%EB%8B%A4%EB%A7%88%EC%BC%93" classNm="youtube" text="판다마켓 유튜브 보기"></IconLink>
                        </li>
                        <li>
                            <IconLink href="https://www.instagram.com/panda__market_/" classNm="instagram" text="판다마켓 인스타그램 페이지 보기"></IconLink>
                        </li>
                    </ul>
                </div>

            </div>
        </footer>
    )
}

export default Footer;