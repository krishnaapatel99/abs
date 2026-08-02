export default function WhySection() {
  const cards = [
    {
      title: "Create more immersive experiences",
       body: "Unlock the full potential of your live event. Seamless broadcasting pulls your audience into the flow of the moment, making the technical infrastructure feel so invisible they forget they aren't in the room."
    },
    {
      title: "One standard, every setup",
      body: "Concerts, sports, or corporate town halls — ABS gives every event the same bulletproof reliability. Dial in exactly what you need, and the quality stays consistent across every lens, switcher, and screen. Magic!"
    },
    {
      title: "Make your execution flawless",
      body: "Those glitches and delays in live feeds come from fragmented teams and mismatched gear.ABS was built to keep hardware and crew perfectly in sync — so everything moves together,frame for frame."
    },
    
  ];

  return (
    <section className="relative w-full">
      <div className="mx-auto max-w-[1500px] px-20 grid grid-cols-[520px_1fr]">

        {/* LEFT */}
        <div className="ml-[190px]">
          <div className="sticky top-0 h-screen flex items-center">

            <div className="flex gap-8">

              <div className="w-[4px] h-[350px] bg-[#ff98a2] mt-26" />

              <div className="leading-[0.93] mt-32">
                <h2 className="font-anton text-white text-[102px] uppercase">
                  WHY
                </h2>

                <h2 className="font-anton text-white text-[102px] uppercase">
                  ABS
                </h2>

                <h2 className="font-anton text-white text-[102px] uppercase">
                  MEDIA?
                </h2>

              </div>

            </div>

          </div>
        </div>

        {/* RIGHT */}
        <div className="w-[500px] ml-40 mt-70">

          {cards.map((card, i) => (
            <div
              key={i}
              className="h-screen flex items-center"
            >
              <div className="max-w-[600px]">

                <h3 className="font-panchang-semibold text-[#ff98a2] text-[30px] uppercase mb-8">
                  {card.title}
                </h3>

                <p className="text-white text-[19px] leading-relaxed">
                  {card.body}
                </p>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}