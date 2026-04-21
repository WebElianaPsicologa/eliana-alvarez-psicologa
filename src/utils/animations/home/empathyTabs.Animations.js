import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const empathyTabsAnimations = () => {
  const tabItems = gsap.utils.toArray(".tab-item");
  const tabContents = gsap.utils.toArray(".tab-content");
  const empathySection = document.querySelector(".empathy-tabs-section");
  const empathyHeader = document.querySelector("#empathy-header");
  const empathiLeft = document.querySelector("#empathy-left");
  const empathiRight = document.querySelector("#empathy-right");

  // Set initial state
  gsap.set([empathyHeader, empathiLeft, empathiRight], { opacity: 1 });
  gsap.set(tabContents.slice(1), { opacity: 0 });
  gsap.set(tabContents[0], { opacity: 1 });

  let currentActiveIndex = 0;

  let mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    tabItems.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        if (index !== currentActiveIndex) {
          // Fade out current content
          gsap.to(tabContents[currentActiveIndex], {
            opacity: 0,
            duration: 0.3,
          });

          // Fade in new content
          gsap.fromTo(
            tabContents[index],
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              delay: 0.15,
            },
          );

          // Update active states
          tabItems[currentActiveIndex].classList.remove(
            "active",
            "sm:bg-soft-bg",
            "sm:border-purple-accent",
          );
          tabItems[currentActiveIndex].classList.add(
            "hover:bg-olive/10",
            "sm:border-transparent",
          );

          tab.classList.add(
            "active",
            "sm:bg-soft-bg",
            "sm:border-purple-accent",
          );
          tab.classList.remove("hover:bg-olive/10", "sm:border-transparent");

          tabContents[currentActiveIndex].classList.remove("active");
          tabContents[index].classList.add("active");

          currentActiveIndex = index;
        }
      });
    });
  });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: empathySection,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        markers: false,
      },
    })

    .from(empathyHeader, {
      y: 50,
      duration: 1,
      ease: "power4.out",
      opacity: 0,
    })
    .from(
      empathiLeft,
      {
        x: -50,
        duration: 1,
        ease: "power4.out",
        opacity: 0,
      },
      "<+0.5",
    )
    .from(
      empathiRight,
      {
        x: 50,
        duration: 1,
        ease: "power4.out",
        opacity: 0,
      },
      "<+0.5",
    );
};
