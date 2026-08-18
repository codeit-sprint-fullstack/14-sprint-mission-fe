"use client";

import defaultImage from "@/public/default-thumbnail.png";
import { useState } from "react";

export default function Thumbnail({ imageUrl, alt }) {
  const [failed, setFailed] = useState(false);
  //failed는 에러일때만 처리, 빈배열 별도 처리
  return (
    <img
      src={
        failed || imageUrl.length === 0 ? "/default-thumbnail.png" : imageUrl[0]
      }
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}
