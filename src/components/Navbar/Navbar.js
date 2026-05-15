"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./Navbar.module.css";

const NAV_ITEMS = ["Home", "Features", "How It Works", "Pricing", "App"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const router = useRouter();
  const { user, isAuthenticated, signOut } = useAuth();

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

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Track active section for navbar highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );

    const sectionIds = ["home", "features", "how-it-works", "pricing", "app"];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const getInitials = () => {
    if (!user) return "";
    const f = (user.first_name || "")[0] || "";
    const l = (user.last_name || "")[0] || "";
    return (f + l).toUpperCase() || user.email?.[0]?.toUpperCase() || "U";
  };

  const getDisplayName = () => {
    if (!user) return "";
    const name = `${user.first_name || ""} ${user.last_name || ""}`.trim();
    return name || user.email?.split("@")[0] || "User";
  };

  const handleSignOut = async () => {
    await signOut();
    setProfileOpen(false);
    router.push("/");
  };

  return (
    <>
      <nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
        id="main-nav"
      >
        <div className={styles.navContainer}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <Image
              src="/images/logo.png"
              alt="Striverfit"
              width={140}
              height={28}
              className={styles.logoImg}
              style={{ width: "auto", height: "auto" }}
              priority
            />
          </Link>

          {/* Nav links pill */}
          <ul className={styles.navLinks}>
            {NAV_ITEMS.map((item) => {
              const sectionId = item.toLowerCase().replace(/\s+/g, "-");
              let href = `/#${sectionId}`;
              if (item === "Pricing") href = "/shop";
              if (item === "How It Works") href = "/how-it-works";
              
              return (
                <li key={item}>
                  <Link
                    href={href}
                    className={`${styles.navLink} ${activeSection === sectionId ? styles.active : ""}`}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div className={styles.navActions}>
            {/* Profile / Account */}
            {isAuthenticated ? (
              <div className={styles.profileWrapper} ref={profileRef}>
                <button
                  className={styles.profileBtn}
                  onClick={() => setProfileOpen((v) => !v)}
                  aria-label="Profile menu"
                >
                  {user?.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt="Profile"
                      className={styles.profileAvatar}
                    />
                  ) : (
                    <span className={styles.profileInitials}>{getInitials()}</span>
                  )}
                </button>

                {/* Profile dropdown */}
                {profileOpen && (
                  <div className={styles.profileDropdown}>
                    <div className={styles.profileHeader}>
                      <div className={styles.profileInfo}>
                        <p className={styles.profileName}>{getDisplayName()}</p>
                        <p className={styles.profileEmail}>{user?.email || ""}</p>
                      </div>
                      <div className={styles.profileAvatarLarge}>
                        {user?.avatar_url ? (
                          <img src={user.avatar_url} alt="Profile" />
                        ) : (
                          <span>{getInitials()}</span>
                        )}
                      </div>
                    </div>
                    <div className={styles.profileActions}>
                      <button
                        className={styles.profileActionBtn}
                        onClick={handleSignOut}
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className={styles.iconBtn} aria-label="Account">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
            )}

            <Link href="/shop" className={styles.iconBtn} aria-label="Cart">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </Link>

          </div>

          {/* Hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        {NAV_ITEMS.map((item) => {
          const sectionId = item.toLowerCase().replace(/\s+/g, "-");
          let href = `/#${sectionId}`;
          if (item === "Pricing") href = "/shop";
          if (item === "How It Works") href = "/how-it-works";

          return (
            <Link
              key={item}
              href={href}
              className={`${styles.mobileLink} ${activeSection === sectionId ? styles.activeMobile : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          );
        })}

        {/* Mobile auth link */}
        {isAuthenticated ? (
          <button
            className={styles.mobileLink}
            onClick={() => { handleSignOut(); setMenuOpen(false); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Sign Out
          </button>
        ) : (
          <Link
            href="/login"
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        )}
      </div>
    </>
  );
}
