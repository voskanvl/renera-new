function videoSection(videoSelector: string, triggerSelector: string) {
    const videoElement = document.querySelector<HTMLVideoElement>(videoSelector);
    const trigger = document.querySelector<HTMLElement>(triggerSelector);
    if (!videoElement) throw Error(`there isn't ${videoSelector}`);
    if (!trigger) throw Error(`there isn't ${triggerSelector}`);

    let plaing = false;

    trigger.addEventListener("click", () => {
        plaing
            ? (() => {
                  videoElement!.pause();
                  trigger.removeAttribute("play");
              })()
            : (() => {
                  videoElement.play();
                  trigger.setAttribute("play", "play");
              })();
    });

    videoElement.addEventListener("play", () => (plaing = true));
    videoElement.addEventListener("pause", () => (plaing = false));
}

export default function video1() {
    videoSection(".tizer__right > video", ".tizer__video");
    videoSection("#video2", ".whatdoesitdo");
    videoSection("#video3", ".whatdoesitdo__video");

    const tizerVideo = document.querySelector<HTMLElement>(".tizer__video");
    const tizer = document.querySelector<HTMLElement>(".tizer");
    if (!tizerVideo) throw Error(`there isn't ${".tizer__video"}`);
    if (!tizer) throw Error(`there isn't ${".tizer"}`);

    tizerVideo.addEventListener("click", () => {
        const isPlay = tizer.getAttribute("play");
        isPlay ? tizer.removeAttribute("play") : tizer.setAttribute("play", "play");
    });

    const videoElement2 = document.querySelector<HTMLVideoElement>("#video2");
    const observer = new IntersectionObserver(
        ([{ isIntersecting }]) => {
            isIntersecting
                ? setTimeout(() => videoElement2!.play(), 0)
                : setTimeout(() => videoElement2!.pause(), 0);
        },
        {
            threshold: [0.2],
        },
    );
    const containerVideo2 = document.querySelector<HTMLElement>(".whatdoesitdo");
    if (!containerVideo2) throw Error("there isn't #video2");
    observer.observe(containerVideo2);
}
