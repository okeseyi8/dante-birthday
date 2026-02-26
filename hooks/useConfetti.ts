"use client";

import { useCallback } from "react";
import confetti from "canvas-confetti";

export const useConfetti = () => {
  const launchConfetti = useCallback(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#c5a059", "#1a1a1a", "#ffffff"],
    });
  }, []);

  return { launchConfetti };
};
