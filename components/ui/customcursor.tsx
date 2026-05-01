// components/CustomCursor.tsx
/* 01 */ "use client";
/* 02 */ import React, { useEffect, useRef } from "react";
/* 03 */
/* 04 */ const isHoverCapable = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
/* 05 */ const DEBOUNCE_MS = 12;
/* 06 */
/* 07 */ export default function CustomCursor() {
  /* 08 */ const cursorRef = useRef<HTMLDivElement | null>(null);
  /* 09 */ const rafRef = useRef<number | null>(null);
  /* 10 */ const lastPos = useRef({ x: -9999, y: -9999 });
  /* 11 */ const scheduled = useRef(false);
  /* 12 */
  /* 13 */ useEffect(() => {
    /* 14 */ if (!isHoverCapable) return;
    /* 15 */ const el = cursorRef.current;
    /* 16 */ if (!el) return;
    /* 17 */
    /* 18 */ function onMove(e: MouseEvent) {
      /* 19 */ lastPos.current = { x: e.clientX, y: e.clientY };
      /* 20 */ if (scheduled.current) return;
      /* 21 */ scheduled.current = true;
      /* 22 */ rafRef.current = requestAnimationFrame(() => {
        /* 23 */ if (el) el.style.transform = `translate3d(${lastPos.current.x}px, ${lastPos.current.y}px, 0)`;
        /* 24 */ scheduled.current = false;
      /* 25 */ });
    /* 26 */ }
    /* 27 */
    /* 28 */ window.addEventListener("mousemove", onMove, { passive: true });
    /* 29 */ return () => {
      /* 30 */ window.removeEventListener("mousemove", onMove);
      /* 31 */ if (rafRef.current) cancelAnimationFrame(rafRef.current);
    /* 32 */ };
  /* 33 */ }, []);
  /* 34 */
  /* 35 */ return (
    /* 36 */ <div
      /* 37 */ ref={cursorRef}
      /* 38 */ aria-hidden
      /* 39 */ style={{
        /* 40 */ position: "fixed",
        /* 41 */ top: 0,
        /* 42 */ left: 0,
        /* 43 */ width: 18,
        /* 44 */ height: 18,
        /* 45 */ marginLeft: -9,
        /* 46 */ marginTop: -9,
        /* 47 */ borderRadius: "50%",
        /* 48 */ background: "rgba(201,179,126,0.95)",
        /* 49 */ pointerEvents: "none",
        /* 50 */ transform: "translate3d(-9999px, -9999px, 0)",
        /* 51 */ transition: "width 120ms ease, height 120ms ease, background 120ms ease",
        /* 52 */ zIndex: 9999,
      /* 53 */ }}
    /* 54 */ />
  /* 55 */ );
/* 56 */ }
