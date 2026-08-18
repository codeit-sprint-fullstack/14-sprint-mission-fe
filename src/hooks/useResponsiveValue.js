"use client";

import { useEffect, useState } from "react";

export default function useResponsiveValue({ mobile, tablet, desktop }) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const mobileMedia = window.matchMedia("(max-width: 743px)");
    const tabletMedia = window.matchMedia(
      "(min-width: 744px) and (max-width: 1199px)",
    );

    function updateValue() {
      if (mobileMedia.matches) {
        setValue(mobile);
        return;
      }

      if (tabletMedia.matches) {
        setValue(tablet);
        return;
      }

      setValue(desktop);
    }

    updateValue();

    mobileMedia.addEventListener("change", updateValue);
    tabletMedia.addEventListener("change", updateValue);

    return () => {
      mobileMedia.removeEventListener("change", updateValue);
      tabletMedia.removeEventListener("change", updateValue);
    };
  }, [mobile, tablet, desktop]);

  return value;
}
