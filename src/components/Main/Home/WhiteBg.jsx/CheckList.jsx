import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
 
const items = [
  { num: "01", label: "One point of contact — Full integration" },
  { num: "02", label: "Turnkey production with our elite crew." },
  { num: "03", label: "End-to-end 4K Broadcast Equipment." },
  { num: "04", label: "Attach our gear to your existing setup." },
  { num: "05", label: "Dry hire and Wet hire flexibility." },
  { num: "06", label: "Bulletproof redundancy planning." },
  { num: "07", label: "Industry-standard (Sony, Canon, Ross)." },
];

export default function CheckList() {

     const wrapRef = useRef(null);
  const boxRefs = useRef([]);

  useEffect(() => {
    const boxes = boxRefs.current;

    const tl = gsap.timeline({
     scrollTrigger: {
    trigger: wrapRef.current,
    start: "top top",      // animation starts when heading reaches top
    end: "+=" + boxes.length * 600,
    pin: true,
    scrub: 1,
    anticipatePin: 1,
},
    });

  boxes.forEach((box, i) => {
    tl.fromTo(
        box,
        {
            x: 160,
            y: 170,
            opacity: 0,
        },
        {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "none",
        },
        i
    );
});

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

    return (
        <div className="mt-[300px] text-end  ">
       
<section
  ref={wrapRef}
  className="relative h-screen w-full overflow-hidden px-10"
>
  {/* Right Heading */}
  <div className="absolute top-8 right-8 text-right z-20">
    <p className="text-[64px] leading-none font-panchang-semibold text-black">
      ABS BRINGS
    </p>

    <p className="text-[64px] leading-none font-panchang-semibold text-[#b8b8b8]">
      THE HEAT
    </p>
  </div>

  {/* Cards */}
  {items.map((item, i) => (
    <div
      key={item.num}
      ref={(el) => (boxRefs.current[i] = el)}
      className="absolute w-[470px] h-[470px] bg-neutral-50 border border-black p-8 flex flex-col justify-between"
      style={{
        left: `${40 + i * 160}px`,
        top: `${40 + i * 34}px`,
        zIndex: i,
      }}
    >
      <div className="text-[102px] text-start leading-none font-anton  text-[#FF98A2]">
        {item.num}
      </div>

      <div className="text-[30px] text-start uppercase font-panchang-semibold leading-none max-w-[260px]">
        {item.label}
      </div>
    </div>
  ))}
</section>  

        </div>
    );
}