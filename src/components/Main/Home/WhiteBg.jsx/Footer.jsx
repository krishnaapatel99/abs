import { Heart } from "lucide-react";



export default function HeroOpenSource() {
  return (
    <section className="relative w-full h-screen overflow-hidden px-6 md:px-14 py-10 flex flex-col justify-between mt-70">
      {/* top: headline */}
      <div className="font-anton uppercase leading-[0.95] tracking-tight mt-6">
        <h1 className="text-[130px] text-neutral-950">
          ABS is
        </h1>
        <h1 className="text-[130px] text-[#ff98a2]">
          The Industry Standard
        </h1>
      </div>

      {/* right: secondary headline, right-aligned, staggered like the reference */}
      <div className="font-anton uppercase leading-[0.95] tracking-tight text-right self-end mt-6 ">
        <h2 className="text-[130px] text-neutral-950">
          setting the stage
        </h2>
        <h2 className="text-[130px] text-neutral-950 mt-1 ">
          for flawless events
        </h2>
      </div>

      {/* bottom: sponsor button + footer nav */}
      <div className="-mt-12">
        <button className="group flex items-stretch bg-white rounded-full overflow-hidden shadow-sm w-fit mb-8">
          <span className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16">
            <Heart className="w-5 h-5 text-neutral-950" strokeWidth={2} />
          </span>
          <span className="flex items-center bg-[#f5a3a1] text-neutral-950 font-bold uppercase text-sm md:text-base tracking-wide px-6 md:px-8 h-14 md:h-16">
            Become a sponsor
          </span>
        </button>

        <nav className="flex flex-wrap items-center gap-6 md:gap-10 text-xs md:text-sm font-bold uppercase tracking-wide text-neutral-950">
          <a href="#" className="hover:text-[#f5a3a1] transition-colors">
            Github
          </a>
          <a href="#" className="hover:text-[#f5a3a1] transition-colors">
            X
          </a>
          <a href="#" className="hover:text-[#f5a3a1] transition-colors">
            LinkedIn
          </a>
          <a href="#" className="hover:text-[#f5a3a1] transition-colors">
            Mail
          </a>
      
        </nav>
      </div>
    </section>
  );
}