"use client";

import { useQuery } from "@tanstack/react-query";
import { getMe } from "../lib/api/auth";
import { userKeys } from "../lib/queryKeys";

export function useAuth() {
  const { data: user, isPending } = useQuery({
    queryKey: userKeys.me(),
    queryFn: () => getMe(),
    retry: false,
  });
  return { user, isPending };
}
