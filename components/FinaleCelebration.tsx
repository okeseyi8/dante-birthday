"use client";

import { useConfetti } from "@/hooks/useConfetti";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { scrollToTop } from "@/utils/helpers";
import { Button } from "./UI/Button";

export const FinaleCelebration = () => {
  const { launchConfetti } = useConfetti();

  useScrollTrigger(launchConfetti);

  return (
    <section className="finale">
      <h1 style={{ fontSize: "5rem" }} data-aos="scale-up">
        Happy Birthday, Dante!
      </h1>
      <p style={{ marginBottom: "30px" }}>
        Celebrating 24 Years of Excellence.
      </p>
      <Button onClick={launchConfetti}>Launch Confetti</Button>
      <br />
      <Button variant="secondary" onClick={scrollToTop}>
        Replay the Story
      </Button>
    </section>
  );
};
