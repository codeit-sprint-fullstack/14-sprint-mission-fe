"use client";

import { getApiErrorMessage } from "@/lib/apiError";
import { setAccessToken } from "@/lib/authToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useAuthMutation({ mutationFn, fallbackErrorMessage }) {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn,

    onSuccess: (response) => {
      setAccessToken(response.accessToken);

      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });

      router.push("/items");
    },

    onError: (error) => {
      const message = getApiErrorMessage(error, fallbackErrorMessage);

      setErrorMessage(message);
    },
  });

  return {
    mutation,
    errorMessage,
    clearError: () => setErrorMessage(""),
  };
}
