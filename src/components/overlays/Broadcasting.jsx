import { Play } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9,0,0.1,1");

export default function Broadcasting({ landingComplete }){
  const textRef = useRef(null);
  const text2Ref = useRef(null);
  const containerRef = useRef(null);
  useLayoutEffect(() => {
    if (textRef.current && text2Ref.current && landingComplete) {
     gsap.to(
  textRef.current.querySelectorAll("span"),
  {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.inOut",
  }
);
      gsap.to(
  text2Ref.current.querySelectorAll("span"),
  {
   opacity: 1,
    y: 0,
    duration: 1,
    stagger:0.1,
    ease: "power2.inOut",
  }
);

      // Translate container up after text animation
      gsap.to(containerRef.current, {
        y: "-100%",
        duration: 0.8,
        ease: "hop",
        delay: 1.5
      });
    }
  }, [landingComplete]);
  return (
        <div ref={containerRef} className="absolute flex justify-center items-center w-full h-screen bg-[#FF98A2] z-10">
            
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
<img src="/watermarks/filmreel1.png" className=" absolute w-[700px] opacity-5 -top-[1%] -left-[14%] -rotate-12  select-none " />
<img src="/watermarks/clapperboard.png" className=" absolute w-[400px] opacity-5 top-[27%] left-[66%] rotate-18  select-none " />

</div>

<div  className="relative z-10 flex items-center tracking-[10px] font-akira "><div ref={textRef}className="flex "><span className="text-9xl opacity-0 translate-y-20">B</span>
            <span className="text-9xl opacity-0 translate-y-20">R</span>
            <span className=" w-29 h-29 object-cover opacity-0 translate-y-20"><img src="/landingpage/lens.png" alt="" /></span>
        </div>

           <div ref={text2Ref} className="flex ">
            <span className="text-9xl opacity-0 translate-y-20">A</span>
            <span className="text-9xl opacity-0 translate-y-20">D</span>
            <span className="text-9xl relative opacity-0 translate-y-20">C  <Play
    className="absolute w-6 h-6 fill-black stroke-black left-[40%] top-[40%]"
  /></span>
            <span className="text-9xl opacity-0 translate-y-20">A</span>
            <span className="text-9xl opacity-0 translate-y-20">S</span>
            <span className="text-9xl opacity-0 translate-y-20">T</span></div></div>
         
        </div>
    );
}