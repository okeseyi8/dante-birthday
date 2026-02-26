"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const AUDIO_FILES = [
  // Duplicated data for seamless infinite scroll
  { id: 1, title: "Birthday Wish 1", src: "/audio/wish1.mp3" },
  { id: 2, title: "Birthday Wish 2", src: "/audio/wish2.mp3" },
  { id: 3, title: "Birthday Wish 3", src: "/audio/wish3.mp3" },
  { id: 4, title: "Birthday Wish 4", src: "/audio/wish4.mp3" },
  { id: 5, title: "Birthday Wish 5", src: "/audio/wish5.mp3" },
  { id: 6, title: "Birthday Wish 6", src: "/audio/wish6.mp3" },
  // Duplicate set
  { id: 11, title: "Birthday Wish 1", src: "/audio/wish1.mp3" },
  { id: 12, title: "Birthday Wish 2", src: "/audio/wish2.mp3" },
  { id: 13, title: "Birthday Wish 3", src: "/audio/wish3.mp3" },
  { id: 14, title: "Birthday Wish 4", src: "/audio/wish4.mp3" },
  { id: 15, title: "Birthday Wish 5", src: "/audio/wish5.mp3" },
  { id: 16, title: "Birthday Wish 6", src: "/audio/wish6.mp3" },
];

const AudioPlayer = ({ title, src }: { title: string; src: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const updateProgress = () => {
    if (audioRef.current && progressRef.current) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      progressRef.current.style.width = `${progress}%`;
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("ended", handleEnded);
      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, []);

  return (
    <div className="audio-player">
      <div className="audio-header">
        <h4>{title}</h4>
        <button ref={playBtnRef} onClick={togglePlay} className="play-btn">
          <span className="play-icon">{isPlaying ? "⏸" : "▶"}</span>
        </button>
      </div>
      <div className="progress-bar">
        <div ref={progressRef} className="progress-fill"></div>
      </div>
      <audio ref={audioRef} src={src} preload="none" />
    </div>
  );
};

export const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const row1 = containerRef.current.querySelector(".row1") as HTMLElement;
    const row2 = containerRef.current.querySelector(".row2") as HTMLElement;

    if (row1 && row2) {
      // Calculate half width for seamless loop (items are duplicated)
      const row1Width = row1.scrollWidth / 2;
      const row2Width = row2.scrollWidth / 2;

      // Row 1: move left continuously (start at 0, go to -halfWidth)
      gsap.to(row1, {
        x: -row1Width,
        duration: 40,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          gsap.set(row1, { x: 0 });
        },
      });

      // Row 2: move right continuously (start at -halfWidth, go to 0)
      gsap.set(row2, { x: -row2Width });
      gsap.to(row2, {
        x: 0,
        duration: 40,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          gsap.set(row2, { x: -row2Width });
        },
      });
    }
  }, []);

  return (
    <section className="section-padding">
      <h2
        style={{ textAlign: "center", fontSize: "3rem", marginBottom: "50px" }}
      >
        Birthday Wishes & Voices
      </h2>
      <div ref={containerRef} className="audio-grid">
        <div className="audio-row row1">
          {[...AUDIO_FILES, ...AUDIO_FILES].map((audio, index) => (
            <div key={`row1-${audio.id}-${index}`} className="audio-item">
              <AudioPlayer title={audio.title} src={audio.src} />
            </div>
          ))}
        </div>
        <div className="audio-row row2">
          {[...AUDIO_FILES, ...AUDIO_FILES].map((audio, index) => (
            <div key={`row2-${audio.id}-${index}`} className="audio-item">
              <AudioPlayer title={audio.title} src={audio.src} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
