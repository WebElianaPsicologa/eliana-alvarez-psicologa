import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animateMethodsContact = () => {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    const leftColumn = document.querySelector(".left-column");
    const rightColumn = document.querySelector(".right-column");
    const methodsContact = document.querySelector(".methods-contact");

    gsap
      .timeline({
        scrollTrigger: {
          trigger: methodsContact,
          start: "top bottom",
          end: "top 30%",
          markers: false,
          toggleActions: "play none none none",
        },
      })
      .fromTo(
        leftColumn,
        { xPercent: -100, autoAlpha: 0 },
        { xPercent: 0, autoAlpha: 1, duration: 1 },
      )
      .fromTo(
        rightColumn,
        { xPercent: 100, autoAlpha: 0 },
        { xPercent: 0, autoAlpha: 1, duration: 1 },
        "<",
      );
  });
};
