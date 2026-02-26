import Image from "next/image";
import { HERO_IMAGE } from "@/utils/constants";

export const HeroCover = () => {
  return (
    <header className="hero">
      <div className="hero-content" data-aos="fade-up" data-aos-duration="1500">
        <h4>The Special Edition</h4>
        {/* <h1>THE ALEX SMITH ISSUE</h1> */}
                <h1 className="uppercase">The Daniel <br/> Komolafe Issue</h1>
        <p>A Life Well Lived. A Legend Still Rising.</p>
      </div>
      <div className="scroll-indicator">Scroll to Begin</div>
    </header>
  );
};
