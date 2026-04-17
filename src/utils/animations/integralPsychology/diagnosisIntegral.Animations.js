import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const diagnosisIntegralAnimations = () => {
  const heading = document.querySelector(".diagnosis-integral-heading");
  const cards = document.querySelector(".diagnosis-integral-cards");

  // Set initial offsets (elements already invisible via HTML class)
  gsap.set(heading, { xPercent: -100 });
  gsap.set(cards, { xPercent: 100 });

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    scrollTrigger: {
      trigger: ".diagnosis-integral",
      start: "top 75%",
      markers: false,
      toggleActions: "play none none none",
    },
  });

  tl.to(heading, {
    autoAlpha: 1,
    xPercent: 0,
    duration: 0.7,
    ease: "back.out(1.7)",
  }).to(
    cards,
    { autoAlpha: 1, xPercent: 0, duration: 0.8, ease: "back.out(1.7)" },
    "<0.5",
  );
};
