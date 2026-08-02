import React from "react";

export default function BackgroundScene() {
    return (
        <div>
             <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* wider, softer pink wash */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#000_0%,#000_72%,#090203_88%,#120506_100%)]" />
<div
  className="
    absolute
    bottom-0
    left-1/2
    -translate-x-1/2
    w-[240vw]
    h-[5vh]
    blur-[250px]
    bg-[radial-gradient(circle,
      rgba(170,120,130,.05)_0%,
    
    )]
  "
/>
      {/* very wide bottom pink layer */}
 

{/* Middle Glow */}
<div className="absolute left-1/2 bottom-[-10vh] h-[50vh] w-[280vw] -translate-x-1/2  blur-[200px]
bg-[radial-gradient(circle,rgba(150,90,98,0.28)_0%,transparent_75%)]" />

{/* Core Glow */}
<div className="absolute left-1/2 bottom-[-1vh] h-[14vh] w-[280vw] -translate-x-1/2  blur-[100px] 
bg-[radial-gradient(circle,rgba(170,110,118,0.34),transparent_75%)]" />
      {/* static stars */}
      <div className="stars absolute inset-0 opacity-90" />
<div
        className="pointer-events-none absolute inset-0 opacity-[0.65] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {/* gentle dark vignette */}
      <div
  className="
    pointer-events-none
    absolute
    left-1/2
    bottom-[-8vh]
    -translate-x-1/2
    w-[320vw]
    h-[26vh]
    blur-[250px]
   bg-[radial-gradient(circle,
rgba(150,90,98,.28)_0%,
transparent_75%
)]
  "
/>
    </div>
        </div>
    );
}