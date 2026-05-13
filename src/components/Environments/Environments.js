"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Environments.module.css";

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  {
    id: "office",
    title: "For Office",
    desc: "Quick, guided 20–30 minute sessions that busy professionals can complete during lunch breaks or before/after work, boosting workplace wellness.",
    overlayClass: styles.officeOverlay,
    bg: "url('/images/Image_3.png') center/cover no-repeat",
  },
  {
    id: "home",
    title: "For Home",
    desc: "Compact and apartment-friendly design that fits seamlessly into any living space without taking over your home gym corner.",
    overlayClass: styles.homeOverlay,
    bg: "url('/images/Image_2.png') center/cover no-repeat",
  },
  {
    id: "gym",
    title: "For Gym",
    desc: "Sleek minimalist design blends perfectly with modern studio aesthetics while delivering premium results for serious lifters.",
    overlayClass: styles.gymOverlay,
    bg: "url('/images/Image_1.png') center/cover no-repeat",
  },
];

export default function Environments() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section visibility for sidebar/indicators
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => setSidebarVisible(true),
        onLeave: () => setSidebarVisible(false),
        onEnterBack: () => setSidebarVisible(true),
        onLeaveBack: () => setSidebarVisible(false),
        onUpdate: (self) => setProgress(Math.round(self.progress * 100)),
      });

      // Pin and scale effect for stacking cards
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // CSS `position: sticky` handles the pinning naturally.
        // We just need GSAP to handle the scale-down effect as the next card comes up.

        // Scale down when next card overlaps
        const nextCard = cardsRef.current[index + 1];
        if (nextCard) {
          gsap.to(card, {
            scale: 1 - (cardsRef.current.length - 1 - index) * 0.05,
            opacity: 0.6,
            filter: "brightness(0.6)",
            scrollTrigger: {
              trigger: nextCard,
              start: "top 80%",
              end: `top ${12 + (index + 1) * 4}vh`,
              scrub: true,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} className={styles.section} id="how-it-works">
        {/* Scroll indicator bottom-left */}
        <div className={`${styles.scrollIndicator} ${sidebarVisible ? styles.visible : ""}`}>
          <div className={styles.scrollIcon}>↓</div>
          <span className={styles.scrollLabel}>Scroll for more info</span>
        </div>

        {/* Progress bar right side */}
        <div className={`${styles.progressBar} ${sidebarVisible ? styles.visible : ""}`}>
          <div className={styles.progressFill} style={{ height: `${progress}%` }} />
        </div>

        <div className={styles.cardsWrapper}>
          {cardsData.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className={styles.card}
              style={{ zIndex: i + 1, top: `${12 + i * 4}vh` }}
            >
              <div
                className={styles.cardBg}
                style={{ background: card.bg }}
              />
              <div className={`${styles.cardOverlay} ${card.overlayClass}`} />

              <div className={styles.cardContent}>
                <h2 className={styles.title}>{card.title}</h2>
                <p className={styles.description}>{card.desc}</p>

                {i === 2 && (
                  <button className={styles.shopBtn}>Shop now</button>
                )}
              </div>

              {/* Bottom nav on gym card */}
              {i === 2 && (
                <div className={styles.bottomNav}>
                  <button className={styles.navItem}>Equipment</button>
                  <button className={`${styles.navItem} ${styles.navItemActive}`}>
                    Quiz 🪄
                  </button>
                  <button className={`${styles.navItem} ${styles.navItemActive}`}
                    style={{ background: "var(--color-accent)", color: "var(--color-black)" }}>
                    Shop now
                  </button>
                  <button className={styles.navItem}>Account</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Stats bar */}
      <div className={styles.statsBar}>
        <span>AI-Adaptive Resistance</span>
        <span>200+ Exercise Library</span>
      </div>
    </>
  );
}
