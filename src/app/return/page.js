import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import SharedFooter from '@/components/SharedFooter/SharedFooter';
import styles from '../styles/Policy.module.css';

export default function Return() {
  return (
    <main className={styles.main}>
      <Navbar />
      
      <div className={styles.header}>
        <h1 className={styles.title}>REFUND & RETURN POLICY</h1>
        <p className={styles.subtitle}>
          At StriverFit, we aim to provide a smooth and reliable customer experience.
        </p>
      </div>

      <div className={styles.content}>
        <section className={styles.section} style={{ textAlign: 'center' }}>
          <p className={styles.sectionText}>StriverFit Pvt. Ltd.</p>
          <p className={styles.sectionText}>S No-19, Office No A-80, 2nd Floor, KK Market Satara<br />Road, Dhankawadi, Pune 411046, Maharashtra, India</p>
          <br />
          <p className={styles.sectionText}>Contact Email<br />striverfit.official@gmail.com</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Return Eligibility</h2>
          <p className={styles.sectionText}>Products may be eligible for return if:</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>received damaged</li>
            <li className={styles.listItem}>defective upon arrival</li>
            <li className={styles.listItem}>incorrect product delivered</li>
            <li className={styles.listItem}>major functional issues occur</li>
          </ul>
          <p className={styles.sectionText}>Return requests must be submitted within the specified return period after delivery</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Refund Processing</h2>
          <p className={styles.sectionText}>Approved refunds will be processed through the original payment method.</p>
          <p className={styles.sectionText}>Processing timelines may vary depending on payment providers and banks.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Non-Returnable Situations</h2>
          <ul className={styles.list}>
            <li className={styles.listItem}>Returns may not be accepted for:</li>
            <li className={styles.listItem} style={{ listStyleType: 'circle', marginLeft: '20px' }}>intentional damage</li>
            <li className={styles.listItem} style={{ listStyleType: 'circle', marginLeft: '20px' }}>misuse of equipment</li>
            <li className={styles.listItem} style={{ listStyleType: 'circle', marginLeft: '20px' }}>unauthorized modifications</li>
            <li className={styles.listItem} style={{ listStyleType: 'circle', marginLeft: '20px' }}>excessive physical damage after use</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Refund Requests</h2>
          <p className={styles.sectionText}>Users may request a refund by contacting:</p>
          <p className={styles.sectionText}>striverfit.official@gmail.com</p>
          <p className={styles.sectionText}>Refund requests should include:</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>order details</li>
            <li className={styles.listItem}>proof of purchase</li>
            <li className={styles.listItem}>issue description</li>
            <li className={styles.listItem}>supporting images if applicable</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Inspection & Approval</h2>
          <p className={styles.sectionText}>Returned products may undergo inspection before refund approval.<br />StriverFit reserves the right to reject claims that do not meet policy conditions.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Shipping & Logistics</h2>
          <p className={styles.sectionText}>Return shipping procedures will be shared after approval of the request.<br />Shipping responsibilities may vary depending on the issue.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Policy Updates</h2>
          <p className={styles.sectionText}>StriverFit may revise this Refund & Return Policy periodically.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle} style={{ textTransform: 'uppercase' }}>Contact Information</h2>
          <p className={styles.sectionText}>StriverFit Pvt. Ltd.</p>
          <p className={styles.sectionText}>S No-19, Office No A-80, 2nd Floor, KK Market Satara Road, Dhankawadi, Pune<br />411046, Maharashtra, India</p>
          <br />
          <p className={styles.sectionText}>Email<br />striverfit.official@gmail.com</p>
        </section>
      </div>

      <div className={styles.contactSection}>
        <h2 className={styles.contactTitle}>Msg from our Striverfit team</h2>
        <p className={styles.contactText}>
          Thank you for choosing StriverFit.<br />
          We are committed to building smarter, simpler, and more sustainable fitness experiences for modern lifestyles.
        </p>
      </div>

      <SharedFooter />
    </main>
  );
}
