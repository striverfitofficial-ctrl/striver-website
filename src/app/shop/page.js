"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Shop.module.css";

const FAQS = [
  {
    q: "What is Striverfit?",
    a: "Striverfit is a premium home strength training system designed for Indian urban homes. It uses adaptive cable resistance and built-in guided programs to deliver a full gym experience in a single compact machine — no gym membership, no commute, no guesswork.",
  },
  {
    q: "What comes in the box?",
    a: "Striverfit arrives fully pre-assembled. In the box: the Striverfit machine, cable attachments, handle grips, a quick-start guide, and power cable. No additional tools or parts required.",
  },
  {
    q: "Do I need to assemble it myself?",
    a: "No. Striverfit requires zero assembly. It is ready to use straight out of the box — unfold, plug in, connect the app, and begin your first session.",
  },
  {
    q: "How much space do I need?",
    a: "The machine footprint is 2.5 ft wide and 5.7 ft deep, with a height of 6.7 ft. We recommend a minimum workout area of approximately 7 × 7 ft for comfortable movement during exercises.",
  },
  {
    q: "What types of workouts are available?",
    a: "The Striverfit app offers Standard, Quick, Custom, and Strength Gauge modes — covering 400+ exercises across upper body, mid body, and lower body. Whether you follow a structured weekly program or build your own session, the machine adapts to your goal.",
  },
  {
    q: "How does the adaptive resistance work?",
    a: "The machine reads your output in real time and adjusts cable resistance automatically — rep by rep. It gradually increases difficulty as you grow stronger, keeps you in your optimal training zone, and applies built-in safety limits to protect your joints during fatigue.",
  },
  {
    q: "Is there a companion app?",
    a: "Yes. The Striverfit app is available on iOS and Android. It connects to the machine via Bluetooth, controls resistance in real time, tracks your reps and progress, and guides you through every session.",
  },
  {
    q: "How heavy is the machine?",
    a: "Striverfit weighs 120 kg. Delivery includes in-home placement support in select cities. Contact us before ordering if you have specific access or floor-load concerns.",
  },
  {
    q: "What power connection does it need?",
    a: "A standard Indian 5A wall socket (230V) is all that's required. No special wiring or dedicated power line needed.",
  },
  {
    q: "Which cities does Striverfit deliver to?",
    a: "Answer to be added once delivery coverage is confirmed.",
  },
  {
    q: "What is the return and refund policy?",
    a: "Answer to be added once policy is finalised.",
  },
];

const SPECS = [
  { label: "Machine weight", value: "120 kg" },
  { label: "Height", value: '6.7 ft (204 cm)' },
  { label: "Depth", value: '5.7 ft (174 cm)' },
  { label: "Width", value: '2.5 ft (76 cm)' },
  { label: "Workout space required", value: "Approx. 7 × 7 ft recommended" },
  { label: "Connectivity", value: "Bluetooth 5.0, Wi-Fi 2.4/5GHz" },
  { label: "Companion app", value: "iOS & Android" },
];

const SLIDER_IMAGES = [
  "/images/shop-slider/slider (1).jpeg",
  "/images/shop-slider/slider (2).jpeg",
  "/images/shop-slider/slider (3).jpeg",
  "/images/shop-slider/slider (4).jpeg",
  "/images/shop-slider/slider (5).jpeg",
  "/images/shop-slider/slider (6).jpeg",
];

export default function ShopPage() {
  const [selectedColor, setSelectedColor] = useState("green");
  const [selectedTab, setSelectedTab] = useState("bundle"); // 'bundle' or 'accessories'
  const [selectedBundle, setSelectedBundle] = useState("pro");
  const [openFaq, setOpenFaq] = useState(0);
  const [selectedAccessories, setSelectedAccessories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('selectedAccessories');
      if (stored) {
        setSelectedAccessories(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  // Auto slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? SLIDER_IMAGES.length - 1 : prev - 1));

  const removeAccessory = (id) => {
    const newSelection = selectedAccessories.filter(item => item !== id);
    setSelectedAccessories(newSelection);
    localStorage.setItem('selectedAccessories', JSON.stringify(newSelection));
  };

  return (
    <div className={styles.page}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/logo.png"
            alt="Striverfit"
            width={160}
            height={36}
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </Link>
        <div className={styles.navRight}>
          <Link href="/login" className={styles.navLink}>Account</Link>
        </div>
      </nav>

      {/* ── HERO: Product Section ── */}
      <section className={styles.heroSection}>
        {/* Left — Product Image Slider */}
        <div className={styles.productImage}>
          {SLIDER_IMAGES.map((src, idx) => (
            <Image
              key={src}
              src={src}
              alt={`Striverfit Machine Slide ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`${styles.sliderImg} ${idx === currentSlide ? styles.activeSlide : ''}`}
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority={idx === 0}
            />
          ))}

          {/* Manual Slider Arrows */}
          <button className={`${styles.sliderBtn} ${styles.sliderBtnPrev}`} onClick={prevSlide} aria-label="Previous Slide">
            &#10094;
          </button>
          <button className={`${styles.sliderBtn} ${styles.sliderBtnNext}`} onClick={nextSlide} aria-label="Next Slide">
            &#10095;
          </button>

          {/* Slider Dots */}
          <div className={styles.sliderControls}>
            {SLIDER_IMAGES.map((_, idx) => (
              <button
                key={idx}
                className={`${styles.sliderDot} ${idx === currentSlide ? styles.activeDot : ''}`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right — Product Info */}
        <div className={styles.productInfo}>
          <h1 className={styles.productTitle}>Intelligent Adaptive Strength Trainer</h1>
          <p className={styles.productSubtitle}>Adjustable weights machine with a compact space</p>

          <p className={styles.earlyAccess}>
            Only a few individuals receive special discount<br />
            offers during early access.
          </p>

          {/* Color selector */}
          <div className={styles.colorRow}>
            <span className={styles.colorLabel}>Select a Colour</span>
            <button
              className={`${styles.colorDot} ${styles.greenDot} ${selectedColor === "green" ? styles.colorActive : ""}`}
              onClick={() => setSelectedColor("green")}
              aria-label="Green"
            />
            <button
              className={`${styles.colorDot} ${styles.blackDot} ${selectedColor === "black" ? styles.colorActive : ""}`}
              onClick={() => setSelectedColor("black")}
              aria-label="Black"
            />
            <span className={styles.earlyTag}>Exclusive Offer for Early Access Participants</span>
          </div>

          {/* Bundle / Accessories selector card */}
          <div className={styles.selectorCard}>
            <div className={styles.tabRow}>
              <button
                className={`${styles.tab} ${selectedTab === "bundle" ? styles.tabActive : ""}`}
                onClick={() => setSelectedTab("bundle")}
              >
                Select Bundle
              </button>
              <button
                className={`${styles.tab} ${selectedTab === "accessories" ? styles.tabActive : ""}`}
                onClick={() => setSelectedTab("accessories")}
              >
                Accessories
              </button>
            </div>

            {selectedTab === "bundle" && (
              <div className={styles.bundleRow}>
                <button
                  className={`${styles.bundleCard} ${selectedBundle === "plus" ? styles.bundleActive : ""}`}
                  onClick={() => setSelectedBundle("plus")}
                >
                  <span className={styles.bundleName}>Plus</span>
                  <span className={styles.bundleType}>Starter Bundle</span>
                  <span className={styles.bundlePrice}>Coming Soon</span>
                </button>
                <button
                  className={`${styles.bundleCard} ${selectedBundle === "pro" ? styles.bundleActive : ""}`}
                  onClick={() => setSelectedBundle("pro")}
                >
                  <span className={styles.bundleName}>Pro</span>
                  <span className={styles.bundleType}>Max Bundle</span>
                  <span className={styles.bundlePrice}>Coming Soon</span>
                </button>
              </div>
            )}

            {selectedTab === "accessories" && (
              <div className={styles.accessoriesSection}>
                <div className={styles.accessoriesGrid}>
                  {selectedAccessories.map((id) => (
                    <div key={id} className={styles.accThumbCard}>
                      <Image 
                        src={`/images/accessories/${id}.png`}
                        alt={`Accessory ${id}`}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <button 
                        className={styles.removeAccBtn}
                        onClick={() => removeAccessory(id)}
                        aria-label="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {/* Add Accessory Box (replaces 'Select' button) */}
                  <Link href="/accessories" className={styles.addAccessoryBox} aria-label="Add Accessory">
                    <span className={styles.plusIcon}>+</span>
                  </Link>
                </div>
              </div>
            )}

            <div className={styles.bottomActions}>
              <div className={styles.spacer}></div>
              <button 
                className={`${styles.continueBtn} ${(selectedBundle === "pro" && selectedAccessories.length === 0) ? styles.continueDisabled : ""}`}
                disabled={selectedBundle === "pro" && selectedAccessories.length === 0}
              >
                Continue <span className={styles.arrow}>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Details + Specs ── */}
      <section className={styles.detailsSection}>
        <div className={styles.detailsLeft}>
          {/* FAQs */}
          <div className={styles.faqContainer}>
            <h2 className={styles.faqTitle}>FAQ<sub>s</sub></h2>
            {FAQS.map((faq, i) => (
              <div key={i} className={styles.faqItem}>
                <button
                  className={`${styles.faqQuestion} ${openFaq === i ? styles.faqOpen : ""}`}
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  {faq.q}
                  <svg
                    className={styles.faqChevron}
                    width="20" height="20"
                    viewBox="0 0 24 24"
                    fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className={styles.faqAnswer}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.detailsRight}>
          <h2 className={styles.sectionTitle}>Product details</h2>
          <p className={styles.detailPara}>
            Striverfit is a compact guided strength training system featuring adaptive cable resistance and a
            digital interface. It replaces multiple gym pieces of equipment with one powerful unit suitable for
            home use.
          </p>
          <p className={styles.detailPara}>
            The machine automatically adjusts resistance to match your strength level in real time, ensuring
            progressive overload without the need for manual plate changes.
          </p>

          <h3 className={styles.specsTitle}>Specs</h3>
          <table className={styles.specsTable}>
            <tbody>
              {SPECS.map((spec, i) => (
                <tr key={i}>
                  <td className={styles.specLabel}>{spec.label}</td>
                  <td className={styles.specValue}>{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Back to home link */}
      <div className={styles.backRow}>
        <Link href="/" className={styles.backLink}>← Back to Home</Link>
      </div>
    </div>
  );
}
