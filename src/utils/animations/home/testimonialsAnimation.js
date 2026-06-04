import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const testimonialsAnimations = () => {
  const section = document.querySelector(".testimonials-section");
  const header = document.querySelector(".testimonials-header");
  const grid = document.querySelector(".testimonials-grid");
  const cards = gsap.utils.toArray(".testimonial-card");

  if (!section || !grid || cards.length === 0) return;

  // Set perspective on grid for more natural rotation feel
  gsap.set(grid, { perspective: 1200 });

  // Header entrance animation
  gsap.from(header, {
    scrollTrigger: {
      trigger: header,
      start: "top 85%",
      once: true,
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  // Scatter configurations per breakpoint
  const scatterConfig = {
    desktop: {
      rachel: { x: 90, y: 100, rotation: -14, scale: 0.88 },
      ana: { x: -60, y: -80, rotation: 10, scale: 0.9 },
      laura: { x: -100, y: 60, rotation: -8, scale: 0.87 },
      carmen: { x: -70, y: -60, rotation: 12, scale: 0.9 },
    },
    tablet: {
      rachel: { x: 60, y: 70, rotation: -10, scale: 0.9 },
      ana: { x: -50, y: -60, rotation: 8, scale: 0.92 },
      laura: { x: 70, y: 50, rotation: -7, scale: 0.9 },
      carmen: { x: -40, y: -50, rotation: 10, scale: 0.92 },
    },
  };

  function getCurrentScatter() {
    const width = window.innerWidth;
    if (width >= 1024) return scatterConfig.desktop;
    if (width >= 768) return scatterConfig.tablet;
    return null;
  }

  // Desktop & tablet: hover-driven scatter ↔ organized on the GRID
  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    const config = getCurrentScatter();
    if (!config) return;

    // Single timeline: scattered (progress 0) → organized (progress 1)
    // fromTo with immediateRender sets the start state right away,
    // so the cards are already scattered while the grid is opacity-0.
    const tl = gsap.timeline({ paused: true });

    const toOrganized = {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      duration: 0.9,
      ease: "power3.out",
    };

    tl.fromTo(
      ".testimonial-card-rachel",
      { ...config.rachel },
      { ...toOrganized },
      0,
    );
    tl.fromTo(
      ".testimonial-card-ana",
      { ...config.ana },
      { ...toOrganized },
      0.04,
    );
    tl.fromTo(
      ".testimonial-card-laura",
      { ...config.laura },
      { ...toOrganized },
      0.08,
    );
    tl.fromTo(
      ".testimonial-card-carmen",
      { ...config.carmen },
      { ...toOrganized },
      0.12,
    );

    // Reveal grid after timeline is built (cards already in scattered state)
    gsap.to(grid, { autoAlpha: 1, duration: 0.3, ease: "power2.out" });

    let leaveTimer = null;

    const onEnter = () => {
      if (leaveTimer) {
        clearTimeout(leaveTimer);
        leaveTimer = null;
      }
      tl.timeScale(1);
      tl.play();
    };

    const onLeave = () => {
      leaveTimer = setTimeout(() => {
        leaveTimer = null;
        tl.timeScale(0.45); // slower, smoother return to scattered
        tl.reverse();
      }, 150);
    };

    grid.addEventListener("mouseenter", onEnter);
    grid.addEventListener("mouseleave", onLeave);

    return () => {
      grid.removeEventListener("mouseenter", onEnter);
      grid.removeEventListener("mouseleave", onLeave);
      if (leaveTimer) clearTimeout(leaveTimer);
      tl.kill();
    };
  });

  // Mobile: simple staggered fade-up, no scatter (touch devices)
  mm.add("(max-width: 767px)", () => {
    // Ensure cards are in organized state on mobile
    gsap.set(cards, { x: 0, y: 0, rotation: 0, scale: 1 });

    // Reveal grid (invisible class for desktop scatter effect)
    gsap.to(grid, { autoAlpha: 1, duration: 0.3, ease: "power2.out" });

    gsap.from(cards, {
      scrollTrigger: {
        trigger: grid,
        start: "top 80%",
        once: true,
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
    });
  });
};
