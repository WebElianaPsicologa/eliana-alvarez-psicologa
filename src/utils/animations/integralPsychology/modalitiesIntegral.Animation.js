import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

export const modalitiesAnimation = () => {
  let modalities = gsap.utils.toArray(".modality");
  let active = modalities[0];

  modalities.forEach((el) => {
    el.addEventListener("click", () => changeGrid(el));
  });

  function changeGrid(el) {
    if (el === active) return;

    let state = Flip.getState(modalities);
    active.dataset.grid = el.dataset.grid;
    el.dataset.grid = "c-1";
    active = el;

    Flip.from(state, {
      duration: 0.3,
      absolute: true,
      ease: "power1.inOut",
    });
  }
};
