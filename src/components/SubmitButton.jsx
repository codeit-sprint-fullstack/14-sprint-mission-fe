import style from "../style/SubmitButton.module.css";

function SubmitButton({ text, boolean, onClick }) {
  return ( 
    <button className={boolean ? style.button : style.buttonFalse} onClick={onClick}>
      <span>{text}</span>
    </button>
  )
}

export default SubmitButton;