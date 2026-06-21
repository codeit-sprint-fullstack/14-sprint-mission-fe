import '../css/Footer.css'
function Footer() {
  return (
    <footer>
      <div className="footerInner">
        <div className="footerCont">
          <p className="copyRight">©codeit - 2024</p>
          <div className="policeWrap">
            <a href="\">Privacy Policy</a>
            <a href="\">FAQ</a>
          </div>
          <div className="footerSns">
            <a href="\" className='facebook'></a>
            <a href="\" className='twitter'></a>
            <a href="\" className='youtube'></a>
            <a href="\" className='insta'></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer