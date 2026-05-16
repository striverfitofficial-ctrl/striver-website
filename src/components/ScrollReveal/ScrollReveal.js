"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // ── Scroll-triggered reveal animations ──
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    const targets = document.querySelectorAll(
      ".reveal-up, .reveal-text, .reveal-scale, .reveal-left, .reveal-right, .reveal-stagger"
    );
    targets.forEach((el) => observer.observe(el));

    // ── Scroll progress bar ──
    let progressBar = document.querySelector(".scroll-progress");
    if (!progressBar) {
      progressBar = document.createElement("div");
      progressBar.className = "scroll-progress";
      document.body.prepend(progressBar);
    }

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
    };
  }, [pathname]);

  return null;
}
