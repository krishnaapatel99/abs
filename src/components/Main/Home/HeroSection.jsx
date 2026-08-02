import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
export default function HeroSection() {
    const lineRef = useRef(null);
 useLayoutEffect(() => {
  gsap.set(lineRef.current, {
    height: 0,
    transformOrigin: "top center",
  });

  gsap.timeline({ repeat: -1 })
    .to(lineRef.current, {
      height: 80,
      duration: 0.8,
      ease: "power2.out",
    })
    .to(lineRef.current, {
      height: 0,
      duration: 0.8,
      ease: "power2.in",
    });
}, []);
  return (
    <div className="w-full overflow-hidden flex flex-col  justify-between h-screen">
     <div className="flex flex-col"> <h1 className="text-[500px] text-[#ff98a2] font-akira tracking-[15px] leading-none text-center -mt-8 ">
        ABS
      </h1>
      <p className="text-[37px] text-white flex justify-end mr-11 font-panchang-semibold -mt-20 tracking-wider">FLAWLESS LIVE PRODUCTION</p>
      </div>
        <div className="flex justify-between mx-9  h-[100px]">
  <div>
  <div className="flex items-stretch gap-3 ">
    {/* Pink vertical line */}
    <div   ref={lineRef} className="w-[2px] bg-[#ff98a2] rounded-full h-[80px]"></div>
    <div className="text-[26px] font-anton flex text-white flex-col leading-[1.01]">
        <span>SCROLL</span>
        <span className="tracking-wide">TO EXPLORE</span>
    </div>
  </div>
  </div>
  <button className="group flex items-center gap-0 bg-[#ff98a2] rounded-xl w-[350px] h-[50px] overflow-hidden border border-white/20 hover:scale-105 transition-transform duration-300 cursor-pointer mr-2 ">
    {/* Arrow icon box */}
    <span className="flex items-center justify-center round-xl bg-[#1a1a1a] w-12 h-12 shrink-0">
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </span>
    {/* Label */}
    <span className="px-6 py-3  text-black font-extrabold tracking-widest  text-[13px] uppercase">
      SHOWCASE
    </span>
  </button>
        </div>
    </div>
  );
}
