import "./style.sass";
import "../assets/fonts/stylesheet.css";
import "../assets/fonts/GraphikLCG/stylesheet.css";
import "@splidejs/splide/css";
import { OptionSlide, SlideClass } from "./classSlides";
import YouTubePlayer from "youtube-player";

const player1 = YouTubePlayer("video1");
player1.loadVideoById("we5lA3JH3vA");
const tizerVideo = document.querySelector<HTMLElement>(".tizer__video");
!!tizerVideo &&
    tizerVideo.addEventListener("click", () => {
        const isStarted = tizerVideo.getAttribute("start");
        if (isStarted) {
            player1.pauseVideo();
            tizerVideo.removeAttribute("start");
        } else {
            player1.playVideo();
            tizerVideo.setAttribute("start", "start");
        }
    });

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
