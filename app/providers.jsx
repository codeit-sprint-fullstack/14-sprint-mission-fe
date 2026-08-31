"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { getErrorMessage } from "./lib/error";
import Modal from "./components/Modal";

export default function Providers({ children }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            onError: (error) => setErrorMessage(getErrorMessage(error)),
          },
          queries: {
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {errorMessage && (
        <Modal message={errorMessage} onConfirm={() => setErrorMessage(null)} />
      )}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

//서버에서도 돌아가는지 -> 아니라면 client컴포넌트를 거쳐서 가야 함
