"use client";

import Dropdown from "@/components/Dropdown/Dropdown";
import { useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [{ label: "최신순", value: "recent" }];

export default function BoardSortDropdown({ defaultValue = "recent" }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", value);

    router.push(`/boards?${params.toString()}`);
  };

  return (
    <Dropdown
      options={SORT_OPTIONS}
      defaultValue={defaultValue}
      onChange={handleSortChange}
    />
  );
}
