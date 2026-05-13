"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AppFeatures.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function AppFeatures() {
  const sectionRef = useRef(null);
  const phoneRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const featureLinesRef = useRef([]);
  const featurePillsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ──────────────────────────────────────────────
       *  MASTER TIMELINE – scrub-linked to scroll
       *  The phone rises from below the viewport,
       *  then left/right content fades in sequentially.
       * ────────────────────────────────────────────── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 10%",
          scrub: 1,          // ties every tween to scroll position
        },
      });

      // 1 ▸ Phone rises from fully below into its resting position
      tl.fromTo(
        phoneRef.current,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );

      // 2 ▸ Left column fades/slides up (staggered children)
      tl.from(
        leftColRef.current.children,
        { y: 60, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
        "-=0.4"
      );

      // 3 ▸ Lines draw outward from phone
      tl.from(
        featureLinesRef.current,
        { scaleX: 0, opacity: 0, duration: 0.5, stagger: 0.2, ease: "power3.inOut" },
        "-=0.3"
      );

      // 4 ▸ Feature pills pop in
      tl.from(
        featurePillsRef.current,
        { x: -15, opacity: 0, scale: 0.92, duration: 0.5, stagger: 0.2, ease: "back.out(1.4)" },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="app-features">

      {/* ── LEFT SIDE ── */}
      <div className={styles.leftCol} ref={leftColRef}>
        <h2 className={styles.title}>
          App Feature
          <br />
          Plan
        </h2>
        <div className={styles.infoPill}>
          Striverfit offers adaptive resistance and guided training programs for
          consistent, measurable strength gains at home.
        </div>
      </div>

      {/* ── CENTER PHONE ── */}
      <div className={styles.phoneWrapper} ref={phoneRef}>
        <Image
          src="/images/phone-mockup.png"
          alt="Striver App on Smartphone"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={100}
          unoptimized={true}
          style={{ objectFit: "contain", objectPosition: "bottom center" }}
          priority
        />
      </div>

      {/* ── RIGHT SIDE FEATURES ── */}
      <div className={styles.rightCol} ref={rightColRef}>
        {/* Feature 1 */}
        <div className={styles.featureItem}>
          <div
            className={styles.line}
            ref={(el) => (featureLinesRef.current[0] = el)}
          />
          <div
            className={styles.featurePill}
            ref={(el) => (featurePillsRef.current[0] = el)}
          >
            Minimal &amp; Productive
          </div>
        </div>

        {/* Feature 2 */}
        <div className={styles.featureItem}>
          <div
            className={styles.line}
            ref={(el) => (featureLinesRef.current[1] = el)}
          />
          <div
            className={styles.featurePill}
            ref={(el) => (featurePillsRef.current[1] = el)}
          >
            Premium<br />Training Program
          </div>
        </div>
      </div>
    </section>
  );
}
