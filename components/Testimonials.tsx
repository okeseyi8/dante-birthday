import { TESTIMONIALS } from "@/utils/constants";

export const Testimonials = () => {
  return (
    <section className="section-padding">
      <h2
        style={{ textAlign: "center", fontSize: "3rem", marginBottom: "50px" }}
      >
        Voices from the Archives
      </h2>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {TESTIMONIALS.map((testimonial, index) => (
          <div
            key={index}
            className="testimonial-sidebar"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <p dangerouslySetInnerHTML={{ __html: testimonial.quote }} />
            <strong
              style={{
                display: "block",
                marginTop: "10px",
                color: "var(--accent)",
              }}
            >
              — {testimonial.author}
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
};
