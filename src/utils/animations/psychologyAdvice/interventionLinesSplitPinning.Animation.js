import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const demolicionesServicesAnimationAll = () => {
  const content = gsap.utils.toArray(
    ".desktopContentSection:not(:first-child)",
  );
  const photos = gsap.utils.toArray(".desktopPhoto:not(:first-child)");
  const allVideos = gsap.utils.toArray(".desktopPhoto");

  // Helper: pause all videos, then play only the active one
  const switchVideo = (activeIndex) => {
    allVideos.forEach((vid, i) => {
      if (i === activeIndex) {
        const playPromise = vid.play?.();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Video autoplay prevented:", error);
          });
        }
      } else {
        vid.pause?.();
        vid.currentTime = 0;
      }
    });
  };

  gsap.set(photos, { yPercent: 100 });

  // First video plays on load
  switchVideo(0);

  let mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    let currentActiveIndex = 0;

    // Pause everything when gallery is out of view
    ScrollTrigger.create({
      trigger: ".gallery",
      start: "top bottom",
      end: "bottom top",
      onEnter: () => switchVideo(currentActiveIndex),
      onLeave: () => allVideos.forEach((vid) => vid.pause?.()),
      onEnterBack: () => switchVideo(currentActiveIndex),
      onLeaveBack: () => allVideos.forEach((vid) => vid.pause?.()),
    });

    // Pin the right column while scrolling through left content
    ScrollTrigger.create({
      trigger: ".gallery",
      start: "top top",
      end: "bottom bottom",
      pin: ".right",
      markers: false,
    });

    // Animate each video reveal as corresponding text enters viewport
    content.forEach((item, index) => {
      const headLine = item.querySelector("h1");

      ScrollTrigger.create({
        trigger: headLine,
        start: "top 80%",
        end: "bottom 50%",
        animation: gsap.to(photos[index], { yPercent: 0 }),
        scrub: true,
        markers: false,
        onEnter: () => {
          currentActiveIndex = index + 1;
          switchVideo(currentActiveIndex);
        },
        onLeaveBack: () => {
          currentActiveIndex = index;
          switchVideo(currentActiveIndex);
        },
      });
    });

    return () => {
      allVideos.forEach((vid) => vid.pause?.());
    };
  });
};
