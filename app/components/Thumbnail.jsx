"use client";

import defaultImage from "@/public/default-thumbnail.png";
import Image from "next/image";
import { useState } from "react";

export default function Thumbnail({ imageUrl, alt }) {
  const [failed, setFailed] = useState(false);

  const isImageEmpty = !imageUrl || imageUrl.length === 0;
  const imageSrc = failed || isImageEmpty ? defaultImage : imageUrl[0];

  return (
    <Image
      src={imageSrc}
      alt={alt || "썸네일 이미지"}
      width={200}
      height={200}
      onError={() => setFailed(true)}
      unoptimized={true}
      style={{ objectFit: "cover" }}
    />
  );
}
