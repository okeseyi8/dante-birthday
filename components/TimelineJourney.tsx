import { TIMELINE_EVENTS } from "@/public/birthday_pics/constants";

export const TimelineJourney = () => {
  return (
    <section className="section-padding" style={{ backgroundColor: "#f1efea" }}>
      <h2
        style={{ textAlign: "center", fontSize: "3rem", marginBottom: "50px" }}
      >
        The Journey So Far
      </h2>
      <div className="timeline">
        {TIMELINE_EVENTS.map((event, index) => (
          <div
            key={event.year}
            className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
          >
            <div className="timeline-content">
              <h3>{event.year}</h3>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
