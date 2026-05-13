"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./FeaturesScroll.module.css";

const features = [
  {
    id: 1,
    title: "Structured Training Program",
    desc: "Striverfit's built-in programs guide you through every session with perfect structure.",
    mainImage: "/images/athlete-track.png",
    hasAppOverlay: true,
    appImage: "/images/deep-muscle-app.jpeg",
    appStyle: { left: "10%", top: "10%", height: "80%" },
  },
  {
    id: 2,
    title: "200+ Exercises",
    desc: "The versatile cable system combined with guided programs delivers a complete gym experience in one compact unit.",
    mainImage: "/images/sweating-girl.png",
    hasPlayBtn: true,
    tooltips: [
      { text: "Full-body functional movements including presses, pulls, squats, lunges, and core rotations.", top: "15%", left: "55%" }
    ]
  },
  {
    id: 3,
    title: "Adaptive Resistance & Safety",
    desc: "Advanced algorithms instantly match resistance to your current strength level in real time.",
    mainImage: "/images/cable-man.png",
    tooltips: [
      { text: "Real-time auto-adjustment", top: "15%", left: "10%", lineDir: "top-left" },
      { text: "Built-in safety limits stop resistance", top: "45%", left: "60%", lineDir: "right" },
      { text: "protects your joints while pushing your limits.", top: "60%", left: "15%", lineDir: "bottom-left" }
    ]
  },
  {
    id: 4,
    title: "Compact Space Design",
    desc: "Engineered to fit beautifully in any modern Indian home, apartment, or office without compromising on capability.",
    mainImage: "/images/living-room-machine.png",
    tooltips: [
      { text: "Ultra-compact footprint that occupies less space than a standard treadmill.", top: "25%", left: "30%", lineDir: "top" },
      { text: "Clean, minimalist design that blends as modern furniture.", top: "50%", left: "60%", lineDir: "right" },
      { text: "Simply unbox and start training in minutes.", top: "75%", left: "15%", lineDir: "bottom-left" }
    ]
  },
  {
    id: 5,
    title: "Growth & Progress Tracking",
    desc: "Striverfit turns every workout into measurable progress with intelligent tracking and visual insights.",
    mainImage: "/images/woman-stretching.jpg",
    hasAppOverlay: true,
    appImage: "/images/live-workout-app.png",
    appStyle: { right: "5%", top: "15%", height: "70%" },
    tooltips: [
      { text: "Weekly and monthly reports.", top: "35%", left: "10%", lineDir: "left" },
      { text: "personal records that keep you motivated.", top: "60%", left: "15%", lineDir: "bottom-left" },
      { text: "Real-time rep, weight, and power data recommendations.", top: "85%", left: "40%", lineDir: "bottom" }
    ]
  }
];

export default function FeaturesScroll() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    // Only apply horizontal scroll logic on larger screens
    if (window.innerWidth > 768) {
      const ctx = gsap.context(() => {
        const trackWidth = trackRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        const scrollDistance = trackWidth - windowWidth;

        // Animate the horizontal track
        gsap.to(trackRef.current, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            // Pin for the duration of the track length
            end: () => `+=${scrollDistance}`,
            invalidateOnRefresh: true,
          },
        });

        // Animate the progress bar
        gsap.fromTo(progressLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              scrub: 1,
              start: "top top",
              end: () => `+=${scrollDistance}`,
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.trackContainer}>
        <div className={styles.track} ref={trackRef}>
          {features.map((feature, index) => (
            <div key={feature.id} className={styles.cardWrapper}>
              <div className={styles.cardImageContainer}>
                <div className={styles.imageOverflowMask}>
                  <Image
                    src={feature.mainImage}
                    alt={feature.title}
                    fill
                    className={styles.mainImage}
                    sizes="(max-width: 900px) 90vw, 800px"
                    priority={index < 2}
                  />
                  
                  {/* Overlay Dark Gradient */}
                  <div className={styles.overlay} />
                </div>

                {/* App UI Overlays */}
                {feature.hasAppOverlay && (
                  <div className={styles.appOverlay} style={feature.appStyle}>
                    <Image
                      src={feature.appImage}
                      alt="App Interface"
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      quality={100}
                      unoptimized={true}
                      className={styles.appImage}
                    />
                  </div>
                )}

                {/* Tooltips */}
                {feature.tooltips && feature.tooltips.map((tip, i) => (
                  <div
                    key={i}
                    className={`${styles.tooltip} ${styles[tip.lineDir || 'left']}`}
                    style={{ top: tip.top, left: tip.left }}
                  >
                    <div className={styles.tooltipDot}></div>
                    <div className={styles.tooltipContent}>{tip.text}</div>
                  </div>
                ))}

                {/* Play Button */}
                {feature.hasPlayBtn && (
                  <div className={styles.playBtnWrapper}>
                    <button className={styles.playBtn}>
                      <span className={styles.playIcon}>▶</span>
                    </button>
                    <span className={styles.playText}>Press to Watch</span>
                  </div>
                )}
              </div>

              <div className={styles.cardText}>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDesc}>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation & Progress Area */}
      <div className={styles.navArea}>
        <div className={styles.arrows}>
          <button className={styles.arrowBtn}>←</button>
          <button className={styles.arrowBtn}>→</button>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressTrack}></div>
          <div className={styles.progressFill} ref={progressLineRef}></div>
        </div>
      </div>
    </section>
  );
}
