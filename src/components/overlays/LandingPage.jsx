import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9,0,0.1,1");

export default function LandingPage({
  setShowModel,
  setLandingComplete,
}) {
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);

  const logoTextRef = useRef(null);
  const broadcastTextRef = useRef(null);

  const logoPinkRef = useRef(null);
  const broadcastPinkRef = useRef(null);

  const sparkleRef = useRef(null);

  useLayoutEffect(() => {
    const overlayTimeline = gsap.timeline();

    // -----------------------------------
    // INITIAL STATE
    // -----------------------------------

    gsap.set(sparkleRef.current, {
      opacity: 0,
      scale: 0,
      rotate: -180,
      transformOrigin: "50% 50%",
    });

    gsap.set([logoPinkRef.current, broadcastPinkRef.current], {
      clipPath: "inset(0 0 100% 0)",
    });

    gsap.set([leftPanelRef.current, rightPanelRef.current], {
      x: "0%",
      force3D: true,
    });

    // -----------------------------------
    // 1. LOGO BECOMES WHITE
    // -----------------------------------

    overlayTimeline.to(logoPinkRef.current, {
      clipPath: "inset(0 0 0% 0)",
      duration: 1.5,
      ease: "hop",
      delay: 0.3,
    });

    // -----------------------------------
    // 2. SPARKLE APPEARS + ROTATES
    // -180deg → 0deg
    // -----------------------------------

    overlayTimeline.to(
      sparkleRef.current,
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 1.5,
        ease: "hop",
        transformOrigin: "50% 50%",
      },
      "<0.3"
    );

    // -----------------------------------
    // 3. BROADCASTING BECOMES WHITE
    // -----------------------------------

    overlayTimeline.to(
      broadcastPinkRef.current,
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.2,
        ease: "hop",
      },
      "<0.2"
    );

    // -----------------------------------
    // 4. TEXT EXITS
    // IMPORTANT:
    // sparkle is NOT inside logoTextRef,
    // so it won't be clipped here.
    // -----------------------------------

    overlayTimeline.to(
      [logoTextRef.current, broadcastTextRef.current],
      {
        clipPath: "inset(100% 0 0 0)",
        duration: 1.2,
        ease: "hop",
      },
      "+=0.7"
    );

    // -----------------------------------
    // 5. SPARKLE REVERSE ROTATION
    // 0deg → -360deg
    // -----------------------------------

    overlayTimeline.to(
      sparkleRef.current,
      {
        rotate: -180,
        scale: 0,
        duration: 1,
        ease: "hop",
        transformOrigin: "50% 50%",
      },
      "<"
    );

    // -----------------------------------
    // 6. AFTER ROTATION, FADE SPARKLE
    // -----------------------------------

  
    // -----------------------------------
    // 7. SLIDE LEFT PANEL OUT
    // -----------------------------------

    overlayTimeline.to(leftPanelRef.current, {
      x: "-100%",
      duration: 0.8,
      ease: "hop",
      force3D: true,

      onStart: () => {
        // Mount model while panels are sliding
        // so it has time to load/compile.
        if (setShowModel) {
          setShowModel(true);
        }
      },
    });

    // -----------------------------------
    // 8. SLIDE RIGHT PANEL OUT
    // -----------------------------------

    overlayTimeline.to(
      rightPanelRef.current,
      {
        x: "100%",
        duration: 0.8,
        ease: "hop",
        force3D: true,

        onComplete: () => {
          if (setLandingComplete) {
            setLandingComplete(true);
          }
        },
      },
      "<"
    );

    // -----------------------------------
    // CLEANUP
    // -----------------------------------

    return () => {
      overlayTimeline.kill();
    };
  }, [setLandingComplete, setShowModel]);

  return (
    <div className="fixed inset-0 z-[50] overflow-hidden select-none pointer-events-none">

      {/* LEFT PANEL */}
      <div
        ref={leftPanelRef}
        className="absolute top-0 left-0 w-1/2 h-screen bg-[#FF98A2] overflow-hidden will-change-transform"
      />

      {/* RIGHT PANEL */}
      <div
        ref={rightPanelRef}
        className="absolute top-0 right-0 w-1/2 h-screen bg-[#FF98A2] overflow-hidden will-change-transform"
      />

      {/* CENTER CONTENT */}
      <div className="absolute inset-0 flex flex-col justify-center items-center">

        {/* -----------------------------------
            LOGO + SPARKLE
            ----------------------------------- */}

        <div className="relative">

          {/* ONLY THE TEXT IS CLIPPED */}
          <div ref={logoTextRef}>
            <h1 className="relative text-center font-sans-serif text-[5.5rem] sm:text-[7rem] md:text-[8.5rem] font-black leading-[0.9] tracking-tight">

              {/* PINK LOGO */}
              <span className="text-[#fcdee0]">
                abs
              </span>

              {/* WHITE LOGO */}
              <span
                ref={logoPinkRef}
                className="absolute inset-0 text-[#ffffff]"
              >
                abs
              </span>

            </h1>
          </div>

          {/* -----------------------------------
              SPARKLE IS OUTSIDE logoTextRef
              SO IT CANNOT BE CLIPPED
              ----------------------------------- */}

          <svg
            ref={sparkleRef}
            className="absolute -top-2 -right-7 sm:-right-9 md:-right-10 drop-shadow-[0_0_6px_rgba(255,152,162,0.8)] origin-center"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="#ffffff"
          >
            <path d="M 12 0 Q 12 11 24 12 Q 12 13 12 24 Q 12 13 0 12 Q 12 13 12 0 Z" />
          </svg>

        </div>

        {/* -----------------------------------
            BROADCASTING TEXT
            ----------------------------------- */}

        <div
          ref={broadcastTextRef}
          className="relative mt-2 md:mt-3"
        >
          <p className="relative text-center font-akira text-sm sm:text-lg md:text-2xl tracking-[10px] sm:tracking-[14px] md:tracking-[18px] uppercase">

            {/* PINK TEXT */}
            <span className="text-[#fcdee0] pl-[10px] sm:pl-[14px] md:pl-[18px]">
              broadcasting
            </span>

            {/* WHITE TEXT */}
            <span
              ref={broadcastPinkRef}
              className="absolute inset-0 text-[#ffffff] pl-[10px] sm:pl-[14px] md:pl-[18px]"
            >
              broadcasting
            </span>

          </p>
        </div>

      </div>
    </div>
  );
}