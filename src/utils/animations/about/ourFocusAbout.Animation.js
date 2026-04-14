import { gsap } from "gsap";

export const ourFocusAboutAnimation = () => {
  // On mobile, descriptions are always visible
  gsap.set(".stage p", { opacity: 1, y: 0 });

  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    const stages = gsap.utils.toArray(".stage");

    // Batch all DOM reads first, before any writes
    const measurements = stages.map((stage) => {
      const firstSpan = stage.querySelector(".headings span:first-child");
      return firstSpan.offsetHeight;
    });

    // Now do all writes + setup
    stages.forEach((stage, i) => {
      const heading = stage.querySelector(".heading");
      const headings = stage.querySelector(".headings");
      const spanHeight = measurements[i];

      gsap.set(heading, { height: spanHeight });
      gsap.set(stage.querySelector("p"), { opacity: 0 });

      const tl = gsap
        .timeline({ defaults: { ease: "power2.inOut" }, paused: true })
        .to(headings, { y: -spanHeight })
        .fromTo(stage.querySelector("p"), { y: 10, opacity: 0 }, { y: 0, opacity: 1 }, 0);

      stage.addEventListener("mouseenter", () => tl.play());
      stage.addEventListener("mouseleave", () => tl.reverse());
    });

    // Cleanup: reset inline styles when breakpoint no longer matches
    return () => {
      stages.forEach((stage) => {
        gsap.set(stage.querySelector(".heading"), { clearProps: "height" });
        gsap.set(stage.querySelector(".headings"), { clearProps: "y" });
        gsap.set(stage.querySelector("p"), { clearProps: "opacity,y" });
      });
    };
  });
};
