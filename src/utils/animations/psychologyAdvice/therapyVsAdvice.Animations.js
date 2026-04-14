import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const therapyVsAdviceAnimations = () => {
  const left = document.querySelector(".therapy-vs-advice-left");
  const right = document.querySelector(".therapy-vs-advice-right");

  gsap.set(left, { x: -48 });
  gsap.set(right, { x: 48 });

  const tl = gsap.timeline({
    defaults: { duration: 0.75, ease: "power3.out" },
    scrollTrigger: {
      trigger: ".therapy-vs-advice",
      start: "top 75%",
    },
  });

  tl.to(left, { autoAlpha: 1, x: 0 }, 0).to(right, { autoAlpha: 1, x: 0 }, 0);
};
