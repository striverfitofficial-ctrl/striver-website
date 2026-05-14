import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import SharedFooter from '@/components/SharedFooter/SharedFooter';
import styles from '../styles/Policy.module.css';

export default function Privacy() {
  return (
    <main className={styles.main}>
      <Navbar />
      
      <div className={styles.header}>
        <h1 className={styles.title}>PRIVACY POLICY</h1>
        <p className={styles.subtitle}>
          StriverFit respects your privacy and is committed to protecting your personal information.<br />
          This Privacy Policy explains how we collect, use, and protect user data.
        </p>
      </div>

      <div className={styles.content}>
        <section className={styles.section} style={{ textAlign: 'center' }}>
          <h2 className={styles.sectionTitle}>Information We Collect</h2>
          <p className={styles.sectionText}>StriverFit Pvt. Ltd.</p>
          <p className={styles.sectionText}>S No-19, Office No A-80, 2nd Floor, KK Market Satara<br />Road, Dhankawadi, Pune 411046, Maharashtra, India</p>
          <br />
          <p className={styles.sectionText}>Contact Email<br />striverfit.official@gmail.com</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Information We Collect</h2>
          <ul className={styles.list}>
            <li className={styles.listItem}>Name and contact details</li>
            <li className={styles.listItem}>Email address</li>
            <li className={styles.listItem}>Payment information</li>
            <li className={styles.listItem}>Fitness assessment responses</li>
            <li className={styles.listItem}>Workout analytics</li>
            <li className={styles.listItem}>Health-related inputs</li>
            <li className={styles.listItem}>Device usage information</li>
            <li className={styles.listItem}>Smart-device syncing data</li>
            <li className={styles.listItem}>App activity and interactions</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How We Use Your Data</h2>
          <p className={styles.sectionText}>Your information helps us:</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>personalize workout recommendations</li>
            <li className={styles.listItem}>improve user experience</li>
            <li className={styles.listItem}>provide fitness insights</li>
            <li className={styles.listItem}>analyze workout progress</li>
            <li className={styles.listItem}>improve product performance</li>
            <li className={styles.listItem}>provide customer support</li>
            <li className={styles.listItem}>process payments and orders</li>
          </ul>
          <p className={styles.sectionText}>We use collected data only to improve StriverFit services and user experience.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Fitness & Health Information</h2>
          <p className={styles.sectionText}>Certain features may collect health or fitness-related data.</p>
          <p className={styles.sectionText}>This information is used solely for:</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>workout guidance</li>
            <li className={styles.listItem}>progress tracking</li>
            <li className={styles.listItem}>personalized recommendations</li>
            <li className={styles.listItem}>analytics and performance insights</li>
          </ul>
          <p className={styles.sectionText}>StriverFit does not provide medical diagnosis or treatment.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Data Security</h2>
          <ul className={styles.list}>
            <li className={styles.listItem}>We implement reasonable security measures to protect personal information from unauthorized access, misuse, or disclosure.</li>
            <li className={styles.listItem}>However, no online platform can guarantee complete security.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Policy Updates</h2>
          <p className={styles.sectionText}>StriverFit may update this Privacy Policy periodically.<br />Updated versions will be published on our website.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Third-Party Services</h2>
          <p className={styles.sectionText}>Our platform may connect with:</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>payment processors</li>
            <li className={styles.listItem}>analytics providers</li>
            <li className={styles.listItem}>smart devices</li>
            <li className={styles.listItem}>mobile services</li>
          </ul>
          <p className={styles.sectionText}>Third-party platforms operate under their own privacy policies.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>User Rights</h2>
          <p className={styles.sectionText}>Users may request:</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>access to personal data</li>
            <li className={styles.listItem}>correction of information</li>
            <li className={styles.listItem}>deletion of account data</li>
            <li className={styles.listItem}>removal of stored information</li>
          </ul>
          <p className={styles.sectionText}>Requests may be submitted via email.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Data Retention</h2>
          <p className={styles.sectionText}>We retain data only as long as necessary to provide services, improve products, and comply with legal obligations.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Cookies & Analytics</h2>
          <p className={styles.sectionText}>StriverFit may use cookies and analytics technologies to:</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>improve website performance</li>
            <li className={styles.listItem}>understand user behavior</li>
            <li className={styles.listItem}>personalize experiences</li>
            <li className={styles.listItem}>optimize product functionality</li>
          </ul>
          <p className={styles.sectionText}>Users may manage cookie settings through their browser preferences.</p>
        </section>
      </div>

      <div className={styles.contactSection}>
        <h2 className={styles.contactTitle}>Contact Us</h2>
        <p className={styles.contactText}>
          For questions regarding these Terms:<br />
          striverfit.official@gmail.com
        </p>
      </div>

      <SharedFooter />
    </main>
  );
}
