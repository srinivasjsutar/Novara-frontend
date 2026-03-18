import { lazy, Suspense, useEffect, useRef } from "react";

const BackgroundBeams = lazy(() =>
  import("./ui/background-beams").then((m) => ({ default: m.BackgroundBeams }))
);

const storyStyle = `
  .story-reveal-right {
    opacity: 0;
    transform: translateX(18px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  .story-card {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.7s ease-out, transform 0.7s ease-out;
  }
  .story-card:nth-child(2) { transition-delay: 0.05s; }
  .story-card:nth-child(3) { transition-delay: 0.1s; }
  .story-revealed {
    opacity: 1 !important;
    transform: none !important;
  }
`;

export default function OurStorySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    // ✅ Only animate right side and cards — NOT the left text (LCP element)
    const els = sectionRef.current.querySelectorAll(
      ".story-reveal-right, .story-card"
    );
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("story-revealed");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.2 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: storyStyle }} />
      <section
        ref={sectionRef}
        className="relative min-h-[520px] md:min-h-[420px] overflow-hidden bg-[#1f6b57]"
      >
        <Suspense fallback={null}>
          <BackgroundBeams className="z-0" />
        </Suspense>
        <div className="relative z-10 mx-auto max-w-7xl px-3 py-10 lg:py-[90px]">
          <div className="grid items-center md:grid-cols-2">

            {/* ✅ Left — NO animation class, visible immediately for LCP */}
            <div>
              <h2 className="text-[28px] leading-[1.05] text-[#FFCE4C] md:text-[60px] font-brushelva">
                Our Story
              </h2>
              <p className="mt-[20px] max-w-[520px] text-[15px] font-urbanist lg:text-[18px] leading-7 text-white/85">
                At Novara Nature Estates, we craft exclusive managed farmlands
                near Bangalore North, conceived for those who value legacy,
                sustainability, and enduring land ownership. The development
                reflects a deep respect for nature, paired with precise planning
                and long-term vision. Drawing from decades of real estate
                expertise, we curate farmland communities with clear titles,
                refined infrastructure, and exceptional location advantages
                offering a balance of serenity, accessibility, and lasting
                significance.
              </p>
              <p className="mt-2 max-w-[520px] text-[15px] font-urbanist lg:text-[18px] leading-7 text-white/85">
                Our signature development, Ecovara Farmplot, exemplifies this
                philosophy. Located just 10 minutes from the historic Lepakshi
                Temple, with seamless connectivity to Bangalore International
                Airport and the Bangalore-Hyderabad National Highway, Ecovara
                presents a distinguished opportunity to own land that is both
                strategically placed and naturally elevated.
              </p>
              <div className="mt-4">
                <a
                  href="/whynovara"
                  className="text-white no-underline px-3 py-2 bg-[#d19800] border-1 rounded-full border-yellow-300 lg:mt-[20px]"
                >
                  Know More
                </a>
              </div>
            </div>

            {/* Right image collage — still animated on scroll */}
            <div className="story-reveal-right relative hidden mb-32 md:block">
              <div className="relative ml-auto h-[420px] w-[520px]">
                <div className="story-card absolute left-[0px] top-[105px] h-[350px] w-[180px] overflow-hidden rounded-[34px] bg-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.25)] ring-1 ring-white/10">
                  <img src="/images/3_11zon.webp" alt="farmland near bangalore" className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="story-card absolute left-[200px] top-[35px] h-[478px] w-[180px] overflow-hidden rounded-[34px] bg-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.25)] ring-1 ring-white/10">
                  <img src="/images/2_11zon.webp" alt="farmland near lepakshi" className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="story-card absolute left-[400px] top-[100px] h-[350px] w-[180px] overflow-hidden rounded-[34px] bg-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.25)] ring-1 ring-white/10">
                  <img src="/images/1_11zon.webp" alt="farmland investment" className="h-full w-full object-cover" loading="lazy" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}