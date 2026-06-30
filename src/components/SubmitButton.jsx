import style from "../style/SubmitButton.module.css";

function SubmitButton({ text, boolean }) {
  console.log("SubmitButton received:", boolean);
  return ( 
    <button className={boolean ? style.button : style.buttonFalse}>
        {console.log(boolean)}
      <span>{text}</span>
    </button>
  )
}

export default SubmitButton;