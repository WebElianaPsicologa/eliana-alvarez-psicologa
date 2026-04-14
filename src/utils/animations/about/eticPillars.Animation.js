import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const eticPillarsAnimation = () => {
  const colors = ["#674d72", "#b9cadf", "#cbcf96"];

  gsap.set(".line", { background: gsap.utils.wrap(colors) });

  const animation = gsap.fromTo(
    ".line",
    { y: -96 },
    { y: 200, ease: "none", duration: 1, stagger: 0.7 },
  );

  ScrollTrigger.create({
    trigger: ".line-sections",
    start: "top center",
    end: "bottom center",
    markers: false,
    animation: animation,
    scrub: 1,
  });
};
