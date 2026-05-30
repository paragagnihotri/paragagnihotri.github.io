"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface Props {
  readonly trigger: React.ReactNode;
}

export default function LinkedInBadgeModal({ trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scriptLoaded = useRef(false);

  useEffect(() => { setMounted(true); }, []);

  /* Load LinkedIn script once — badge div must already be in the DOM when script runs */
  useEffect(() => {
    if (!mounted || scriptLoaded.current) return;
    scriptLoaded.current = true;
    const script = document.createElement("script");
    script.src = "https://platform.linkedin.com/badges/js/profile.js"; // NOSONAR typescript:S5725 — LinkedIn CDN has no SRI hash
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, [mounted]);

  /* Lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* Escape key */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    if (open) globalThis.addEventListener("keydown", onKey);
    return () => globalThis.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="block w-full h-full rounded-full focus:outline-none cursor-pointer"
        aria-label="View LinkedIn Profile"
      >
        {trigger}
      </button>

      {/*
        Portal always stays in the DOM after first mount — the overlay is toggled
        via display style, never unmounted. This keeps the LinkedIn iframe alive
        so it never needs to re-render, matching exactly how index.html works.
      */}
      {mounted && createPortal(
        <>
          {/* Full-screen backdrop button — native interactive element, handles click-to-close */}
          <button
            aria-label="Close LinkedIn profile"
            onClick={close}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") close(); }}
            style={{
              display: open ? "block" : "none",
              position: "fixed", inset: 0, zIndex: 100,
              width: "100%", height: "100%",
              background: "rgba(44,24,16,0.55)",
              backdropFilter: "blur(5px)",
              cursor: "default", border: "none", padding: 0,
            }}
            className={open ? "modal-backdrop-enter" : ""}
          />

          {/* Card — always in DOM so the LinkedIn iframe is never destroyed */}
          <div
            style={{
              display: open ? "flex" : "none",
              position: "fixed", inset: 0, zIndex: 101,
              alignItems: "center", justifyContent: "center", padding: "1rem",
              pointerEvents: "none",
            }}
          >
            <div
              className={`bg-white rounded-2xl flex flex-col items-center pointer-events-auto ${open ? "modal-box-enter" : ""}`}
              style={{ boxShadow: "0 8px 40px 0 rgba(107,66,38,0.2)" }}
            >
              <div className="w-full flex justify-end px-3 pt-3">
                <button
                  onClick={close}
                  className="p-1.5 rounded-lg text-brown-400 hover:text-brown-700 hover:bg-brown-100 transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="px-6 pb-6">
                <div
                  className="badge-base LI-profile-badge"
                  data-locale="en_US"
                  data-size="medium"
                  data-theme="light"
                  data-type="VERTICAL"
                  data-vanity="agnihotriparag"
                  data-version="v1"
                >
                  {/* <a
                    className="badge-base__link LI-simple-link"
                    href="https://in.linkedin.com/in/agnihotriparag?trk=profile-badge"
                  >
                    Parag Agnihotri
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
