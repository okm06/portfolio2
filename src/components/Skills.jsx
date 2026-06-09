import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../assets/css/skills.css";
import claudeIcon from "../assets/icons/claude.svg";
import geminiIcon from "../assets/icons/gemini.svg";
import chatgptIcon from "../assets/icons/chatgpt.svg";
import gsapIcon from "../assets/icons/gsap.svg";

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "HTML", icon: "devicon-html5-plain colored" },
      { name: "CSS", icon: "devicon-css3-plain colored" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
      { name: "jQuery", icon: "devicon-jquery-plain colored" },
      { name: "GSAP", icon: gsapIcon, type: "img" },
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
    category: "Tools",
    skills: [
      { name: "GitHub", icon: "devicon-github-original colored", type: "devicon" },
      { name: "Git", icon: "devicon-git-plain colored", type: "devicon" },
      { name: "Claude", icon: claudeIcon, type: "img" },
      { name: "Gemini", icon: geminiIcon, type: "img" },
      { name: "ChatGPT", icon: chatgptIcon, type: "img" },
    ],
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
        const icon = item.querySelector("i, img");
        if (icon) gsap.to(icon, { scale: 1.2, duration: 0.2, ease: "power2.out" });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(item, { y: 0, duration: 0.3, ease: "power2.out" });
        const icon = item.querySelector("i, img");
        if (icon) gsap.to(icon, { scale: 1, duration: 0.3, ease: "power2.out" });
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
                    {skill.type === "img" ? (
                      <img src={skill.icon} alt={skill.name} className="skill-svg-icon" />
                    ) : (
                      <i className={skill.icon}></i>
                    )}
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
