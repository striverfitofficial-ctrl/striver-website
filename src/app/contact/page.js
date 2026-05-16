"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import SharedFooter from '@/components/SharedFooter/SharedFooter';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from './Contact.module.css';

export default function Contact() {
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!firstName.trim() || !email.trim()) {
      setError('Name and email are required.');
      return;
    }

    setLoading(true);

    const { error: insertError } = await supabase
      .from('web_contact_submissions')
      .insert({
        first_name: firstName.trim(),
        phone: phone.trim() || null,
        email: email.trim(),
        gender: gender.trim() || null,
        message: message.trim() || null,
      });

    setLoading(false);

    if (insertError) {
      setError('Something went wrong. Please try again.');
      return;
    }

    setSuccess('Thank you! Your message has been sent. Our team will reach out soon.');
    setFirstName('');
    setPhone('');
    setEmail('');
    setGender('');
    setMessage('');
  };

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
          <Link href="/shop#faq" className={styles.faqBtn}>Search FAQ&apos;s</Link>
        </div>
        
        <div className={styles.rightCol}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {error && <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '12px', textAlign: 'center', background: 'rgba(220,38,38,0.1)', padding: '10px', borderRadius: '8px' }}>{error}</p>}
            {success && <p style={{ color: '#00e676', fontSize: '13px', marginBottom: '12px', textAlign: 'center', background: 'rgba(0,230,118,0.1)', padding: '10px', borderRadius: '8px' }}>{success}</p>}

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>First Name</label>
                <input type="text" placeholder="Your name" className={styles.input} value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div className={styles.inputGroup}>
                <label>Phone Number</label>
                <input type="tel" placeholder="+91 8830303030" className={styles.input} value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>Company Email</label>
                <input type="email" placeholder="you@example.com" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className={styles.inputGroup}>
                <label>Gender</label>
                <input type="text" placeholder="Male" className={styles.input} value={gender} onChange={(e) => setGender(e.target.value)} />
              </div>
            </div>
            
            <div className={styles.inputGroup}>
              <label>Message</label>
              <textarea placeholder="Some Message for us" className={styles.textarea} value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>
            
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
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
