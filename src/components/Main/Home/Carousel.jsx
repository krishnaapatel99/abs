import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Carousel() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".showcase-card");

      const totalX = -(cards.length - 1) * 660; // full horizontal travel
      const preFraction = 0.15;                  // 30% of travel happens BEFORE pin
      const preX = totalX * preFraction;

      // --- Phase 1: unpinned pre-scroll ---
      // Starts as soon as the section begins entering the viewport,
      // ends when the section's CENTER hits the CENTER of the viewport.
      gsap.fromTo(
        trackRef.current,
        { x: 0 },
        {
          x: preX,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        }
      );

      // --- Phase 2: pinned scroll ---
      // Picks up exactly where phase 1 left off, at the section's center.
      gsap.fromTo(
        trackRef.current,
        { x: preX },
        {
          x: totalX,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "center center",
            end: () => "+=" + cards.length * window.innerWidth * (1 - preFraction),
            pin: true,
            scrub: true,
            anticipatePin: 0,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative  overflow-hidden">
      <div ref={trackRef} className="flex gap-40 h-full items-center px-40 ml-150"    style={{ willChange: "transform", backfaceVisibility: "hidden" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="showcase-card shrink-0 w-[500px]">
            
            <div className="h-[380px] rounded-3xl bg-neutral-800"></div>
            <h2 className="text-white text-[19px] mt-6">Project {i + 1}</h2>
            <p className="text-neutral-400 text-[17px]">Category</p>
          </div>
        ))}
        <div className="text-[#efefef] w-[50px] text-[17px] ">want to see more?</div>
      </div>
    </section>
  );
}