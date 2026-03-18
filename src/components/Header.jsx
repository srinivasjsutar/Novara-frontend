import React, { useEffect, useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { Menu, X, Phone, Mail } from "lucide-react";

/**
 * Header — framer-motion removed entirely.
 *
 * framer-motion is ~100 KB and was loaded eagerly in the Header,
 * which is the very first component rendered on every page.
 * That forced the browser to parse the entire motion bundle before
 * it could paint anything — a massive TTI / TBT hit.
 *
 * Replacements:
 *  - navActivePill: plain CSS transition on background + border (imperceptible diff)
 *  - social icon hover: CSS scale via Tailwind hover:scale-105
 *  - mobile menu: CSS max-height transition (no JS animation loop)
 *  - mobile button tap: CSS active:scale-95
 */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { urlPathname } = usePageContext();

  const links = [
    { to: "/", label: "Home" },
    { to: "/whynovara", label: "Why Novara" },
    { to: "/projects", label: "Projects" },
    { to: "/blogs", label: "Blogs" },
    { to: "/contactus", label: "Contact Us" },
  ];

  const social = [
    { iconSrc: "/images/fb.svg", href: "https://www.facebook.com/profile.php?id=61585877764871#", label: "Facebook" },
    { iconSrc: "/images/insta.svg", href: "https://www.instagram.com/novaranatureestates/", label: "Instagram" },
    { iconSrc: "/images/yt.svg", href: "https://www.youtube.com/@NovaraNatureEstates", label: "YouTube" },
    { iconSrc: "/images/linkedin1.svg", href: "https://www.linkedin.com/company/novara-nature-estates/", label: "LinkedIn" },
  ];

  const isActive = (to) => {
    if (to === "/") return urlPathname === "/";
    return urlPathname.startsWith(to);
  };

  useEffect(() => setMobileOpen(false), [urlPathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky font-urbanist top-0 z-50 w-full bg-[#52A09A]">
        <div className="mx-auto flex h-[90px] lg:max-w-[1420px] items-center justify-between gap-4 px-4 sm:px-6">

          {/* Logo */}
          <a href="/" className="flex items-center gap-3 !no-underline">
            <img
              src="/images/logo.svg"
              alt="Novara Nature Estates"
              width={208}
              height={64}
              className="w-[156px] h-[48px] lg:w-[208px] lg:h-[64px] object-contain"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </a>

          {/* Desktop Nav — active pill via CSS, no framer-motion */}
          <nav className="hidden flex-1 justify-center lg:flex">
            <div className="relative inline-flex items-center gap-2 lg:ms-4 2xl:ms-0 rounded-full bg-white/95 p-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
              {links.map((l) => {
                const active = isActive(l.to);
                return (
                  <a
                    key={l.label}
                    href={l.to}
                    className={[
                      "relative z-10 rounded-full px-7 py-2 text-[15px] font-semibold",
                      "transition-colors duration-200 !no-underline",
                      active
                        ? "text-[#0C4A43] bg-white border border-[#148240]"
                        : "text-[#1B2B2A] hover:text-[#0C4A43]",
                    ].join(" ")}
                  >
                    {l.label}
                  </a>
                );
              })}
            </div>
          </nav>

          {/* Desktop: Social + Phone */}
          <div className="hidden items-center gap-4 lg:flex lg:ml-0 2xl:-ml-8">
            <div className="flex items-center gap-3">
              {social.map(({ iconSrc, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center h-[36px] w-[36px] rounded-full overflow-hidden bg-white shadow-[0_6px_14px_rgba(0,0,0,0.14)] transition-transform duration-150 hover:scale-105 active:scale-95"
                >
                  <img
                    src={iconSrc}
                    alt={label}
                    width={36}
                    height={36}
                    className="h-full w-full object-contain p-2"
                  />
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2 text-white">
              <a
                href="tel:+918660200662"
                className="flex items-center gap-2 text-[15px] text-white font-semibold !no-underline hover:opacity-90"
              >
                <span className="grid place-items-center rounded-full bg-white/15 ring-1 ring-white/25">
                  <img src="/images/call_icon.svg" alt="Phone" width={32} height={32} className="h-8 w-8" loading="eager" />
                </span>
                <span>+91-8660200662</span>
              </a>
            </div>
          </div>

          {/* Mobile menu toggle — CSS active scale, no framer-motion */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex lg:hidden h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 active:scale-95 transition-transform duration-100"
            aria-label="Open menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu — CSS transition, no framer-motion */}
      <div
        className={[
          "fixed left-0 right-0 top-[90px] z-50 bg-[#52A09A] lg:hidden overflow-hidden",
          "transition-all duration-200 ease-out",
          mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div className="mx-auto max-w-[1400px] px-4 pb-5 pt-4 sm:px-6">
          <div className="rounded-2xl bg-white/95 p-3 shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
            <nav className="flex flex-col gap-1">
              {links.map((l) => {
                const active = isActive(l.to);
                return (
                  <a
                    key={l.label}
                    href={l.to}
                    className={[
                      "rounded-xl px-4 py-3 text-[15px] font-semibold !no-underline",
                      active ? "bg-[#EAF7F6] text-[#0C4A43]" : "text-[#1B2B2A]",
                    ].join(" ")}
                  >
                    {l.label}
                  </a>
                );
              })}
            </nav>

            <div className="mt-4 flex items-center gap-2">
              {social.map(({ iconSrc, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center h-[36px] w-[36px] rounded-full overflow-hidden bg-white shadow-[0_6px_14px_rgba(0,0,0,0.14)] hover:scale-105 transition-transform duration-150"
                >
                  <img src={iconSrc} alt={label} width={36} height={36} className="h-full w-full object-contain p-2" loading="eager" />
                </a>
              ))}
            </div>

            <div className="mt-4 space-y-2 text-[14px] font-semibold text-[#174E49]">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91-8660200662</span>
              </div>
              <div className="flex items-center gap-2 break-all">
                <Mail className="h-4 w-4" />
                <span>info@novaranatureestates.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}