"use client";

import VisibleOff from "@/public/btn_visibility_off.svg";
import VisibleOn from "@/public/btn_visibility_on.svg";
import Image from "next/image";
import { useState } from "react";
import styles from "./PasswordInput.module.css";

export default function PasswordInput({ ...inputProps }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.inputPassword}>
      <input {...inputProps} type={showPassword ? "text" : "password"} />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className={styles.btnPasswordToggle}
        aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
      >
        <Image src={showPassword ? VisibleOn : VisibleOff} alt="" width={24} />
      </button>
    </div>
  );
}
