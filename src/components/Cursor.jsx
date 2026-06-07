import { useEffect, useRef } from "react";
import "../assets/css/cursor.css";

function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    let mouseX = 0,
      mouseY = 0;
    let curX = 0,
      curY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      curX += (mouseX - curX) * 0.08;
      curY += (mouseY - curY) * 0.08;
      cursor.style.transform = `translate(${curX}px, ${curY}px)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    // 호버 요소들
    const hoverEls = document.querySelectorAll("a, button, .skill-item, .project-item");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor--hover");
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor--hover");
      });
    });

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div className="cursor" ref={cursorRef}></div>;
}

export default Cursor;
