import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const valueProposalAnimations = () => {
  // Header animations — triggered when the title enters the viewport
  gsap.timeline({
    scrollTrigger: {
      trigger: ".value-proposal-title",
      start: "top 85%",
      once: true,
    },
    defaults: { ease: "power2.out", duration: 0.8 },
  })
    .from(".value-proposal-title", { autoAlpha: 0, y: 40 })
    .from(".value-proposal-subtitle", { autoAlpha: 0, y: 24 }, "-=0.5");

  // Content animations — triggered when the content block enters the viewport
  gsap.timeline({
    scrollTrigger: {
      trigger: ".value-proposal-content",
      start: "top 80%",
      once: true,
      markers: true,
    },
    defaults: { ease: "power2.out", duration: 0.9 },
  })
    .from(".value-proposal-content", { autoAlpha: 0, xPercent: 100 })
    .from("#highlights", { autoAlpha: 0, xPercent: -100 }, "<");
};
