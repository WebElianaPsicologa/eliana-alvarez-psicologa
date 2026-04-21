import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function servicesAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const servicesWrapper = document.getElementById("services-wrapper");
  const service1 = document.querySelector("#services-1");
  const service2 = document.querySelector("#services-2");

  // Set initial state: invisible and shifted down

  let mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    gsap.set([service1, service2], { opacity: 0, y: 50 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: servicesWrapper,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          markers: false,
        },
      })
      .to(service1, { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" })
      .to(
        service2,
        { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" },
        "-=0.2",
      );
  });
}
