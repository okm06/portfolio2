import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../assets/css/projects.css";
import teemoThumb from "../assets/img/teemo.png";
import onetopThumb from "../assets/img/onetop.png";

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
    name: "Teemo",
    desc: "JavaScript와 GSAP를 활용하여 정적인 웹페이지에 생동감을 불어넣은 인터랙티브 퍼블리싱 프로젝트입니다. 감각적인 웹 모션과 유기적인 인터랙션 연출에 집중했습니다.",
    tags: ["HTML", "CSS", "JS", "jQuery", "GSAP"],
    thumb: teemoThumb,
    link: "https://teemogolf.com/",
  },
  {
    id: "03",
    name: "ONETOP",
    desc: "웹뷰(WebView) 환경에 맞추어 제작한 하이브리드 모바일 앱 퍼블리싱 프로젝트입니다. 모바일 디바이스에 최적화된 레이아웃과 jQuery 기반의 안정적인 UI를 구현했습니다.",
    tags: ["HTML", "CSS", "JS", "jQuery"],
    thumb: onetopThumb,
    link: "https://otland.kr/app",
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
    const thumbContainer = thumbRef.current;
    const thumbInner = thumbContainer.querySelector(".project-thumb-inner");
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
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { width, height } = thumbContainer.getBoundingClientRect();

      gsap.to(thumbContainer, {
        x: clientX - width / 2,
        y: clientY - height / 2,
        duration: 0.5,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 호버 효과
    items.forEach((item, index) => {
      const project = projectsData[index];

      item.addEventListener("mouseenter", () => {
        if (project.thumb) {
          thumbInner.innerHTML = `<img src="${project.thumb}" alt="${project.name}" />`;
        } else {
          thumbInner.innerHTML = "No Image";
        }

        gsap.to(thumbContainer, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(item.querySelector(".project-name"), { x: 10, duration: 0.3, ease: "power2.out" });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(thumbContainer, { opacity: 0, scale: 0.9, duration: 0.3, ease: "power2.out" });
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
