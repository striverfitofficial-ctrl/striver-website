"use client";

import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import SharedFooter from '@/components/SharedFooter/SharedFooter';
import Link from 'next/link';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <main className={styles.main}>
      <Navbar />
      
      <section className={styles.content}>
        <div className={styles.leftCol}>
          <div className={styles.badge}>CONTACT US</div>
          <h1 className={styles.title}>How can we help you?</h1>
          <p className={styles.description}>
            Have inquiries about Striverfit? Our dedicated team is here to help you with product details, installation assistance, or any other questions you may have.
          </p>
          <div className={styles.emailContainer}>
            <span className={styles.emailLabel}>Email : </span>
            <span className={styles.email}>Striverfit.official@gmail.com</span>
          </div>
          <Link href="/shop" className={styles.faqBtn}>Search FAQ's</Link>
        </div>
        
        <div className={styles.rightCol}>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>First Name</label>
                <input type="text" placeholder="Travison cott" className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label>Phone Number</label>
                <input type="tel" placeholder="+91 8830303030" className={styles.input} />
              </div>
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>Company Email</label>
                <input type="email" placeholder="Travison@gmail.com" className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label>Gender</label>
                <input type="text" placeholder="Male" className={styles.input} />
              </div>
            </div>
            
            <div className={styles.inputGroup}>
              <label>Message</label>
              <textarea placeholder="Some Message for us" className={styles.textarea}></textarea>
            </div>
            
            <button type="submit" className={styles.submitBtn}>Submit</button>
            <p className={styles.disclaimer}>
              By pressing submit, you agree to the page<br />
              <Link href="/terms">terms of service</Link> and <Link href="/privacy">privacy policy</Link>
            </p>
          </form>
        </div>
      </section>

      <SharedFooter />
    </main>
  );
}
