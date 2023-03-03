import "./style.sass";
import "../assets/fonts/stylesheet.css";
import "../assets/fonts/GraphikLCG/stylesheet.css";
// import { scrollScreens } from "./scrollScreens";
// import create from "zustand/vanilla";
import "@splidejs/splide/css";
import { OptionSlide, SlideClass } from "./classSlides";
// import cssHasPseudo from "css-has-pseudo";
// const cssHasPseudo = require("css-has-pseudo/dist/browser");

// export interface StoreState {
//     activeScreenNumber: number;
//     activeScreenElement: HTMLElement | null;
//     inc: () => void;
//     dec: () => void;
//     setActive: (x: number) => void;
// }

// const changeState = (x: number) => (state: StoreState) => ({
//     ...state,
//     activeScreenNumber: state.activeScreenNumber + x,
// });

// const store = create<StoreState>(set => ({
//     activeScreenNumber: 0,
//     activeScreenElement: null,
//     inc: () => set(changeState(1)),
//     dec: () => {
//         changeState(-1);
//     },
//     setActive: x => {
//         changeState(x);
//     },
// }));

// cssHasPseudo(document);
// scrollScreens(store);
const accept: OptionSlide = {
    elementName: "#accept",
    elementElement: document.querySelector<HTMLElement>("#accept")!,
    options: {
        type: "loop",
        arrows: false,
        perPage: 1,
        pagination: false,
    },
    controls: {
        left: document.querySelector<HTMLElement>(".accept__control--left")!,
        right: document.querySelector<HTMLElement>(".accept__control--right")!,
    },
};

const slider = new SlideClass({
    accept,
});

const currentIndicator = document.querySelector<HTMLElement>(".accept__indicator--current");
const totalIndicator = document.querySelector<HTMLElement>(".accept__indicator--total");
const lineIndicator = document.querySelector<HTMLElement>(".accept__indicator-line--front");

const { length } = slider.splidesInstance!.instances["#accept"];
!!currentIndicator && (currentIndicator.innerText = 1 + "");
!!totalIndicator && (totalIndicator.innerText = length + "");

!!lineIndicator && (lineIndicator.style.width = (1 / length) * 100 + "%");

slider.splidesInstance!.instances["#accept"].on("active", obj => {
    if (obj.isClone) return;

    !!currentIndicator && (currentIndicator.innerText = obj.index + 1 + "");
    !!totalIndicator && (totalIndicator.innerText = length + "");
    !!lineIndicator && (lineIndicator.style.width = ((obj.index + 1) / length) * 100 + "%");
});
