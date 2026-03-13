import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const valueProposalAnimations = () => {
  // Animate title
  gsap.from(".value-proposal-title", {
    scrollTrigger: {
      trigger: ".value-proposal-section",
      start: "top 80%",
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out",
  });

  // Animate subtitle
  gsap.from(".value-proposal-subtitle", {
    scrollTrigger: {
      trigger: ".value-proposal-section",
      start: "top 75%",
    },
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.2,
    ease: "power2.out",
  });

  // Animate left column content
  gsap.from(".approach-text", {
    scrollTrigger: {
      trigger: ".value-proposal-content",
      start: "top 75%",
    },
    opacity: 0,
    x: -30,
    duration: 0.8,
    delay: 0.3,
    ease: "power2.out",
  });

  // Animate quote box
  gsap.from(".quote-box", {
    scrollTrigger: {
      trigger: ".value-proposal-content",
      start: "top 70%",
    },
    opacity: 0,
    scale: 0.95,
    duration: 0.8,
    delay: 0.5,
    ease: "back.out(1.2)",
  });

  // Animate checkmark items with stagger
  gsap.from(".checkmark-list > div", {
    scrollTrigger: {
      trigger: ".checkmark-list",
      start: "top 85%",
    },
    opacity: 0,
    x: -20,
    duration: 0.6,
    stagger: 0.15,
    ease: "power2.out",
  });

  // Animate radar chart container
  gsap.from(".chart-wrapper", {
    scrollTrigger: {
      trigger: ".radar-chart-container",
      start: "top 75%",
    },
    opacity: 0,
    x: 30,
    duration: 0.8,
    delay: 0.4,
    ease: "power2.out",
  });

  // Animate radar chart polygon (data area)
  gsap.from(".radar-chart polygon", {
    scrollTrigger: {
      trigger: ".radar-chart",
      start: "top 70%",
    },
    scale: 0,
    transformOrigin: "center center",
    duration: 1,
    delay: 0.6,
    ease: "back.out(1.4)",
  });

  // Animate radar chart dots with stagger
  gsap.from(".radar-chart circle[r='5']", {
    scrollTrigger: {
      trigger: ".radar-chart",
      start: "top 70%",
    },
    scale: 0,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    delay: 1,
    ease: "back.out(2)",
  });
};
