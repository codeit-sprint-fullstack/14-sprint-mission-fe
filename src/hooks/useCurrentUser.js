"use client";

import { getAccessToken } from "@/lib/authToken";
import { getMe } from "@/lib/userApi";
import { useQuery } from "@tanstack/react-query";

export default function useCurrentUser() {
  const query = useQuery({
    queryKey: ["currentUser"],

    queryFn: async () => {
      if (!getAccessToken()) {
        return null;
      }

      return getMe();
    },

    retry: (failureCount, error) => {
      if (error.response?.status === 401) {
        return false;
      }

      return failureCount < 1;
    },
  });

  const isUnauthorized = query.error?.response?.status === 401;

  return {
    ...query,
    data: isUnauthorized ? null : query.data,
    isCheckingAuth: query.isPending || (query.isFetching && query.data == null),
  };
}
