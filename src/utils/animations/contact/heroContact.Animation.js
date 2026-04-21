import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export const animateHeroContact = () => {
  const title = document.querySelector(".hero-contact-title");

  gsap.set(title, { autoAlpha: 1 });

  SplitText.create(title, {
    type: "chars, words",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.chars, {
        duration: 2,
        autoAlpha: 0,
        stagger: { from: "random", each: 0.01 },
      });
    },
  });
};
