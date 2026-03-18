import { Download } from "lucide-react";

/**
 * FloatingCT — framer-motion removed.
 * The two motion.div wrappers only did a simple fade+scale-in on mount.
 * Replaced with CSS animation via @keyframes — zero JS, same visual.
 */

const floatStyle = `
  @keyframes floatIn {
    from { opacity: 0; transform: translateY(12px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }
  .float-in { animation: floatIn 0.4s cubic-bezier(0.22,1,0.36,1) both; }
`;

export default function FloatingCT({ onBrochureClick }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: floatStyle }} />

      {/* Floating WhatsApp + Call */}
      <div className="float-in fixed bottom-5 right-4 z-[9999] flex flex-col items-end gap-4 font-poppins">
        {/* WhatsApp - Mobile */}
        <a
          href="https://wa.me/918660200662"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-chat sm:hidden w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
        >
          <img src="/images/whatsapp.svg" alt="whatsapp" className="w-7 h-7" loading="lazy"/>
        </a>

        {/* WhatsApp - Desktop */}
        <a
          href="https://wa.me/918660200662"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-chat-gtm hidden sm:inline-flex no-underline relative items-center bg-white rounded-xl shadow-[0_12px_35px_rgba(0,0,0,0.18)] overflow-hidden"
          style={{ width: "52px", height: "52px", transition: "width 0.3s ease" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.width = "190px";
            e.currentTarget.querySelector(".wa-label").style.opacity = "1";
            e.currentTarget.querySelector(".wa-label").style.maxWidth = "120px";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.width = "52px";
            e.currentTarget.querySelector(".wa-label").style.opacity = "0";
            e.currentTarget.querySelector(".wa-label").style.maxWidth = "0";
          }}
        >
          <span className="wa-label font-semibold text-base text-slate-800 whitespace-nowrap pl-3"
            style={{ maxWidth: "0", opacity: "0", overflow: "hidden", transition: "max-width 0.3s ease, opacity 0.3s ease" }}>
            WhatsApp
          </span>
          <span className="absolute right-[4px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-[#25D366] flex items-center justify-center shadow-[0_6px_16px_rgba(0,0,0,0.12)] shrink-0">
            <img src="/images/whatsapp.svg" alt="whatsapp" className="w-7 h-7" loading="lazy"/>
          </span>
        </a>

        {/* Call - Mobile */}
        <a href="tel:+918660200662"
          className="tel-chat sm:hidden w-12 h-12 rounded-xl bg-[#3B46F6] flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
          <img src="/images/call_ico.svg" alt="call" className="w-7 h-7 text-white" loading="lazy"/>
        </a>

        {/* Call - Desktop */}
        <a href="tel:+918660200662"
          className="tel-chat-gtm hidden sm:inline-flex no-underline relative items-center bg-white rounded-xl shadow-[0_12px_35px_rgba(0,0,0,0.18)] overflow-hidden"
          style={{ width: "52px", height: "52px", transition: "width 0.3s ease" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.width = "220px";
            e.currentTarget.querySelector(".call-label").style.opacity = "1";
            e.currentTarget.querySelector(".call-label").style.maxWidth = "160px";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.width = "52px";
            e.currentTarget.querySelector(".call-label").style.opacity = "0";
            e.currentTarget.querySelector(".call-label").style.maxWidth = "0";
          }}
        >
          <span className="call-label font-semibold text-base text-slate-800 whitespace-nowrap pl-3"
            style={{ maxWidth: "0", opacity: "0", overflow: "hidden", transition: "max-width 0.3s ease, opacity 0.3s ease" }}>
            +91 8660200662
          </span>
          <span className="absolute right-[4px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-[#3B46F6] flex items-center justify-center shadow-[0_6px_16px_rgba(0,0,0,0.12)] shrink-0">
            <img src="/images/call_ico.svg" alt="call" className="w-7 h-7 text-white" loading="lazy"/>
          </span>
        </a>
      </div>

      {/* Floating Brochure */}
      <div
        className="float-in fixed bottom-16 lg:bottom-5 left-6 lg:left-8 z-[9999] font-poppins cursor-pointer"
        onClick={onBrochureClick}
      >
        {/* Mobile */}
        <div className="sm:hidden w-12 h-12 rounded-xl bg-[#cd6701] flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
          <Download className="w-7 h-7 text-white" />
        </div>

        {/* Desktop */}
        <div
          className="hidden sm:inline-flex no-underline relative items-center bg-white rounded-xl shadow-[0_12px_35px_rgba(0,0,0,0.18)] overflow-hidden"
          style={{ width: "52px", height: "52px", transition: "width 0.3s ease" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.width = "175px";
            e.currentTarget.querySelector(".brochure-label").style.opacity = "1";
            e.currentTarget.querySelector(".brochure-label").style.maxWidth = "120px";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.width = "52px";
            e.currentTarget.querySelector(".brochure-label").style.opacity = "0";
            e.currentTarget.querySelector(".brochure-label").style.maxWidth = "0";
          }}
        >
          <span className="brochure-label font-semibold text-base text-slate-800 whitespace-nowrap pl-3"
            style={{ maxWidth: "0", opacity: "0", overflow: "hidden", transition: "max-width 0.3s ease, opacity 0.3s ease" }}>
            Get Brochure
          </span>
          <span className="absolute right-[4px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-[#cd6701] flex items-center justify-center shadow-[0_6px_16px_rgba(0,0,0,0.12)] shrink-0">
            <Download className="w-6 h-6 text-white" />
          </span>
        </div>
      </div>
    </>
  );
}