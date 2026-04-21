import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ourFocusAboutAnimation = () => {
  const cards = gsap.utils.toArray(".stages-grid .wrapper");
  const title = document.querySelector(".focus-title");

  gsap.set(".top-rule-focus", { scaleX: 0, transformOrigin: "left center" });
  gsap.to(".top-rule-focus", {
    scaleX: 1,
    duration: 1.3,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".our-focus-section",
      start: "top 80%",
    },
  });

  gsap.set([title, ...cards], { autoAlpha: 0, y: 80 });

  gsap.to(
    [title, ...cards],
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".focus-description",
        start: "top 80%",
      },
    },
    "<0.5",
  );

  gsap.set(".bottom-rule-focus", { scaleX: 0, transformOrigin: "left center" });
  gsap.to(".bottom-rule-focus", {
    scaleX: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".bottom-rule-focus",
      start: "top 90%",
    },
  });
};
