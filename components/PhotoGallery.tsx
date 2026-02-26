"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { PLACEHOLDER_IMAGES } from "@/utils/constants";

export const PhotoGallery = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !col1Ref.current ||
      !col2Ref.current ||
      !col3Ref.current ||
      !galleryRef.current
    )
      return;

    const columns = [col1Ref.current, col2Ref.current, col3Ref.current];
    const tweens: gsap.core.Tween[] = [];

    columns.forEach((column, index) => {
      const totalHeight = column.scrollHeight / 2; // Half because we doubled the items
      const direction = index % 2 === 0 ? -1 : 1;
      const startY = direction === 1 ? -totalHeight : 0;

      // Set initial position for columns moving down
      if (direction === 1) {
        gsap.set(column, { y: startY });
      }

      const tween = gsap.to(column, {
        y: direction === -1 ? -totalHeight : 0,
        duration: 60,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          // Reset position for seamless loop
          gsap.set(column, { y: direction === 1 ? -totalHeight : 0 });
        },
      });
      tweens.push(tween);
    });

    // Pause on hover/touch
    const gallery = galleryRef.current;
    const pauseAnimation = () => tweens.forEach((t) => t.pause());
    const resumeAnimation = () => tweens.forEach((t) => t.resume());

    gallery.addEventListener("mouseenter", pauseAnimation);
    gallery.addEventListener("mouseleave", resumeAnimation);
    gallery.addEventListener("touchstart", pauseAnimation);
    gallery.addEventListener("touchend", resumeAnimation);

    return () => {
      gallery.removeEventListener("mouseenter", pauseAnimation);
      gallery.removeEventListener("mouseleave", resumeAnimation);
      gallery.removeEventListener("touchstart", pauseAnimation);
      gallery.removeEventListener("touchend", resumeAnimation);
      tweens.forEach((t) => t.kill());
    };
  }, []);

  // Duplicate images for seamless scrolling
  const duplicatedImages = [
    ...PLACEHOLDER_IMAGES.gallery,
    ...PLACEHOLDER_IMAGES.gallery,
  ];

  return (
    <section className="section-padding ">
      <h2
        style={{ textAlign: "center", fontSize: "3rem", marginBottom: "50px" }}
      >
        Moments That Made Us
      </h2>
      <div ref={galleryRef} className="gallery-grid">
        <div ref={col1Ref} className="gallery-column">
          {duplicatedImages.map((item, index) => (
            <div key={`col1-${index}`} className="gallery-item">
              <Image
                src={item.src}
                alt={`Moment ${index + 1}`}
                width={400}
                height={350}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
              <div className="gallery-overlay">
                <span className="gallery-overlay-text">{item.message}</span>
              </div>
            </div>
          ))}
        </div>
        <div ref={col2Ref} className="gallery-column">
          {duplicatedImages.map((item, index) => (
            <div key={`col2-${index}`} className="gallery-item">
              <Image
                src={item.src}
                alt={`Moment ${index + 1}`}
                width={400}
                height={350}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
              <div className="gallery-overlay">
                <span className="gallery-overlay-text">{item.message}</span>
              </div>
            </div>
          ))}
        </div>
        <div ref={col3Ref} className="gallery-column">
          {duplicatedImages.map((item, index) => (
            <div key={`col3-${index}`} className="gallery-item">
              <Image
                src={item.src}
                alt={`Moment ${index + 1}`}
                width={400}
                height={350}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
              <div className="gallery-overlay">
                <span className="gallery-overlay-text">{item.message}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
