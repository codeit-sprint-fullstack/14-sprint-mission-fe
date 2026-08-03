"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchForm({ initialValue = "" }) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!value) {
      router.push("/");
      return;
    }

    const encodedValue = encodeURIComponent(value);
    router.push(`/search?q=${encodedValue}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="q" value={value} onChange={handleChange} />
    </form>
  );
}
