"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";

const NAV_ITEMS = ["Home", "Features", "How It Works", "Pricing", "App"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
        id="main-nav"
      >
        {/* Logo */}
        <a href="#" className={styles.logo}>
          <Image
            src="/images/logo.png"
            alt="Striverfit"
            width={140}
            height={28}
            className={styles.logoImg}
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </a>

        {/* Nav links pill */}
        <ul className={styles.navLinks}>
          {NAV_ITEMS.map((item, i) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className={`${styles.navLink} ${i === 0 ? styles.active : ""}`}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className={styles.navActions}>
          <button className={styles.iconBtn} aria-label="Account">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
          <button className={styles.iconBtn} aria-label="Cart">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>
        </div>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </a>
        ))}
      </div>
    </>
  );
}
