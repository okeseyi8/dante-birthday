import { FUN_FACTS } from "@/utils/constants";

export const FunFacts = () => {
  return (
    <section
      className="section-padding"
      style={{ backgroundColor: "var(--primary)", color: "white" }}
    >
      <h2
        style={{ textAlign: "center", fontSize: "3rem", marginBottom: "50px" }}
      >
        Things You Might Not Know
      </h2>
      <div className="fact-grid">
        {FUN_FACTS.map((fact, index) => (
          <div
            key={index}
            className="fact-card"
            data-aos="flip-up"
            data-aos-delay={index * 100}
          >
            <h3 style={{ color: "var(--accent)" }}>0{index + 1}</h3>
            <p>{fact}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
