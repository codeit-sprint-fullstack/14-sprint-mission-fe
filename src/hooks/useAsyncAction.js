"use client";

import { getApiErrorMessage } from "@/lib/apiError";
import { useState } from "react";

export default function useAsyncAction(defaultErrorMessage) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const execute = async (asyncAction) => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const data = await asyncAction();

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error(error);

      const message = getApiErrorMessage(error, defaultErrorMessage);

      setErrorMessage(message);

      return {
        success: false,
        data: null,
        errorMessage: message,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setErrorMessage("");
  };

  return {
    execute,
    isLoading,
    errorMessage,
    clearError,
  };
}
