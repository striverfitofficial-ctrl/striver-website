import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import SharedFooter from '@/components/SharedFooter/SharedFooter';
import styles from './Press.module.css';

export default function Press() {
  return (
    <main className={styles.main}>
      <Navbar />
      
      <section className={styles.content}>
        <h1 className={styles.title}>Media Inquiries</h1>
        
        <p className={styles.subtitle}>
          For interview requests, additional information, or other press inquiries,<br />
          please contact our media relations team.
        </p>
        
        <p className={styles.email}>
          Email: Striverfit.official@gmail.com
        </p>
      </section>

      <SharedFooter />
    </main>
  );
}
