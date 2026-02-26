"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { initAOS } from "@/services/animationService";
import { HeroCover } from "@/components/HeroCover";
import { EditorialLetter } from "@/components/EditorialLetter";
import { TimelineJourney } from "@/components/TimelineJourney";
import { PhotoGallery } from "@/components/PhotoGallery";
import { FunFacts } from "@/components/FunFacts";
import { Testimonials } from "@/components/Testimonials";
import { FutureChapter } from "@/components/FutureChapter";
import { FinaleCelebration } from "@/components/FinaleCelebration";

export default function EditionPage() {
  const params = useParams();
  const year = params.year as string;

  useEffect(() => {
    initAOS();
  }, []);

  return (
    <>
      <HeroCover />
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>Birthday Edition {year}</h1>
      </div>
      <EditorialLetter />
      <TimelineJourney />
      <PhotoGallery />
      <FunFacts />
      <Testimonials />
      <FutureChapter />
      <FinaleCelebration />
    </>
  );
}
