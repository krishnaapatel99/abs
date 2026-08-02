"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BoldTransition() {
  const containerRef = useRef(null);
  const topTextRef = useRef(null);
  const centerTextRef = useRef(null);
  const bottomTextRef = useRef(null);
const leftRef = useRef(null);
const bottomRef = useRef(null);
const tRef = useRef(null);
const rightRef = useRef(null);
const whiteRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(centerTextRef.current, { scale: 0 });
      gsap.set(topTextRef.current, { y: 0 });
      gsap.set(bottomTextRef.current, { y: 0 });
gsap.set(tRef.current, {
  transformOrigin: "center center"
});
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // controls how much scroll distance the whole animation takes
          scrub: 1,
          pin: true,
    
        },
      });

      tl.to(
        topTextRef.current,
        {
          y: "-40vh", // moves it up and out of the screen
          ease: "none",
        },
        0
      )
        .to(
          bottomTextRef.current,
          {
            y: "40vh", // moves it down and out of the screen
            ease: "none",
          },
          0
        )
        .to(
          centerTextRef.current,
          {
            scale: 2,
            ease: "none",
          },
          0.08
        )
       .to(leftRef.current, {
    x: -800,
    scale: 4,
    ease: "none",
  })

  .to(rightRef.current, {
    x: 800,
    scale: 4,
    ease: "none",
  }, "<")
   .to(bottomRef.current, {
    y: 500,
    scale: 4,
    ease: "none",
  }, "<")

  .to(tRef.current, {
    scale: 4,
    ease: "none",
  }, "<")
.set(whiteRef.current, { opacity: 1 })
.to(whiteRef.current, {
  width: "1980px",
  height: "1000px",
  duration: 1,
  ease: "none",
})
.to(tRef.current, {
    scale: 6,
    ease: "none",
    duration:1,
  }, "<")
        
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen relative flex justify-center items-center overflow-hidden mt-120"
    >
      <div
        ref={topTextRef}
        className="absolute top-0 left-0 flex flex-col font-anton text-[143px] leading-none m-4"     >
        <div className="text-white">SO WE BUILT</div>
        <div className="text-[#FF98A2]">LIVE BROADCASTING</div>
      </div>

     <div
  ref={centerTextRef}
  className="flex flex-col leading-none items-center"
>
  <div className="flex items-center text-white text-[143px] font-panchang-semibold leading-none">

    <div ref={leftRef} className="flex">
      <span>E</span>
      <span>N</span>
    </div>

    <div
      ref={tRef}
      style={{
        clipPath:
          "polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 0% 100%)",
      }}
    >
      T
    </div>

    <div ref={rightRef} className="flex">
      <span>E</span>
      <span>R</span>
    </div>

  </div>

  <div ref={bottomRef} className="text-white text-[123px] font-panchang-semibold leading-none">
    ABS MEDIA
  </div>
</div>

      <div
        ref={bottomTextRef}
        className="absolute bottom-0 right-0 text-white text-[143px] font-anton leading-none m-4"
      >
        AS IT SHOULD BE
      </div>
      <div ref={whiteRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white h-[610px] w-[230px] ml-3 opacity-0   "></div>
    </div>
  );
}