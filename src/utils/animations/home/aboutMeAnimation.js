import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const animateAboutMe = () => {
  const highlights = document.querySelectorAll("#highlights article");
  const titleWrapper = document.querySelector(".title-wrapper");
  let splitTitle = new SplitText(titleWrapper, { type: "chars" });
  const contentAboutMe = document.querySelector("#content-about-me");

  gsap.set(titleWrapper, { autoAlpha: 0 });
  gsap.set(highlights, { autoAlpha: 0, y: 50 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: contentAboutMe,
      start: "top 80%",
      markers: false,
      toggleActions: "play none none none",
    },
  });

  tl.to(titleWrapper, {
    autoAlpha: 1,
    duration: 1,
    ease: "power3.out",
  });

  tl.from(splitTitle.chars, {
    autoAlpha: 0,
    y: 20,
    duration: 1,
    ease: "back.out(1.7)",
    stagger: 0.08,
  });

  tl.to(
    highlights,
    {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: "back.out(1.7)",
      stagger: 0.08,
    },
    "<1",
  );
};
