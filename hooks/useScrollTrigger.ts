"use client";

import { useEffect, useRef } from "react";

export const useScrollTrigger = (
  callback: () => void,
  threshold: number = 100,
) => {
  const firedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (firedRef.current) return;

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - threshold
      ) {
        callback();
        firedRef.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback, threshold]);
};
