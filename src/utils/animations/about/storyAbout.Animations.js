import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const storyAboutAnimations = () => {
  const section = ".about-story-section";

  // ── 1. Top rule: grow from left to right ────────────────────────
  gsap.set(".top-rule", { scaleX: 0, transformOrigin: "left center" });
  gsap.to(".top-rule", {
    scaleX: 1,
    duration: 1.3,
    ease: "power3.out",
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
    },
  });

  // ── 2. Headline via SplitText (words masked, scroll-triggered) ───
  gsap.set(".about-story-title", { autoAlpha: 1 });

  SplitText.create(".about-story-title", {
    type: "words",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.words, {
        x: "100%",
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: ".about-story-headline",
          start: "top 85%",
        },
      });
    },
  });

  // ── 3. First paragraph: fade in from the left ───────────────────
  gsap.from(".story-paragraph-1", {
    x: -60,
    autoAlpha: 0,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".about-story-body",
      start: "top 85%",
    },
  });

  // ── 4. Second paragraph: fade in from the right ─────────────────
  gsap.from(".story-paragraph-2", {
    x: 60,
    autoAlpha: 0,
    duration: 0.9,
    ease: "power3.out",
    delay: 0.15,
    scrollTrigger: {
      trigger: ".about-story-body",
      start: "top 85%",
    },
  });

  // ── 5. Bottom rule: grow from left to right when visible ─────────
  gsap.set(".bottom-rule", { scaleX: 0, transformOrigin: "left center" });
  gsap.to(".bottom-rule", {
    scaleX: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".bottom-rule",
      start: "top 90%",
    },
  });
};
