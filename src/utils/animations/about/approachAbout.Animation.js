import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const approachAboutAnimations = () => {
  const approachTitle = document.querySelector(".approach-title");
  const approachLines = approachTitle.querySelectorAll(".approach-line");

  gsap.set(approachTitle, { autoAlpha: 1 });

  SplitText.create(approachLines, {
    type: "words",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.words, {
        y: -100,
        opacity: 0,
        rotation: "random(-80, 80)",
        duration: 0.7,
        ease: "back",
        stagger: 0.15,
        scrollTrigger: {
          trigger: approachTitle,
          start: "top 80%",
        },
      });
    },
  });
};
