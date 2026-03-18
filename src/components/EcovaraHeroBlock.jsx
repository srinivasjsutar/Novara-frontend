import { useEffect, useRef } from "react";

const heroStyle = `
  .hero-card {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  .hero-title {
    opacity: 0;
    transform: translateX(-10px);
    transition: opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s;
  }
  .hero-stat {
    opacity: 0;
    transform: translateY(10px);
  }
  .hero-card.hero-revealed { opacity: 1; transform: none; }
  .hero-title.hero-revealed { opacity: 1; transform: none; }
  .hero-stat.hero-revealed { opacity: 1; transform: none; }
  .hero-stat:nth-child(1) { transition: opacity 0.5s ease-out 0.05s, transform 0.5s ease-out 0.05s; }
  .hero-stat:nth-child(2) { transition: opacity 0.5s ease-out 0.12s, transform 0.5s ease-out 0.12s; }
  .hero-stat:nth-child(3) { transition: opacity 0.5s ease-out 0.18s, transform 0.5s ease-out 0.18s; }
`;

function Stat({ k, label }) {
  return (
    <div className="hero-stat flex flex-col items-center">
      <span className="font-brushelva text-[22px] leading-none text-white sm:text-[28px] lg:text-[36px]">
        {k}
      </span>
      <span className="mt-1 text-[10px] font-urbanist text-white/70 sm:text-[12px] lg:text-[13px]">
        {label}
      </span>
    </div>
  );
}

export default function EcovaraHeroBlock({
  bgSrc = "/images/Ecovara _11zon.webp",
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll(
      ".hero-card, .hero-title, .hero-stat"
    );
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("hero-revealed");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: heroStyle }} />
      <section ref={sectionRef} className="relative w-full">
        <div className="relative h-[240px] w-full overflow-visible sm:h-[360px] lg:h-[600px]">
          <img
            src={bgSrc}
            alt="Ecovara Entrance"
            className="h-full w-full object-cover"
            draggable="false"
            loading="eager"
            width={1920}
            height={600}
          />

          {/* Overlay Card */}
          <div className="hero-card absolute inset-x-0 top-44 z-10 flex justify-center sm:bottom-6 lg:inset-auto lg:left-10 lg:bottom-1 lg:block">
            <div className="w-[340px] h-[113px] rounded-[22px] px-2 py-3 bg-[#083b33] lg:bg-[#083b33]/80 ring-1 ring-white/15 overflow-hidden sm:w-[520px] sm:h-auto sm:px-5 sm:py-4 lg:w-[800px] lg:h-[160px] lg:rounded-[26px] lg:px-3 lg:py-2 flex flex-col lg:flex-row lg:items-center">
              {/* Left: headline */}
              <div className="lg:flex-1">
                <h3 className="hero-title font-brushelva ms-3 lg:ms-2 text-[22px] leading-tight text-white sm:text-[30px] lg:text-[44px]">
                  Estate-Style&nbsp;
                  <span className="text-[#DCA000] font-brushelva">living</span>
                </h3>
              </div>

              {/* Divider (desktop only) */}
              <div className="hidden lg:block me-8 h-[120px] w-px bg-[#FFD698]" />

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 text-center lg:mt-5 lg:flex lg:flex-1 lg:justify-between">
                <Stat k="800+" label="Existing Trees" />
                <Stat k="80%"  label="Open Space" />
                <Stat k="15"   label="Acres Project" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}