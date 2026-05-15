"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa';
import styles from './Wishlist.module.css';

export default function WishlistPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle wishlist submission here
    console.log("Wishlist email submitted:", email);
    setEmail('');
    alert("Thanks for joining the waitlist!");
  };

  return (
    <main className={styles.main}>
      {/* Background Image */}
      <div className={styles.bgWrapper}>
        <Image 
          src="/images/page7/coming-soon-2.png" 
          alt="Striver Machine Background" 
          fill 
          className={styles.bgImage}
          priority
        />
        <div className={styles.bgOverlay} />
      </div>

      <div className={styles.content}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <Link href="/">
            <Image 
              src="/images/logo.png" 
              alt="Striver Logo" 
              width={160} 
              height={40} 
              className={styles.logo}
            />
          </Link>
        </div>

        {/* Central Content */}
        <div className={styles.centerBox}>
          <h1 className={styles.heading}>Join the Waitlist!</h1>
          <p className={styles.subtext}>
            Discover what's actually preventing you from staying consistent time,<br/>
            structure, recovery, or motivation!
          </p>

          <div className={styles.actionRow}>
            <form onSubmit={handleSubmit} className={styles.inputWrapper}>
              <input 
                type="email" 
                placeholder="Email address" 
                className={styles.emailInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className={styles.submitBtn}>
                →
              </button>
            </form>

          </div>
        </div>

        {/* Social Icons */}
        <div className={styles.socialRow}>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <FaLinkedinIn />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            {/* The provided design has an 'X' instead of Twitter bird. Using simple text for exact match if icon isn't 'X', but FaTwitter might be bird. We will just use 'X' text if needed. */}
            <span style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>X</span>
          </a>
        </div>
      </div>
    </main>
  );
}
