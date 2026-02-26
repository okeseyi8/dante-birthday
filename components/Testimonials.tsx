"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react";
import { gsap } from "gsap";

const AUDIO_FILES = [
  // Only include files that exist
  { id: 1, title: "Christy's Wish", src: "/audio/christy-wish.mp3" },
  { id: 2, title: "Dante's Voice", src: "/audio/christy-wish.mp3" },
  { id: 3, title: "Friend's Message", src: "/audio/christy-wish.mp3" },
  { id: 4, title: "Family Greeting", src: "/audio/christy-wish.mp3" },
];

// Context to manage currently playing audio
const AudioContext = createContext<{
  currentAudio: HTMLAudioElement | null;
  setCurrentAudio: (audio: HTMLAudioElement | null) => void;
}>({
  currentAudio: null,
  setCurrentAudio: () => {},
});

const AudioPlayer = ({ title, src }: { title: string; src: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentAudio, setCurrentAudio } = useContext(AudioContext);

  const togglePlay = async () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        // Stop any currently playing audio
        if (currentAudio && currentAudio !== audioRef.current) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setCurrentAudio(audioRef.current);
        } catch (error) {
          console.error("Audio playback failed:", error);
        }
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
        setCurrentAudio(null);
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
    setCurrentAudio(null);
  };

  // Listen for when another audio starts playing
  useEffect(() => {
    if (currentAudio !== audioRef.current && isPlaying) {
      setIsPlaying(false);
      if (progressRef.current) {
        progressRef.current.style.width = "0%";
      }
    }
  }, [currentAudio, isPlaying]);

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
      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
};

export const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null,
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const row1 = container.querySelector(".row1") as HTMLElement;
    const row2 = container.querySelector(".row2") as HTMLElement;
    const tweens: gsap.core.Tween[] = [];

    if (row1 && row2) {
      // Calculate half width for seamless loop (items are duplicated)
      const row1Width = row1.scrollWidth / 2;
      const row2Width = row2.scrollWidth / 2;

      // Row 1: move left continuously (start at 0, go to -halfWidth)
      const tween1 = gsap.to(row1, {
        x: -row1Width,
        duration: 40,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          gsap.set(row1, { x: 0 });
        },
      });
      tweens.push(tween1);

      // Row 2: move right continuously (start at -halfWidth, go to 0)
      gsap.set(row2, { x: -row2Width });
      const tween2 = gsap.to(row2, {
        x: 0,
        duration: 40,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          gsap.set(row2, { x: -row2Width });
        },
      });
      tweens.push(tween2);

      // Pause on hover/touch
      const pauseAnimation = () => tweens.forEach((t) => t.pause());
      const resumeAnimation = () => tweens.forEach((t) => t.resume());

      container.addEventListener("mouseenter", pauseAnimation);
      container.addEventListener("mouseleave", resumeAnimation);
      container.addEventListener("touchstart", pauseAnimation);
      container.addEventListener("touchend", resumeAnimation);

      return () => {
        container.removeEventListener("mouseenter", pauseAnimation);
        container.removeEventListener("mouseleave", resumeAnimation);
        container.removeEventListener("touchstart", pauseAnimation);
        container.removeEventListener("touchend", resumeAnimation);
        tweens.forEach((t) => t.kill());
      };
    }
  }, []);

  // Duplicate audio files for seamless scrolling
  const duplicatedAudio = [
    ...AUDIO_FILES,
    ...AUDIO_FILES,
    ...AUDIO_FILES,
    ...AUDIO_FILES,
  ];

  return (
    <AudioContext.Provider value={{ currentAudio, setCurrentAudio }}>
      <section className="section-padding">
        <h2
          style={{
            textAlign: "center",
            fontSize: "3rem",
            marginBottom: "50px",
          }}
        >
          Birthday Wishes & Voices
        </h2>
        <div ref={containerRef} className="audio-grid">
          <div className="audio-row row1">
            {duplicatedAudio.map((audio, index) => (
              <div key={`row1-${audio.id}-${index}`} className="audio-item">
                <AudioPlayer title={audio.title} src={audio.src} />
              </div>
            ))}
          </div>
          <div className="audio-row row2">
            {duplicatedAudio.map((audio, index) => (
              <div key={`row2-${audio.id}-${index}`} className="audio-item">
                <AudioPlayer title={audio.title} src={audio.src} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </AudioContext.Provider>
  );
};
