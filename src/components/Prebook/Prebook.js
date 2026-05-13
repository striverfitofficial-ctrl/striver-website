"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Prebook.module.css";

const images = [
  "/images/page7/coming-soon-1.png",
  "/images/page7/coming-soon-2.png",
  "/images/page7/folded-machine.png",
];

export default function Prebook() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3 seconds interval

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>Pre-orders Open Until Mid of 2026</h2>
        <p className={styles.subtitle}>
          Be the first to own the intelligent Studio strength system that finally makes<br />
          consistency effortless. Use the contact form below to get notified .
        </p>
      </div>

      <div className={styles.sliderContainer}>
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Striver Machine View ${index + 1}`}
            fill
            className={`${styles.machineImage} ${
              index === currentIndex ? styles.active : styles.inactive
            }`}
            sizes="100vw"
            quality={100}
            unoptimized={true}
            priority={index === 0}
          />
        ))}

        <div className={styles.buttonOverlay}>
          <button className={styles.joinBtn}>Join Us</button>
          <button className={styles.feedbackBtn}>Give us some feedback and suggestions &gt;</button>
        </div>
      </div>
    </section>
  );
}
