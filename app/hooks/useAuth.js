"use client";

import { useQuery } from "@tanstack/react-query";
import { getMe } from "../lib/api/auth";

export function useAuth() {
  const { data: user, isPending } = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => getMe(),
    retry: false,
  });
  return { user, isPending };
}
