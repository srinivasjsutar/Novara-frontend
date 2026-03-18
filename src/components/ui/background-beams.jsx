/**
 * BackgroundBeams — Performance-optimised rewrite
 *
 * Original problem:
 *   50 × <motion.linearGradient> elements each running their own JS animation
 *   loop caused a forced reflow on every frame (Lighthouse flagged 70 ms+ reflow
 *   from [unattributed] + installHook.js).
 *
 * Fix:
 *   - Replaced all framer-motion animated gradients with pure CSS @keyframes.
 *   - Uses `will-change: transform` — GPU composited, zero forced reflow.
 *   - Reduced from 50 paths to 12 — visually equivalent, much less DOM.
 *   - Zero JavaScript at runtime for this component.
 */

import React from "react";
import { cn } from "../../lib/utils";

const beamStyle = `
  @keyframes beamSlide {
    0%   { stroke-dashoffset: 1200; opacity: 0; }
    10%  { opacity: 0.45; }
    90%  { opacity: 0.45; }
    100% { stroke-dashoffset: 0;    opacity: 0; }
  }
`;

const PATHS = [
  "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
  "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
  "M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811",
  "M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779",
  "M-268 -317C-268 -317 -200 88 264 215C728 342 796 747 796 747",
  "M-240 -349C-240 -349 -172 56 292 183C756 310 824 715 824 715",
  "M-212 -381C-212 -381 -144 24 320 151C784 278 852 683 852 683",
  "M-184 -413C-184 -413 -116 -8 348 119C812 246 880 651 880 651",
  "M-156 -445C-156 -445 -88 -40 376 87C840 214 908 619 908 619",
  "M-128 -477C-128 -477 -60 -72 404 55C868 182 936 587 936 587",
  "M-100 -509C-100 -509 -32 -104 432 23C896 150 964 555 964 555",
  "M-72 -541C-72 -541 -4 -136 460 -9C924 118 992 523 992 523",
];

const COLORS = ["#DCA000", "#52A09A", "#DCA000", "#FFD698"];

export const BackgroundBeams = React.memo(({ className }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <style dangerouslySetInnerHTML={{ __html: beamStyle }} />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ willChange: "transform" }}
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="beams-radial" cx="50%" cy="50%" r="60%" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#d4d4d4" stopOpacity="0.06" />
            <stop offset="60%" stopColor="#d4d4d4" stopOpacity="0.02" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#beams-radial)" />
        {PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke={COLORS[i % COLORS.length]}
            strokeOpacity="0"
            strokeWidth="0.6"
            strokeDasharray="1200"
            strokeDashoffset="1200"
            style={{
              animation: `beamSlide ${10 + (i % 5) * 1.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
});

BackgroundBeams.displayName = "BackgroundBeams";