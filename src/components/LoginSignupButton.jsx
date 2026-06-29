import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../style/LoginSignupButton.module.css";

function LoginSignupButton({ disabled }) {
  const navigate = useNavigate();

  const buttonClick = () => {
    if(!disabled) {
      navigate("/");
    }
  };

  return (
    <button
      className={disabled ? `${style.loginButton}` : `${style.loginButton} ${style.Allow}`} 
      disabled={disabled}
      onClick={buttonClick}
    >
      로그인
    </button>
  )
}

export default LoginSignupButton;
