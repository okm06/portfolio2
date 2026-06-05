import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../assets/css/skills.css";

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "HTML", icon: "devicon-html5-plain colored" },
      { name: "CSS", icon: "devicon-css3-plain colored" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
      { name: "jQuery", icon: "devicon-jquery-plain colored" },
      { name: "React", icon: "devicon-react-original colored", learning: true },
    ],
  },
  {
    category: "Design",
    skills: [
      { name: "Photoshop", icon: "devicon-photoshop-plain colored" },
      { name: "Figma", icon: "devicon-figma-plain colored" },
    ],
  },
  {
    category: "Backend",
    skills: [{ name: "Spring Boot", icon: "devicon-spring-plain colored", learning: true }],
  },
  {
    category: "AI",
    skills: [{ name: "AI 툴 활용", icon: "devicon-github-original colored" }],
  },
];

function Skills() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.set(titleRef.current, { opacity: 0, y: 40 });
    const rows = sectionRef.current.querySelectorAll(".skills-row");
    gsap.set(rows, { opacity: 0, y: 30 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      onEnter: () => {
        gsap.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        });
        gsap.to(rows, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        });
      },
    });

    const items = sectionRef.current.querySelectorAll(".skill-item");
    items.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, { y: -6, duration: 0.2, ease: "power2.out" });
        gsap.to(item.querySelector("i"), { scale: 1.2, duration: 0.2, ease: "power2.out" });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(item, { y: 0, duration: 0.3, ease: "power2.out" });
        gsap.to(item.querySelector("i"), { scale: 1, duration: 0.3, ease: "power2.out" });
      });
    });
  }, []);

  return (
    <section className="skills" id="skills" ref={sectionRef}>
      <div className="skills-inner">
        <p className="skills-title" ref={titleRef}>
          Skills
        </p>
        <div className="skills-list">
          {skillsData.map((group) => (
            <div className="skills-row" key={group.category}>
              <span className="skills-category">{group.category}</span>
              <div className="skills-tags">
                {group.skills.map((skill) => (
                  <div
                    className={`skill-item ${skill.learning ? "skill-item--learning" : ""}`}
                    key={skill.name}
                  >
                    <i className={skill.icon}></i>
                    <span>{skill.name}</span>
                    {skill.learning && <em>학습중</em>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
