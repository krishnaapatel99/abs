import { useLayoutEffect, useRef }from "react";
 import { gsap } from "gsap"; 
 import { ScrollTrigger } from "gsap/ScrollTrigger"; 
 gsap.registerPlugin(ScrollTrigger); 
 export default function Credibility() { 
    const sectionRef = useRef(null); 
    const titleRef = useRef(null);
     const lineRef = useRef(null); 
     const rightRef = useRef(null); 
     const cards = [ { body: "What began as an internal effort to sync top-tier broadcast gear with elite crew is now the default turnkey solution across the industry — even powering the networks you watch daily. The flawless execution wasn't an accident. So we scaled the whole thing." } ]; 
     useLayoutEffect(() => { 
        const ctx = gsap.context(() => { 
            gsap.to(titleRef.current, 
                { y: -80,
                     ease: "none", scrollTrigger: 
                    { trigger: sectionRef.current,
                         start: "top bottom",
                          end: "bottom top",
                           scrub: true, },
                         });
            gsap.to(lineRef.current, 
                { y: -280, 
                    ease: "none",
                 scrollTrigger: 
                 { trigger: sectionRef.current, 
                    start: "top bottom", 
                    end: "bottom top", 
                    scrub: true, }, 
                }); 
                gsap.to(rightRef.current, 
                    { y: -750,
                         ease: "none",
                    scrollTrigger: 
                    { trigger: sectionRef.current, 
                        start: "top bottom", 
                        end: "bottom top", 
                        scrub: true, }, 
                    }); 
                    }, sectionRef); 
                    return () => ctx.revert(); 
                }, []); 
                return ( 
                <section ref={sectionRef} className="relative w-full"> 
                <div className="mx-auto max-w-[1500px] px-20 grid grid-cols-[520px_1fr]"> {/* LEFT */}
                 <div className="ml-[190px] w-[500px]"> 
                    <div className="  flex items-center">
                     <div className="flex gap-10"> 
                     <div ref={lineRef} className="w-[4px] h-[350px] bg-[#ff98a2] mt-43" /> 
                     <div ref={titleRef} className="leading-[0.93] mt-50">
                         <h2 className="font-anton text-white text-[102px] uppercase"> ABS RUNS </h2> 
                         <h2 className="font-anton text-white text-[102px] uppercase"> THE SHOW </h2>
                          </div>
                           </div> 
                           </div> 
                           </div> {/* RIGHT */}
                      <div  className="w-[480px] ml-40 mt-170">
                         {cards.map((card, i) => ( 
                            <div key={i} className=" flex items-center" >
                                 <div ref={rightRef} className="max-w-[600px]">
                                     <p className="text-white text-[19px] leading-relaxed"> {card.body}
                                         </p> 
                                         </div> 
                                         </div> ))} 
                                         </div> 
                                         </div> 
                                         </section>
                                          ) }