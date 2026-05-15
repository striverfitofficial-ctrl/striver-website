"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.css";
import FitnessQuiz from "../FitnessQuiz/FitnessQuiz";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const ctaRef = useRef(null);
  const lineRef = useRef(null);
  const trustRef = useRef(null);
  const strengthRef = useRef(null);
  const strengthTextRef = useRef(null);
  const strengthVisualsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ===== Hero entrance ===== */
      const tl = gsap.timeline({ delay: 0.4 });

      // Text reveal: each word clips in from bottom
      tl.from(headlineRef.current.querySelectorAll("span"), {
        y: 100,
        opacity: 0,
        clipPath: "inset(0 0 100% 0)",
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.08,
      })
        .fromTo(
          ctaRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1, clearProps: "all" },
          "-=0.5"
        )
        .fromTo(
          lineRef.current,
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, duration: 0.8, ease: "power3.out", transformOrigin: "top", clearProps: "all" },
          "-=0.4"
        )
        .fromTo(
          trustRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", clearProps: "all" },
          "-=0.4"
        );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home">
      {/* ===== HERO ===== */}
      <div className={styles.hero}>
        <video
          className={styles.videoBg}
          src="/videos/hero-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className={styles.overlay} />

        {/* FITNESS QUIZ ENTRY (Hero Mode) */}
        <FitnessQuiz />

        <div className={styles.heroContent}>
          <h1 ref={headlineRef} className={styles.headline}>
            <span className={styles.headlineWord}>Elevate</span>{" "}
            <span className={styles.headlineWord}>your</span>{" "}
            <span className={styles.headlineWord}>personal</span>
            <br />
            <span className={styles.headlineWord}>fitness</span>{" "}
            <span className={styles.headlineWord}>to</span>{" "}
            <span className={styles.headlineWord}>new</span>{" "}
            <span className={styles.headlineWord}>heights.</span>
          </h1>

          <div ref={ctaRef} className={styles.ctaRow}>
            <span className={styles.badge}>Premium Fitness Equipment For India</span>
            <Link href="/login" className={styles.ctaBtn}>
              Get Started <span className={styles.ctaArrow}>↗</span>
            </Link>
          </div>

          <div ref={lineRef} className={styles.lineAccent} />
        </div>

        <div ref={trustRef} className={styles.trustBar}>
          <p className={styles.trustLabel}>TRUSTED BY LEADING BRANDS</p>
          <div className={styles.logoMarquee}>
            <div className={styles.logoTrack}>
              <span className={styles.logoText}>ADIDAS</span>
              <span className={styles.logoDot}>•</span>
              <span className={styles.logoText}>NIKE</span>
              <span className={styles.logoDot}>•</span>
              <span className={styles.logoText}>PELOTON</span>
              <span className={styles.logoDot}>•</span>
              <span className={styles.logoText}>FITBIT</span>
              <span className={styles.logoDot}>•</span>
              <span className={styles.logoText}>APPLE HEALTH</span>
              <span className={styles.logoDot}>•</span>
              <span className={styles.logoText}>GARMIN</span>
              <span className={styles.logoDot}>•</span>
              <span className={styles.logoText}>UNDER ARMOUR</span>
              <span className={styles.logoDot}>•</span>
              <span className={styles.logoText}>ADIDAS</span>
              <span className={styles.logoDot}>•</span>
              <span className={styles.logoText}>NIKE</span>
              <span className={styles.logoDot}>•</span>
              <span className={styles.logoDot}>•</span>
              <span className={styles.logoText}>PELOTON</span>
              <span className={styles.logoDot}>•</span>
              <span className={styles.logoText}>FITBIT</span>
              <span className={styles.logoDot}>•</span>
              <span className={styles.logoText}>APPLE HEALTH</span>
              <span className={styles.logoDot}>•</span>
              <span className={styles.logoText}>GARMIN</span>
              <span className={styles.logoDot}>•</span>
              <span className={styles.logoText}>UNDER ARMOUR</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== STRENGTH SECTION ===== */}
      <div ref={strengthRef} className={styles.strengthSection}>
        <div className="container">
          <div className={styles.strengthGrid}>
            <div ref={strengthTextRef} className={styles.strengthText}>
              <h2>
                Strength training powered
                <br />
                by adaptive resistance
              </h2>
              <p>
                Striverfit&apos;s smart home system adjusts resistance in real time
                and guides organised workouts, providing a compact, efficient
                strength-training solution.
              </p>
              <button className={styles.heroFollowBtn}>
                Follow us on <span>↗</span>
              </button>
            </div>

            <div ref={strengthVisualsRef} className={styles.strengthVisuals}>
              {/* App Preview Card (left) */}
              <div className={`${styles.visualCard} ${styles.appPreview}`}>
                <Image
                  src="/images/Left_Image.png"
                  alt="Striverfit App Dashboard"
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, (max-width: 1100px) 30vw, 360px"
                  className={styles.appPreviewImg}
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  quality={100}
                  unoptimized={true}
                  priority
                />
              </div>

              {/* Machine Card (center, the hero visual) */}
              <div className={`${styles.visualCard} ${styles.machineCard}`}>
                <Image
                  src="/images/machine-detail.png"
                  alt="Striverfit Machine in living room"
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 100vw, (max-width: 1100px) 45vw, 600px"
                  className={styles.machineCardImg}
                  style={{ objectFit: "cover", objectPosition: "right center" }}
                  priority={true}
                />
                <div className={styles.resistanceOverlay}>
                  <span className={styles.resistanceNum}>5</span>
                  <span className={styles.resistanceLabel}>Current Resistance</span>
                  <div className={styles.resistanceValue}>
                    <span>+</span>100 kg
                  </div>
                </div>
              </div>

              {/* Athlete Card (right) */}
              <div className={`${styles.visualCard} ${styles.athleteCard}`}>
                <Image
                  src="/images/athlete-workout.png"
                  alt="Athlete using resistance cables"
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, (max-width: 1100px) 25vw, 260px"
                  className={styles.athleteImg}
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  priority={true}
                />
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className={styles.bottomBar}>
        <span className={styles.bottomLabel}>Intelligent Home Training</span>
        <Link href="/shop" className={styles.preorderBtn}>Pre-order soon</Link>
      </div>
    </section>
  );
}
