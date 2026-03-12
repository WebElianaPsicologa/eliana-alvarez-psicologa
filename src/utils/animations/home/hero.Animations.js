import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const heroAnimations = () => {
  gsap.timeline({ defaults: { ease: "power3.out" } });

  // Kicker slides in from left
  gsap.from(".hero-kicker", { opacity: 0, x: -20, duration: 0.65 }, 0.2);

  // H1 rises
  gsap.from(
    ".hero-title",
    { opacity: 0, y: 44, duration: 0.85, ease: "power4.out" },
    0.45,
  );

  // Subtitle follows
  gsap.from(".hero-subtitle", { opacity: 0, y: 28, duration: 0.7 }, 0.75);

  // CTAs stagger in
  gsap.from(".hero-ctas", { opacity: 0, y: 20, duration: 0.6 }, 0.95);

  // Microcopy fades
  gsap.from(".hero-microcopy", { opacity: 0, duration: 0.5 }, 1.1);

  // Badge pops in with slight scale
  gsap.from(
    ".hero-badge",
    { opacity: 0, scale: 0.75, y: 10, duration: 0.5, ease: "back.out(1.8)" },
    1.2,
  );
};
