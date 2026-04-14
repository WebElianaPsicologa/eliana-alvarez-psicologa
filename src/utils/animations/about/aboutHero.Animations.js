import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export const aboutHeroAnimations = () => {
  // ── 1. SplitText on H1 ──────────────────────────────────────────
  // autoAlpha on the H1 makes it visible before splitting so SplitText
  // can measure it, then the words animate in from y: 110%.
  gsap.set(".about-hero-title", { autoAlpha: 1 });

  SplitText.create(".about-hero-title", {
    type: "lines, words",
    mask: "lines",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.words, {
        y: "110%",
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.04,
        delay: 0.15,
      });
    },
  });

  // ── 2. Kicker fade-in ───────────────────────────────────────────
  gsap.set(".about-kicker", { y: 20 });
  gsap.to(".about-kicker", {
    autoAlpha: 1,
    y: 0,
    duration: 0.7,
    ease: "power3.out",
    delay: 0.1,
  });

  // ── 3. Image: fade in + rise from bottom ────────────────────────
  gsap.fromTo(
    ".about-image",
    { y: 80, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 1.2, ease: "power3.out" },
    "+=0.3",
  );
};
