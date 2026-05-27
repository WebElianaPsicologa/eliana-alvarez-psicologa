import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export const heroIntegralAnimations = () => {
  const kicker = document.querySelector(".hero-integral-kicker");
  const title = document.querySelector(".hero-integral-title");
  const tags = document.querySelector(".hero-integral-tags");
  const subtitle = document.querySelector(".hero-integral-subtitle");
  const ctas = document.querySelector(".hero-integral-ctas");
  const microcopy = document.querySelector(".hero-integral-microcopy");
  const image = document.querySelector(".hero-integral-image");
  const badge = document.querySelector(".hero-integral-badge");

  // Make title visible before splitting so SplitText can measure it
  gsap.set(title, { visibility: "visible" });

  const split = SplitText.create(title, { type: "words" });

  // Set initial states
  gsap.set(split.words, { yPercent: 110, autoAlpha: 0 });
  gsap.set([kicker, tags, subtitle, ctas, microcopy, image, badge], {
    autoAlpha: 0,
  });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Kicker slides in from left
  tl.to(kicker, { autoAlpha: 1, x: 0, duration: 0.6 }, 0.1)

    // Title words rise up
    .to(
      split.words,
      { yPercent: 0, autoAlpha: 1, duration: 0.75, stagger: 0.08, ease: "power4.out" },
      0.3,
    )

    // Tags pill fades up
    .to(tags, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.3")

    // Subtitle fades up
    .to(subtitle, { autoAlpha: 1, y: 0, duration: 0.55 }, "-=0.25")

    // CTA buttons fade up
    .to(ctas, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.2")

    // Microcopy fades in
    .to(microcopy, { autoAlpha: 1, duration: 0.4 }, "-=0.15")

    // Image fades in from slight right offset
    .to(
      image,
      { autoAlpha: 1, x: 0, duration: 0.9, ease: "power2.out" },
      0.35,
    )

    // Badge pops in last
    .to(
      badge,
      { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(1.8)" },
      "-=0.4",
    );

  // Pause video when section leaves viewport, restart when it comes back
  const section = document.querySelector(".hero-integral");
  if (image && section) {
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onLeave: () => image.pause(),
      onLeaveBack: () => image.pause(),
      onEnterBack: () => {
        image.currentTime = 0;
        image.play();
      },
    });
  }
};
