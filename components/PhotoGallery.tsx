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
    if (!col1Ref.current || !col2Ref.current || !col3Ref.current) return;

    const columns = [col1Ref.current, col2Ref.current, col3Ref.current];

    columns.forEach((column, index) => {
      const items = column.querySelectorAll(".gallery-item");
      const totalHeight = column.scrollHeight / 2; // Half because we doubled the items
      const direction = index % 2 === 0 ? -1 : 1;
      const startY = direction === 1 ? -totalHeight : 0;

      // Set initial position for columns moving down
      if (direction === 1) {
        gsap.set(column, { y: startY });
      }

      gsap.to(column, {
        y: direction === -1 ? -totalHeight : 0,
        duration: 40,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          // Reset position for seamless loop
          gsap.set(column, { y: direction === 1 ? -totalHeight : 0 });
        },
      });
    });
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
          {duplicatedImages.map((src, index) => (
            <div key={`col1-${index}`} className="gallery-item">
              <Image
                src={src}
                alt={`Moment ${index + 1}`}
                width={400}
                height={350}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
          ))}
        </div>
        <div ref={col2Ref} className="gallery-column">
          {duplicatedImages.map((src, index) => (
            <div key={`col2-${index}`} className="gallery-item">
              <Image
                src={src}
                alt={`Moment ${index + 1}`}
                width={400}
                height={350}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
          ))}
        </div>
        <div ref={col3Ref} className="gallery-column">
          {duplicatedImages.map((src, index) => (
            <div key={`col3-${index}`} className="gallery-item">
              <Image
                src={src}
                alt={`Moment ${index + 1}`}
                width={400}
                height={350}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
