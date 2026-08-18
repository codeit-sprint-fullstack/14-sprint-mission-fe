"use client";

import { getErrorMessage } from "@/app/lib/error";

export default function Error({ error }) {
  return (
    <div>
      <p>{getErrorMessage(error)}</p>
    </div>
  );
}
