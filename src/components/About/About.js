"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiClock, FiActivity, FiTarget, FiSmartphone, FiBox, FiCpu, FiShield, FiMonitor } from 'react-icons/fi';
import { BiRupee, BiDumbbell } from 'react-icons/bi';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { FaShippingFast, FaShieldAlt, FaHeadset } from 'react-icons/fa';
import SharedFooter from '../SharedFooter/SharedFooter';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up animations for sections
      gsap.utils.toArray('.animate-up').forEach((elem) => {
        gsap.fromTo(
          elem,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 80%",
            }
          }
        );
      });

      // Stagger animations for pills and grid items
      gsap.utils.toArray('.animate-stagger-parent').forEach((parent) => {
        gsap.fromTo(
          parent.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: parent,
              start: "top 80%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} id="about" ref={containerRef}>
      {/* 1. Hero Banner */}
      <div className={styles.heroBanner}>
        <div className="container">
          <h1 className={`${styles.heroTitle} animate-up`}>"Smart Training for a Stronger You"</h1>
          <p className={`${styles.heroSubtitle} animate-up`}>
            StriverFit is built to simplify strength training for modern lifestyles. We combine smart technology,
            adaptive resistance, and guided workouts to help people stay consistent from your space.
          </p>
        </div>
      </div>

      {/* 2. Problem Statement */}
      <div className={`${styles.twoColSection} animate-up`}>
        <div className={styles.cardSide}>
          <div className={styles.infoCard}>
            <div className={styles.cardItem}>
              <div className={`${styles.cardIcon} ${styles.iconRed}`}><FiActivity /></div>
              <span>Too complicated</span>
            </div>
            <div className={styles.cardItem}>
              <div className={`${styles.cardIcon} ${styles.iconGreen}`}><BiRupee /></div>
              <span>Too expensive</span>
            </div>
            <div className={styles.cardItem}>
              <div className={`${styles.cardIcon} ${styles.iconYellow}`}><FiClock /></div>
              <span>Too time consuming</span>
            </div>
            <div className={styles.cardItem}>
              <div className={`${styles.cardIcon} ${styles.iconBlue}`}><HiOutlineUserGroup /></div>
              <span>Or difficult to stay consistent with</span>
            </div>
          </div>
          <div className={styles.cardSubtext}>Like many, we encountered<br/>similar challenges:</div>
        </div>
        <div className={styles.textSide}>
          <h2 className={styles.sectionHeading}>StriverFit was created to<br/>solve this problem.</h2>
          <p className={styles.sectionBody}>
            We wanted to design a smarter strength-training experience that combines structure, technology, and simplicity into one seamless Gymtown system.
          </p>
        </div>
      </div>

      {/* 3. Our Vision */}
      <div className={`${styles.twoColSection} ${styles.twoColReverse} animate-up`}>
        <div className={styles.cardSide}>
          <div className={styles.infoCard}>
            <div className={styles.cardItem}>
              <div className={`${styles.cardIcon} ${styles.iconGray}`}><FiActivity /></div>
              <span>inconsistent routines</span>
            </div>
            <div className={styles.cardItem}>
              <div className={`${styles.cardIcon} ${styles.iconGray}`}><FiClock /></div>
              <span>lack of time</span>
            </div>
            <div className={styles.cardItem}>
              <div className={`${styles.cardIcon} ${styles.iconGray}`}><FiTarget /></div>
              <span>Motivation after long workdays</span>
            </div>
            <div className={styles.cardItem}>
              <div className={`${styles.cardIcon} ${styles.iconGray}`}><BiDumbbell /></div>
              <span>difficulty balancing health with modern lifestyles</span>
            </div>
          </div>
          <div className={styles.cardSubtext}>Most fitness systems fit{' '}<br/>into one of two categories:</div>
        </div>
        <div className={styles.textSide}>
          <h2 className={styles.sectionHeading}>Our Vision</h2>
          <p className={styles.sectionBody}>
            StriverFit aims to create a future where health and fitness are simple and attainable. It seeks to eliminate reliance on crowded gyms and complicated routines, helping individuals develop long-term habits through smarter systems.
          </p>
        </div>
      </div>

      {/* 4. Our Approach */}
      <div className={`${styles.approachSection} animate-up`}>
        <div className={styles.approachImage}>
          <Image src="/images/Left_Img.png" alt="Athlete using StriverFit" fill sizes="(max-width: 768px) 100vw, 350px" />
        </div>
        <div className={`${styles.approachPills} animate-stagger-parent`}>
          <div className={styles.approachPill}>Adaptive resistance</div>
          <div className={styles.approachPill}>guided workouts</div>
          <div className={styles.approachPill}>intelligent tracking</div>
          <div className={styles.approachPill}>structured progression</div>
          <div className={styles.approachPill}>personalized fitness insights</div>
        </div>
        <div className={styles.approachText}>
          <h2 className={styles.accentHeading}>Our Approach</h2>
          <p className={styles.sectionBody}>
            Our approach focuses on consistency over intensity. Instead of forcing complicated routines, StriverFit helps users train smarter through this machine.
          </p>
        </div>
      </div>

      {/* 5. Why StriverFit? */}
      <div className={`${styles.whySection} animate-up`}>
        <div className={styles.whyHeader}>
          <h2 className={styles.accentHeading}>Why StriverFit?</h2>
        </div>
        <div className={`${styles.whyGrid} animate-stagger-parent`}>
          <div className={styles.whyCard}>
            <div className={styles.whyIcon}><FiCpu /></div>
            <div>
              <h3 className={styles.whyTitle}>Smart & Personalized</h3>
              <p className={styles.whyDesc}>AI adapts to your training style, progress, and goals.</p>
            </div>
          </div>
          <div className={styles.whyCard}>
            <div className={styles.whyIcon}><FiBox /></div>
            <div>
              <h3 className={styles.whyTitle}>All-in-One Strength Training</h3>
              <p className={styles.whyDesc}>A complete strength-training experience in one compact machine.</p>
            </div>
          </div>
          <div className={styles.whyCard}>
            <div className={styles.whyIcon}><FiClock /></div>
            <div>
              <h3 className={styles.whyTitle}>Saves Time & Effort</h3>
              <p className={styles.whyDesc}>Efficient workouts designed for busy professionals and modern schedules.</p>
            </div>
          </div>
          <div className={styles.whyCard}>
            <div className={styles.whyIcon}><FiMonitor /></div>
            <div>
              <h3 className={styles.whyTitle}>Track. Improve. Succeed.</h3>
              <p className={styles.whyDesc}>Monitor progress with intelligent insights and guided recommendations.</p>
            </div>
          </div>
          <div className={styles.whyCard}>
            <div className={styles.whyIcon}><FiShield /></div>
            <div>
              <h3 className={styles.whyTitle}>Safe, Guided & Reliable</h3>
              <p className={styles.whyDesc}>Designed for all fitness levels with structured, easy-to-follow training.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. CTA */}
      <div className={`${styles.ctaSection} animate-up`}>
        <h4 className={styles.accentHeading}>Get a Demo</h4>
        <h2 className={styles.ctaHeading}>Join Us in Simplifying{' '}<br/>Fitness.</h2>
        <Link href="/wishlist" className={styles.ctaBtn}>Join Us</Link>
      </div>

      {/* 7. Built in India & Footer */}
      <div className={`${styles.builtInIndia} animate-up`}>
        <h2 className={styles.builtHeading}>Built in India <Image src="/images/india-flag.png" alt="India Flag" width={56} height={56} className={styles.flagImage} /><br/>For the World</h2>
        <p className={styles.builtDesc}>
          This is not merely a rebranded import; it has been meticulously designed from the ground up to cater to Indian homes, lifestyles, and budgets.
        </p>
        <div className={styles.citiesRow}>
          <span>Mumbai</span>
          <span>Pune</span>
          <span>Delhi NCR</span>
          <span>Bangalore</span>
          <span>Hyderabad</span>
          <span>Chennai</span>
          <span>Ahmedabad</span>
        </div>
      </div>

      <div className={`${styles.serviceBar} animate-up`}>
        <div className={styles.serviceItem}>
          <div className={styles.serviceIcon}><FaShippingFast /></div>
          <h4 className={styles.serviceTitle}>Premium Delivery Service</h4>
          <p className={styles.serviceDesc}>Available in major metropolitan areas.</p>
        </div>
        <div className={styles.serviceItem}>
          <div className={styles.serviceIcon}><FaShieldAlt /></div>
          <h4 className={styles.serviceTitle}>1-Year Warranty</h4>
          <p className={styles.serviceDesc}>Extendable up to 2 years, India's best post-purchase option.</p>
        </div>
        <div className={styles.serviceItem}>
          <div className={styles.serviceIcon}><FaHeadset /></div>
          <h4 className={styles.serviceTitle}>Local Support</h4>
          <p className={styles.serviceDesc}>Hindi & English support, IST hours</p>
        </div>
      </div>

      <SharedFooter />
    </section>
  );
}
