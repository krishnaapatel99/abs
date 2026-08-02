// src/lib/useLenis.js
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenisInstance } from "./lenisStore";

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,           // scroll "smoothness" — higher = floatier
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.7,
    });

    // Make this instance available to other components (e.g. StarField)
    setLenisInstance(lenis);

    // Drive Lenis from GSAP's ticker instead of its own rAF loop
    // this keeps Lenis and ScrollTrigger perfectly in sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // tell ScrollTrigger to recalc on lenis scroll
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.lagSmoothing(0);

    return () => {
      setLenisInstance(null);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);
}