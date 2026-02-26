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
            <span className="drop-cap">I</span>’ve known Daniel (Dante) for a
            about 6 years now and it’s been blissful. To know him is to know
            love. He has a spirit that connects people together, he always makes
            an effort for his friends.
          </p>
          <div className="pull-quote">
            " He makes love seem easy and showing up effortless."
          </div>
          <p>
            He’s intelligent, he schooled us all in chess (especially me, I
            started to feel stupid😂, apparently he was just too smart). He fun
            to be with. There’s no dull moment with my guy. From gossiping about
            people, to totally judging them, to speaking on random topics, it’s
            both easy and intriguing to hear him speak. I don’t think I’ve met a
            better nerd.
          </p>
        </div>
        <div data-aos="fade-down">
          <div className="pull-quote">
            " He’s incredibly generous, Dante likes to form hard guy"
          </div>
          <p>
            Like he’s unmoved by anyone or emotions, but we know. He loves us
            and he has his little ways of showing it. Dante gives wholeheartedly
            and he gives like it’s nothing.
          </p>
        </div>

        <div data-aos="fade-up">
          <p>
            <span className="drop-cap">H</span> owever, Dante is incredibly petty😂. If
            you have offended him before, watch your back, cause he’s coming to
            get you and HE WILL!
          </p>

          <div className="pull-quote">
            "Memories of our time together are our treasured possessions."
          </div>
          <p>
            From the entire team, We love you🤍.
          </p>
        </div>
      </div>
    </section>
  );
};
