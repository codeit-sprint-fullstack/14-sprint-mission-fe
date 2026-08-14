"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useAuthMutation({ mutationFn, fallbackErrorMessage }) {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const mutation = useMutation({
    mutationFn,

    onSuccess: (response) => {
      localStorage.setItem("accessToken", response.accessToken);
      router.push("/items");
    },

    onError: (error) => {
      const message = error.response?.data?.message;

      setErrorMessage(
        typeof message === "string" ? message : fallbackErrorMessage,
      );
    },
  });

  return {
    mutation,
    errorMessage,
    clearError: () => setErrorMessage(""),
  };
}
