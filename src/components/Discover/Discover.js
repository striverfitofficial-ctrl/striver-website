"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Discover.module.css";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = ["Home", "Features", "How It Works", "Pricing", "App"];

export default function Discover() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const btnRef = useRef(null);
  const videoRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for scroll-triggered entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "top 15%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(videoRef.current, {
        scale: 0.7,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
      })
        .from(
          glowRef.current,
          { scale: 0.5, opacity: 0, duration: 1.2, ease: "power3.out" },
          "-=1.2"
        )
        .from(
          titleRef.current,
          {
            y: 120,
            opacity: 0,
            clipPath: "inset(100% 0 0 0)",
            duration: 1.1,
            ease: "power4.out",
          },
          "-=0.8"
        )
        .from(
          btnRef.current,
          { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        );

      // Parallax on the video container
      gsap.to(videoRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="discover">
      {/* Logo */}
      <Image
        src="/images/logo.png"
        alt="Striverfit"
        width={80}
        height={24}
        className={styles.discoverLogo}
        style={{ width: "auto", height: "auto" }}
      />

      {/* Removed duplicated nav bar overlay */}

      {/* Radial glow */}
      <div ref={glowRef} className={styles.glow} />

      {/* Video container */}
      <div ref={videoRef} className={styles.videoContainer}>
        <video
          className={styles.video}
          src="/videos/discover.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h2 ref={titleRef} className={styles.title}>
          Discover
        </h2>
        <button ref={btnRef} className={styles.btn}>
          How it works <span className={styles.arrow}>↗</span>
        </button>
      </div>
    </section>
  );
}
