import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const benefitsIntegralAnimations = () => {
  const title = document.querySelector(".benefits-integral h2");
  const cards = document.querySelectorAll(".benefits-integral .benefits-card");

  if (!title || !cards.length) return;

  // Title: fade in from z triggered by scroll
  gsap.from(title, {
    scrollTrigger: {
      trigger: title,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    autoAlpha: 0,
    scale: 0.88,
    z: -60,
    transformOrigin: "center center",
    duration: 0.75,
    ease: "power3.out",
  });

  // Cards: fade in from z with stagger triggered by scroll
  gsap.from(cards, {
    scrollTrigger: {
      trigger: ".benefits-integral .grid",
      start: "top 50%",
      end: "bottom top",
      toggleActions: "play none none none",
      markers: false,
    },
    autoAlpha: 0,
    scale: 0.9,
    z: -80,
    transformOrigin: "center center",
    duration: 0.65,
    stagger: 0.5,
    ease: "power3.out",
  });
};
