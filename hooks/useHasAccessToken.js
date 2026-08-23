import { useSyncExternalStore } from "react";

import { hasAccessToken } from "@/lib/auth";

function subscribe(callback) {
  window.addEventListener("auth-changed", callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("auth-changed", callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return hasAccessToken();
}

function getServerSnapshot() {
  return false;
}

export default function useHasAccessToken() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
