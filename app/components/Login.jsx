"use client";

import profileIc from "@/public/icon_profile.png";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { getMe } from "../lib/api/auth";

export default function Login() {
  const { data, isPending } = useQuery({
    queryKey: ["users", "me"],
    queryFn: getMe,
  });
  const showUser = !isPending && data;
  return (
    <>
      {showUser ? (
        <span>
          <Image src={profileIc} alt="" width={40} />
          {data?.nickname}
        </span>
      ) : (
        <Link href="/signin" className="btStyle">
          로그인
        </Link>
      )}
    </>
  );
}
