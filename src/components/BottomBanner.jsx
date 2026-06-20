import pandaTalkImage from '../img/img02.png'

function BottomBanner() {
  return (
    <div className="panda_last_group">
      <h1 className="panda_last_text">
        믿을 수 있는
        <br />
        판다마켓 중고 거래
      </h1>

      <img
        src={pandaTalkImage}
        alt="판다 말풍선"
        className="pandatalk"
      />
    </div>
  )
}

export default BottomBanner