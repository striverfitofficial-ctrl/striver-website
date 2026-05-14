"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SocialProof.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function SocialProof() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".counter-number", {
        innerText: 500,
        duration: 2,
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.statsContainer}>
        <div className={styles.statBox}>
          <h3 className={styles.statNumber}><span className="counter-number">0</span>+</h3>
          <p className={styles.statLabel}>Pre-orders</p>
        </div>
        <div className={styles.statBox}>
          <h3 className={styles.statNumber}>200+</h3>
          <p className={styles.statLabel}>Exercises</p>
        </div>
        <div className={styles.statBox}>
          <h3 className={styles.statNumber}>4.9★</h3>
          <p className={styles.statLabel}>Rating</p>
        </div>
      </div>

      <div className={styles.testimonials}>
        <div className={styles.testimonialCard}>
          <div className={styles.stars}>★★★★★</div>
          <p className={styles.quote}>"The Striver machine completely replaced my gym membership. It's sleek, quiet, and the adaptive resistance is a game changer."</p>
          <div className={styles.user}>
            <div className={styles.avatar}>A</div>
            <div>
              <h4>Arjun M.</h4>
              <span>Beta Tester</span>
            </div>
          </div>
        </div>
        <div className={styles.testimonialCard}>
          <div className={styles.stars}>★★★★★</div>
          <p className={styles.quote}>"I was skeptical about digital weights, but this feels incredible. Fits perfectly in my apartment corner."</p>
          <div className={styles.user}>
            <div className={styles.avatar}>P</div>
            <div>
              <h4>Priya S.</h4>
              <span>Early Adopter</span>
            </div>
          </div>
        </div>
        <div className={styles.testimonialCard}>
          <div className={styles.stars}>★★★★★</div>
          <p className={styles.quote}>"The structured programs keep me consistent. Best investment I've made for my health."</p>
          <div className={styles.user}>
            <div className={styles.avatar}>R</div>
            <div>
              <h4>Rohan K.</h4>
              <span>Fitness Enthusiast</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.partnerMarquee}>
         <p className={styles.partnerTitle}>AS SEEN IN</p>
         <div className={styles.marqueeTrack}>
           <span className={styles.partnerLogo}>TECHCRUNCH</span>
           <span className={styles.partnerLogo}>MENS HEALTH</span>
           <span className={styles.partnerLogo}>WIRED</span>
           <span className={styles.partnerLogo}>FORBES</span>
           <span className={styles.partnerLogo}>GQ</span>
           {/* Duplicated for infinite scroll */}
           <span className={styles.partnerLogo}>TECHCRUNCH</span>
           <span className={styles.partnerLogo}>MENS HEALTH</span>
           <span className={styles.partnerLogo}>WIRED</span>
           <span className={styles.partnerLogo}>FORBES</span>
           <span className={styles.partnerLogo}>GQ</span>
         </div>
      </div>
    </section>
  );
}
