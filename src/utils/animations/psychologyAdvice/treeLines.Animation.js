import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const treeLinesAnimation = () => {
  const title = document.querySelector(".intervention-lines-title");
  const cards = gsap.utils.toArray(".intervention-card");

  if (!title || !cards.length) return;

  gsap.set([title, ...cards], { autoAlpha: 0, xPercent: 100 });

  gsap.to(title, {
    autoAlpha: 1,
    xPercent: 0,
    duration: 0.7,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".intervention-lines-header",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  gsap.to(cards, {
    autoAlpha: 1,
    xPercent: 0,
    duration: 0.6,
    ease: "power2.out",
    stagger: 0.12,
    scrollTrigger: {
      trigger: ".intervention-lines-header",
      start: "top 65%",
      toggleActions: "play none none none",
    },
  });
};
