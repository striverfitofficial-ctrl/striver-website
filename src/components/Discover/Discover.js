"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Discover.module.css";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = ["Home", "Features", "How It Works", "Pricing", "App"];

export default function Discover() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
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
    <section ref={sectionRef} className={styles.section} id="how-it-works">
      {/* Radial glow */}
      <div ref={glowRef} className={styles.glow} />

      {/* Video container */}
      <div ref={videoRef} className={styles.videoContainer} onClick={() => setIsVideoModalOpen(true)}>
        <video
          className={styles.video}
          src="/videos/discover.mp4"
          autoPlay
          muted
          loop
          playsInline
          controlsList="nodownload"
          onContextMenu={(e) => e.preventDefault()}
        />
        <div className={styles.videoOverlay} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h2 ref={titleRef} className={styles.title}>
          Discover
        </h2>
        <Link href="/how-it-works" ref={btnRef} className={styles.btn}>
          How it works <span className={styles.arrow}>↗</span>
        </Link>

        {/* Mobile Play Button */}
        <button 
          className={styles.mobilePlayBtn} 
          onClick={() => setIsVideoModalOpen(true)}
          aria-label="Play Discover Video"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          Watch Video
        </button>
      </div>

      {/* Fullscreen Video Modal */}
      {isVideoModalOpen && (
        <div className={styles.videoModal} onClick={() => setIsVideoModalOpen(false)}>
          <button className={styles.closeModalBtn} onClick={() => setIsVideoModalOpen(false)}>
            ✕
          </button>
          <div className={styles.modalVideoContainer} onClick={(e) => e.stopPropagation()}>
            <video
              className={styles.modalVideo}
              src="/videos/discover.mp4"
              controls
              autoPlay
              playsInline
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
