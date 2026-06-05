import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../assets/css/hero.css";

function Hero() {
  const nameRef = useRef(null);
  const labelRef = useRef(null);
  const descRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    gsap.set([labelRef.current, nameRef.current, descRef.current, scrollRef.current], {
      opacity: 0,
      y: 30,
    });

    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(labelRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    })
      .to(
        nameRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.3",
      )
      .to(
        descRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.5",
      )
      .to(
        scrollRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3",
      );

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;

      gsap.to(nameRef.current, {
        rotateY: x * 30, //좌우
        rotateX: -y * 30, //상하
        transformPerspective: 400, //숫자가 작을수록 극적
        duration: 0.8,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(nameRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-inner">
        <p className="hero-label" ref={labelRef}>
          오경민
        </p>
        <h1 className="hero-name" ref={nameRef}>
          Frontend<br></br> Developer
        </h1>
        <p className="hero-desc" ref={descRef}>
          HTML, CSS, JavaScript 기반의
          <br />
          인터랙티브한 웹을 만듭니다.
        </p>
      </div>
      <span className="hero-scroll" ref={scrollRef}>
        Scroll
      </span>
    </section>
  );
}

export default Hero;
