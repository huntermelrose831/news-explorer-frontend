import "./About.css";
import Selfie from "../../assets/IMG_1385.jpg";
function About() {
  return (
    <section className="about">
      <img src={Selfie} alt="Author" className="about__image" />
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          My name is Hunter, and I’m a full‑stack product engineer, hardware
          prototyper, and founder of PrintCycleWorks, where I design and market
          innovative 3D‑printed cycling gear, home décor, and collectibles.
          Alongside my entrepreneurial work, I also serve as a valet attendant
          at Hyatt Hotels, a role that sharpens my ability to manage logistics,
          operate hydraulic lifts, and stay calm under pressure—skills that
          translate directly into my engineering projects. I specialize in
          modern web development technologies including MongoDB, Express, React,
          and Node.js, and I’m comfortable deploying and testing end‑to‑end
          solutions in the cloud. On the hardware side, I’m experienced in
          sensor/display integration, firmware flashing, voltage regulation, and
          power electronics, with a knack for reverse‑engineering consumer
          devices to unlock new capabilities. My technical toolkit also includes
          Linux command line proficiency, troubleshooting CI/CD pipelines, and
          automating workflows for scalable, reproducible results.
        </p>
        <p className="about__text">
          {" "}
          I’m currently advancing my software engineering skills through the
          TripleTen program, where I’ve deepened my expertise in full‑stack
          development, cloud infrastructure, and collaborative project
          workflows. TripleTen has taught me how to integrate modern
          technologies into real‑world applications, document processes clearly,
          and iterate quickly—skills that make me both a persistent learner and
          a reliable problem solver. For potential customers, I bring a unique
          blend of hands‑on hardware knowledge and modern software engineering.
          Whether it’s building smart monitoring stations for 3D printers,
          optimizing product branding for online sales, or troubleshooting
          complex systems, I focus on creating solutions that are safe,
          scalable, and impactful. My goal is always to bridge the gap between
          technical experimentation and practical results, helping clients turn
          ideas into working products that thrive in the real world.{" "}
        </p>
      </div>
    </section>
  );
}

export default About;
