import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animateAboutMe = () => {
  const highlights = document.querySelectorAll("#highlights article");
  const titleName = document.querySelector("#title-name");
  const contentAboutMe = document.querySelector("#content-about-me");
};
