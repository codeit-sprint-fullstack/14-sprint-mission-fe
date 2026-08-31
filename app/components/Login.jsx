"use client";

import profileIc from "@/public/icon_profile.png";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { user, isPending } = useAuth();
  const showUser = !isPending && user;
  return (
    <>
      {showUser ? (
        <span>
          <Image src={profileIc} alt="" width={40} />
          {user?.nickname}
        </span>
      ) : (
        <Link href="/signin" className="btStyle">
          로그인
        </Link>
      )}
    </>
  );
}
