import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";


import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9,0,0.1,1");





export default function LandingPage({ setShowModel, setLandingComplete }) {
    const overlayRef = useRef(null);
    const loaderRef = useRef(null);
    const logoLineRef = useRef(null);
    const logoTextRef = useRef(null);
    const sparkleRef = useRef(null);



  
    useLayoutEffect(() => {
       
       

        const createAnimationTimeline = () => {
            const overlayTimeline = gsap.timeline();
         
            // Set sparkle's and logo text's starting states
            gsap.set(sparkleRef.current, { opacity: 0, scale: 1, rotate: -180 });
      

         overlayTimeline.to(logoTextRef.current, {
    clipPath: "inset(0 0 0% 0)",
    duration: 1.5,
    ease: "hop",
    delay: 0.5,
});

            // Sparkle pops in partway through the text wipe, landing as it finishes
            overlayTimeline.to(
                sparkleRef.current,
                {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    duration: 0.8,
                    ease: "hop",
                },
                "<0.4"
            );


            // // Text wipes out from bottom to top
            // overlayTimeline.to(logoTextRef.current, {
            //     clipPath: "inset(0 0 100% 0)",
            //     color: "#FFFFFF",
            //     duration: 0.8,
            //     ease: "hop",
            //     delay: 0.3
            // });
            
           

            // Sparkle spins & shrinks out synchronously with text wipe
            // overlayTimeline.to(
            //     sparkleRef.current,
            //     {
            //         opacity: 0,
            //         scale: 0,
            //         rotate: 180,
            //         duration: 0.6,
            //         ease: "hop",
            //     },
            //     "<"
            // );

            // Translate overlay up and set landingComplete to true
            overlayTimeline.to(overlayRef.current, {
                y: "-100%",
                duration: 0.8,
                ease: "hop",
                onComplete: () => setLandingComplete(true)
            });


        };

        createAnimationTimeline();

       
    }, []);

    return (
        <>
            <div
                ref={overlayRef}
                className="overlay fixed top-0 left-0 w-full h-screen z-[20] bg-white  flex gap-2 overflow-hidden text-white font-akkurat"
            >
               
               

                <div
                    ref={loaderRef}
                    className="loader flex flex-1 flex-col justify-center gap-2 items-center"
                >
                 <h1 className="relative text-center font-sans-serif text-[5.5rem] font-black leading-[0.9]">

  {/* Grey Text */}
  <span className="text-[#fcdee0]">
    abs
  </span>

  {/* Pink Text */}
  <span
    ref={logoTextRef}
    className="absolute inset-0 text-[#FF98A2]"
    style={{
      clipPath: "inset(0 0 100% 0)",
    }}
  >
    abs
  </span>

  <svg
    ref={sparkleRef}
    className="absolute -top-1 -right-7 drop-shadow-[0_0_5px_rgba(255,152,162)] origin-center"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="#FF98A2"
  >
    <path d="M 12 0 Q 12 11 24 12 Q 12 13 12 24 Q 12 13 0 12 Q 12 11 12 0 Z" />
  </svg>

</h1>
                </div>
 </div>
             
        </>
    );
}

/* Blue and Green Neon Modern Simple Sparkle Minimalist Creative Studio Logo 1 */


