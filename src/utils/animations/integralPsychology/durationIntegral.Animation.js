import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const durationIntegralAnimation = () => {
  const durationLeft = document.querySelector(".duration-left");
  const durationRight = document.querySelector(".duration-right");
  const durationTitle = document.querySelector(".duration-title");

  if (!durationTitle || !durationLeft || !durationRight) return;

  document.fonts.ready.then(() => {
    const tierCards = durationRight.querySelectorAll(".tier-card");
    const faqItems = durationRight.querySelectorAll(".faq-item");
    const paragraphs = durationLeft.querySelectorAll("p");

    gsap.set([tierCards, faqItems, paragraphs, durationTitle], {
      autoAlpha: 0,
      y: 16,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".duration-section",
        start: "top 50%",
        toggleActions: "play none none none",
        markers: false,
      },
    });

    tl.to(durationTitle, {
      autoAlpha: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    })
      .to(
        paragraphs,
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.2",
      )
      .to(
        tierCards,
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.3",
      )
      .to(
        faqItems,
        { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.2",
      );
  });
};
