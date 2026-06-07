import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../assets/css/projects.css";

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: "01",
    name: "프로젝트명",
    desc: "프로젝트 설명을 여기에 입력하세요.",
    tags: ["React", "GSAP"],
    thumb: null,
    link: "#",
  },
  {
    id: "02",
    name: "프로젝트명",
    desc: "프로젝트 설명을 여기에 입력하세요.",
    tags: ["HTML", "CSS", "JS"],
    thumb: null,
    link: "#",
  },
  {
    id: "03",
    name: "프로젝트명",
    desc: "프로젝트 설명을 여기에 입력하세요.",
    tags: ["jQuery", "Spring Boot"],
    thumb: null,
    link: "#",
  },
  {
    id: "04",
    name: "프로젝트명",
    desc: "프로젝트 설명을 여기에 입력하세요.",
    tags: ["React", "Figma"],
    thumb: null,
    link: "#",
  },
  {
    id: "05",
    name: "프로젝트명",
    desc: "프로젝트 설명을 여기에 입력하세요.",
    tags: ["HTML", "CSS"],
    thumb: null,
    link: "#",
  },
];

function Projects() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const thumbRef = useRef(null);

  useEffect(() => {
    gsap.set(titleRef.current, { opacity: 0, y: 40 });
    const items = sectionRef.current.querySelectorAll(".project-item");
    gsap.set(items, { opacity: 0, y: 30 });

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
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        });
      },
    });

    // 썸네일 마우스 따라다니기
    const thumb = thumbRef.current;
    const handleMouseMove = (e) => {
      gsap.to(thumb, {
        x: e.clientX - 100,
        y: e.clientY - 80,
        duration: 0.5,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 호버 효과
    items.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        gsap.to(thumb, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(item.querySelector(".project-name"), { x: 10, duration: 0.3, ease: "power2.out" });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(thumb, { opacity: 0, scale: 0.9, duration: 0.3, ease: "power2.out" });
        gsap.to(item.querySelector(".project-name"), { x: 0, duration: 0.3, ease: "power2.out" });
      });
    });

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <div className="projects-inner">
        <p className="projects-title" ref={titleRef}>
          Projects
        </p>
        <div className="projects-list">
          {projectsData.map((project) => (
            <a className="project-item" key={project.id} href={project.link}>
              <div className="project-left">
                <span className="project-num">{project.id}</span>
                <div className="project-info">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-desc">{project.desc}</p>
                </div>
              </div>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span className="project-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="project-thumb" ref={thumbRef}>
        <div className="project-thumb-inner">No Image</div>
      </div>
    </section>
  );
}

export default Projects;
