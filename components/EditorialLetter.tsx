import Image from "next/image";
import { PLACEHOLDER_IMAGES } from "@/utils/constants";

export const EditorialLetter = () => {
  return (
    <section className="section-padding">
      <h2
        style={{ textAlign: "center", marginBottom: "50px", fontSize: "3rem" }}
      >
        Letter from the Editor
      </h2>
      <div className="editorial-container">
        <div data-aos="fade-right">
          <Image
            src={PLACEHOLDER_IMAGES.friend}
            alt="Friend Photo"
            width={600}
            height={800}
            style={{
              width: "100%",
              border: "10px solid white",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            }}
          />
        </div>
        <div data-aos="fade-left">
          <p>
            <span className="drop-cap">T</span>o know Alex is to witness a
            masterclass in authenticity. In this special digital edition, we
            celebrate 30 years of brilliance, laughter, and relentless ambition.
            It isn't just a birthday; it's a milestone for someone who makes the
            world a little brighter just by being in it.
          </p>
          <div className="pull-quote">
            "He doesn't just walk into a room; he changes the energy of it."
          </div>
          <p>
            From the early days of late-night study sessions to the career
            heights he's reaching now, one thing remains constant: his loyalty.
            Happy Birthday, Alex. This issue is for you.
          </p>
        </div>
      </div>
    </section>
  );
};
