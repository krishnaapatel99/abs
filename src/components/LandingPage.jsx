import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import projectsData from "../utils/projects";

import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9,0,0.1,1");

const gridImages = [
    "/landingpage/img1.jpg",
    "/landingpage/img2.jpg",
    "/landingpage/img3.jpg",
    "/landingpage/img4.jpg",
    "/landingpage/img5.jpg",
    "/landingpage/img6.jpg",
    "/landingpage/img7.jpg",
    "/landingpage/img8.jpg",
    "/landingpage/img9.jpg",
];

const allImageSources = Array.from(
    { length: 15 },
    (_, i) => `/landingpage/img${i + 1}.jpg`
);

function fisherYatesShuffle(arr) {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function getRandomImageSet() {
    return fisherYatesShuffle(allImageSources).slice(0, 9);
}

export default function LandingPage({ setShowModel }) {
    const overlayRef = useRef(null);
    const loaderRef = useRef(null);
    const logoLineRef = useRef(null);
    const logoTextRef = useRef(null);
    const sparkleRef = useRef(null);

    const projectsHeaderRef = useRef(null);
    const locationsHeaderRef = useRef(null);

    const projectItemRefs = useRef([]);
    const locationItemRefs = useRef([]);

    const imgRefs = useRef([]);

    const overlayTimelineRef = useRef(null);
    const imageTimelineRef = useRef(null);
    const delayedCallsRef = useRef([]);
    const isMountedRef = useRef(true);


    const preloadAndDecodeImages = () => {
        allImageSources.forEach((src) => {
            const img = new Image();
            img.src = src;
            if (img.decode) {
                img.decode().catch(() => {});
            }
        });
    };

    const startImageRotation = () => {
        const totalCycles = 70;
        for (let cycle = 0; cycle < totalCycles; cycle++) {
            const call = gsap.delayedCall(cycle * 0.10, () => {
                if (!isMountedRef.current) return;
                const nextSet = getRandomImageSet();
                imgRefs.current.forEach((wrapperEl, i) => {
                    if (!wrapperEl) return;
                    const imgEl = wrapperEl.querySelector("img");
                    if (imgEl && imgEl.src !== nextSet[i]) {
                        imgEl.src = nextSet[i];
                    }
                });
            });
            delayedCallsRef.current.push(call);
        }
    };

  
    useLayoutEffect(() => {
        isMountedRef.current = true;

        preloadAndDecodeImages();

        const imgEls = imgRefs.current.filter(Boolean);

        const createAnimationTimeline = () => {
            const overlayTimeline = gsap.timeline();
            const imageTimeline = gsap.timeline();
            overlayTimelineRef.current = overlayTimeline;
            imageTimelineRef.current = imageTimeline;

            // Set sparkle's and logo text's starting states
            gsap.set(sparkleRef.current, { opacity: 0, scale: 0, rotate: -180 });
            gsap.set(logoTextRef.current, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" });

            overlayTimeline.to(logoLineRef.current, {
                backgroundPosition: "0% 0%",
                color: "#fff",
                duration: 1,
                ease: "none",
                delay: 0.5,
            });

            // Sparkle pops in partway through the text wipe, landing as it finishes
            overlayTimeline.to(
                sparkleRef.current,
                {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    duration: 0.6,
                    ease: "hop",
                },
                "<0.4"
            );
overlayTimeline.set(logoLineRef.current, {
  backgroundImage: "none",
  backgroundClip: "border-box",
  WebkitBackgroundClip: "border-box",
  color: "#fff",
});
            // Text wipes out from bottom to top
            overlayTimeline.to(logoTextRef.current, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 0.7,
                ease: "hop",
                delay: 0.3
            });

            // Sparkle spins & shrinks out synchronously with text wipe
            overlayTimeline.to(
                sparkleRef.current,
                {
                    opacity: 0,
                    scale: 0,
                    rotate: 180,
                    duration: 0.6,
                    ease: "hop",
                },
                "<"
            );

            overlayTimeline.to(
                [projectsHeaderRef.current, ...projectItemRefs.current],
                {
                    opacity: 1,
                    duration: 0.10,
                    stagger: 0.075,
                    delay: 0.5,
                }
            );
            overlayTimeline.to(
                [locationsHeaderRef.current, ...locationItemRefs.current],
                {
                    opacity: 1,
                    duration: 0.10,
                    stagger: 0.075,
                },
                "<"
            );
            overlayTimeline.to(
                [projectsHeaderRef.current, ...projectItemRefs.current],
                {
                    color: "#fff",
                    duration: 0.10,
                    stagger: 0.075,
                    delay: 0.5,
                }
            );
            overlayTimeline.to(
                [locationsHeaderRef.current, ...locationItemRefs.current],
                {
                    color: "#fff",
                    duration: 0.10,
                    stagger: 0.075,
                },
                "<"
            );
            overlayTimeline.to(
                [projectsHeaderRef.current, ...projectItemRefs.current],
                {
                    opacity: 0,
                    duration: 0.10,
                    stagger: 0.075,
                    delay: 0.75,
                }
            );
            overlayTimeline.to(
                [locationsHeaderRef.current, ...locationItemRefs.current],
                {
                    opacity: 0,
                    duration: 0.10,
                    stagger: 0.075,
                },
                "<"
            );

            imageTimeline.to(imgEls, {
                clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
                duration: 1,
                stagger: 0.05,
                ease: "hop",
                delay: 2.5,
                onStart: () => {
                    setTimeout(() => {
                        if (!isMountedRef.current) return;
                        startImageRotation();
                        gsap.to(loaderRef.current, { opacity: 0, duration: 0.3 });
                    }, 1000);
                },
            });
            imageTimeline.to(imgEls, {
                clipPath: "polygon(0% 0%,100% 0%,100% 0%,0% 0%)",
                duration: 1,
                stagger: 0.05,
                ease: "hop",
                delay: 2.5,
            });

            overlayTimeline.to(overlayRef.current,{
    y:"-100%",
    duration:1,
    ease:"hop"
});

overlayTimeline.add(() => {
  setShowModel(true);
}, "<");
        };

        createAnimationTimeline();

        return () => {
            isMountedRef.current = false;
            overlayTimelineRef.current?.kill();
            imageTimelineRef.current?.kill();
            delayedCallsRef.current.forEach((call) => call.kill());
            delayedCallsRef.current = [];
        };
    }, []);

    return (
        <>
            <div
                ref={overlayRef}
                className="overlay fixed top-0 left-0 w-screen h-screen z-[20] bg-[#FF98A2] p-2 flex gap-2 overflow-hidden text-white font-akkurat"
            >
                <div className="projects flex-1 flex flex-col justify-center gap-2">
                    <div
                        ref={projectsHeaderRef}
                        className="projects-header flex [&>*]:flex-1 gap-2 opacity-0 text-[0.7rem] uppercase text-gray-400"
                    >
                        <p>Projects</p>
                        <p>Directors</p>
                    </div>
                    {projectsData.map((project, i) => (
                        <div
                            key={project.name ?? i}
                            ref={(el) => (projectItemRefs.current[i] = el)}
                            className="project-item opacity-0 flex [&>*]:flex-1 gap-2 text-[0.80rem] text-[#4f4f4f] font-akkurat "
                        >
                            <p className="font-bold pl-2">{project.name}</p>
                            <p className="font-bold">{project.director}</p>
                        </div>
                    ))}
                </div>

                <div
                    ref={loaderRef}
                    className="loader flex flex-1 flex-col justify-center gap-2 items-center"
                >
                    <h1
                        ref={logoLineRef}
                        className="logo-line relative text-center font-sans-serif text-[4.5rem] font-black leading-[0.9] text-transparent bg-clip-text bg-[linear-gradient(0deg,#3a3a3a_0%,#3a3a3a_50%,#ffffff_100%)] bg-[length:100%_200%] bg-[position:0%_100%] text-[#3a3a3a]"
                    >
                        <span ref={logoTextRef} className="inline-block">abs</span>
                        <svg
                            ref={sparkleRef}
                            className="absolute -top-1 -right-7 drop-shadow-[0_0_5px_rgba(255,255,255,0.7)] origin-center"
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="white"
                        >
                            <path d="M 12 0 Q 12 11 24 12 Q 12 13 12 24 Q 12 13 0 12 Q 12 11 12 0 Z" />
                        </svg>
                    </h1>
                </div>

                <div className="locations flex-1 flex flex-col justify-center gap-2">
                    <div
                        ref={locationsHeaderRef}
                        className="locations-header flex gap-2 opacity-0 [&>*]:flex-1 text-[0.7rem] uppercase text-gray-400"
                    >
                        <p>location</p>
                    </div>
                    {projectsData.map((project, i) => (
                        <div
                            key={project.location ?? i}
                            ref={(el) => (locationItemRefs.current[i] = el)}
                            className="location-item opacity-0 flex [&>*]:flex-1 gap-2 text-[0.80rem] text-[#4f4f4f] "
                        >
                            <p className="font-bold font-akkurat">{project.location}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="image-grid fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[30%] aspect-square flex flex-col gap-[1em] z-[25]">
                {[0, 1, 2].map((row) => (
                    <div key={row} className="grid-row w-[100%] flex gap-[1em]">
                        {gridImages.slice(row * 3, row * 3 + 3).map((src, col) => {
                            const index = row * 3 + col;
                            return (
                                <div
                                    key={index}
                                    ref={(el) => (imgRefs.current[index] = el)}
                                    className="img relative flex-1 aspect-square [clip-path:polygon(0_0,100%_0,100%_0,0_0)]"
                                >
                                    <img
                                        className="w-[100%] h-[100%] object-cover"
                                        src={src}
                                        alt=""
                                    />
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </>
    );
}