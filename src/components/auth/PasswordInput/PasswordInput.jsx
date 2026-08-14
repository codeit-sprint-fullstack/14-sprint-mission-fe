"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "../AuthForm/AuthForm.module.css";

export default function PasswordInput({
  label,
  id,
  placeholder,
  error,
  registration,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>

      <div className={styles.passwordBox}>
        <input
          id={id}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...registration}
        />

        <button
          className={styles.eyeButton}
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
        >
          <Image
            src={
              showPassword
                ? "/images/auth/btn_eye.png"
                : "/images/auth/btn_eye_off.png"
            }
            alt=""
            width={24}
            height={24}
          />
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
