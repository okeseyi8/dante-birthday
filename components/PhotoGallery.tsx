import Image from "next/image";
import { PLACEHOLDER_IMAGES } from "@/utils/constants";

export const PhotoGallery = () => {
  return (
    <section className="section-padding">
      <h2
        style={{ textAlign: "center", fontSize: "3rem", marginBottom: "50px" }}
      >
        Moments That Made Us
      </h2>
      <div className="gallery-grid">
        {PLACEHOLDER_IMAGES.gallery.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Moment ${index + 1}`}
            width={400}
            height={index % 2 === 0 ? 500 : 300}
            data-aos="zoom-in"
          />
        ))}
      </div>
    </section>
  );
};
