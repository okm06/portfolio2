import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../assets/css/contact.css";

gsap.registerPlugin(ScrollTrigger);

const contactData = {
  email: "aokm1203@naver.com",
  github: "https://github.com/okm06",
  phone: "010-2488-7314",
};

function Contact() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.set([titleRef.current, contentRef.current], { opacity: 0, y: 40 });

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
        gsap.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
        });
      },
    });
  }, []);

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="contact-inner">
        <p className="contact-title" ref={titleRef}>
          Contact
        </p>
        <div className="contact-content" ref={contentRef}>
          <p className="contact-sub">같이 일하고 싶으시다면 언제든지 연락주세요.</p>
          <div className="contact-links">
            <a className="contact-link" href={`tel:${contactData.phone}`}>
              <span className="contact-link-label">Phone</span>
              <span className="contact-link-value">{contactData.phone}</span>
              <span className="contact-arrow">↗</span>
            </a>
            <a className="contact-link" href={`mailto:${contactData.email}`}>
              <span className="contact-link-label">Email</span>
              <span className="contact-link-value">{contactData.email}</span>
              <span className="contact-arrow">↗</span>
            </a>
            <a className="contact-link" href={contactData.github} target="_blank" rel="noreferrer">
              <span className="contact-link-label">GitHub</span>
              <span className="contact-link-value">{contactData.github}</span>
              <span className="contact-arrow">↗</span>
            </a>
          </div>
        </div>
      </div>
      <p className="contact-footer">© 2025 오경민. All rights reserved.</p>
    </section>
  );
}

export default Contact;
