import "./style.sass";
import "../assets/fonts/stylesheet.css";
import "../assets/fonts/GraphikLCG/stylesheet.css";
import "@splidejs/splide/css";
import { OptionSlide, SlideClass } from "./classSlides";
import video1 from "./video1";
import career from "./career";

const careerEl = document.querySelector<HTMLElement>(".main > .career");
if (!careerEl) {
    // video();
    video1();

    const accept: OptionSlide = {
        elementName: "#accept",
        elementElement: document.querySelector<HTMLElement>("#accept")!,
        options: {
            type: "loop",
            arrows: false,
            perPage: 1,
            pagination: false,
            autoplay: true,
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

    const accordionMarks = document.querySelectorAll<HTMLElement>(".accordion__mark");
    accordionMarks.forEach(e =>
        e.addEventListener("click", () => {
            const accordion = e.closest(".accordion");
            if (!accordion) throw Error("there isn't parent .accordion");
            const inputElement = accordion.querySelector<HTMLInputElement>("input");
            if (!inputElement) throw Error("there isn't input in parent .accordion");
            inputElement.checked ? (inputElement.checked = false) : (inputElement.checked = true);
        }),
    );
}
//---career---

if (careerEl) {
    career();
}
