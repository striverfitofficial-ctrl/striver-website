import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './SharedFooter.module.css';

export default function SharedFooter() {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerTop}>
        <div className={styles.newsletterSection}>
          <h3 className={styles.newsletterTitle}>Stay updated on StriverFit</h3>
          <p className={styles.newsletterDesc}>Get the latest news on product updates, exclusive pre-order offers, and fitness tips.</p>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email address" className={styles.newsletterInput} required />
            <button type="submit" className={styles.newsletterBtn}>Subscribe</button>
          </form>
        </div>
      </div>
      
      <div className={styles.footer}>
        <div className={styles.footerBrand}>
          <div className={styles.footerLogo}>
            <Image src="/images/logo.png" alt="Striver Logo" fill sizes="(max-width: 768px) 100vw, 200px" style={{ objectFit: 'contain' }} />
          </div>
          <p className={styles.footerTagline}>Smart training for real lives. Consistency made effortless.</p>
          <div className={styles.footerContact}>
            +91 8806300555<br />
            striverfit.official@gmail.com
          </div>
        </div>
        
        <div className={styles.footerLinksGrid}>
          <div className={styles.footerCol}>
            <h4>Product</h4>
            <ul>
              <li><Link href="/#features">Features</Link></li>
              <li><Link href="/#app">App</Link></li>
              <li><Link href="/shop">Pricing</Link></li>
              <li><Link href="/reviews">Reviews</Link></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Company</h4>
            <ul>
              <li><Link href="/#about">About</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><span style={{ color: 'var(--color-gray-500)', fontSize: '14px', cursor: 'not-allowed' }}>Careers <span style={{ color: 'var(--color-accent)', fontSize: '10px', marginLeft: '4px' }}>(Coming Soon)</span></span></li>
              <li><Link href="/press">Press</Link></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Support</h4>
            <ul>
              <li><Link href="/#warranty">Warranty</Link></li>
              <li><Link href="/#shipping">Shipping</Link></li>
              <li><Link href="/return">Return</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Socials</h4>
            <ul>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Twitter / X</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">YouTube</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div>© 2026 Striverfit. All rights reserved.</div>
        <div className={styles.footerLinks}>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
